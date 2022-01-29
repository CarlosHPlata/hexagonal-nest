import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  DomainErrorBase,
  Errors,
  ValidationException
} from '../../core/exceptions';

export enum CustomHttpExceptions {
  VALIDATION_ERROR = 444,

  REPOSITORY_EXCEPTION = 521,
  PORT_EXCEPTION = 522,
  ADAPTER_EXCEPTION = 523
}

const INTERNAL_SERVER_ERROR = 'Internal server error';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logPort = this.logger;
    return next.handle().pipe(
      catchError((error) => {
        logPort.error(error.stack);

        if (error instanceof DomainErrorBase) {
          if (error.toJson().metadata)
            logPort.debug(error.toJson().metadata, 'error metadata');

          return transformCustomErrorsToHttpErrors(error);
        }

        return throwError(() => error);
      })
    );
  }
}

const transformCustomErrorsToHttpErrors = (error: DomainErrorBase) => {
  switch (error.name) {
    case Errors.NotFound:
      throw new NotFoundException(error.message);

    case Errors.ArgumentInvalid:
    case Errors.ArgumentOutOfRange:
      throw new BadRequestException(`${error.name} - ${error.message}`);

    case Errors.ArgumentNotProvided:
      throw new NotAcceptableException(error.message);

    case Errors.ValidationError:
      const validationErr: ValidationException = error as ValidationException;

      throw new HttpException(
        {
          status: CustomHttpExceptions.VALIDATION_ERROR,
          error: validationErr.userMessage
        },
        CustomHttpExceptions.VALIDATION_ERROR
      );

    case Errors.Conflict:
      throw new ConflictException(error.message);

    case Errors.Repository:
      throw new HttpException(
        {
          status: CustomHttpExceptions.REPOSITORY_EXCEPTION,
          error: INTERNAL_SERVER_ERROR
        },
        CustomHttpExceptions.REPOSITORY_EXCEPTION
      );

    case Errors.Port:
      throw new HttpException(
        {
          status: CustomHttpExceptions.PORT_EXCEPTION,
          error: INTERNAL_SERVER_ERROR
        },
        CustomHttpExceptions.REPOSITORY_EXCEPTION
      );

    case Errors.Adapter:
      throw new HttpException(
        {
          status: CustomHttpExceptions.ADAPTER_EXCEPTION,
          error: INTERNAL_SERVER_ERROR
        },
        CustomHttpExceptions.ADAPTER_EXCEPTION
      );

    default:
      return throwError(() => error);
  }
};
