import { DomainErrorBase } from './domain.error.base.exception';
import { Errors } from './error.types';

export class ConflictException extends DomainErrorBase {
  name: Errors = Errors.Conflict;
}
