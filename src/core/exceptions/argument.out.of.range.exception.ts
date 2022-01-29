import { DomainErrorBase } from './domain.error.base.exception';
import { Errors } from './error.types';

export class ArgumentOutOfRangeException extends DomainErrorBase {
  name: Errors = Errors.ArgumentOutOfRange;
}
