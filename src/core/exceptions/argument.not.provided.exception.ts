import { DomainErrorBase } from './domain.error.base.exception';
import { Errors } from './error.types';

export class ArgumentNotProvidedException extends DomainErrorBase {
  name: Errors = Errors.ArgumentNotProvided;
}
