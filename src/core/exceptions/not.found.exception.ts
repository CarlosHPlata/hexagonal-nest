import { DomainErrorBase } from './domain.error.base.exception';
import { Errors } from './error.types';

export class NotFoundException extends DomainErrorBase {
  name: Errors = Errors.NotFound;
}
