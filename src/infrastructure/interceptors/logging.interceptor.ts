import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const before = Date.now();
    const request = context.switchToHttp().getRequest<Request>();
    const endpoint = request.url;
    const method = request.method;

    this.logger.debug(`${method}: ${endpoint}`, `ENDPOINT ${before}`);
    const logPort = this.logger;
    return next
      .handle()
      .pipe(
        tap(() =>
          logPort.debug(
            `${method}: ${endpoint} - took ${Date.now() - before}ms`,
            `ENDPOINT ${before}`
          )
        )
      );
  }
}
