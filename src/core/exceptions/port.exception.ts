import { DomainErrorBase } from './domain.error.base.exception';
import { Errors } from './error.types';

export class PortException extends DomainErrorBase {
  name: Errors = Errors.Port;
}
