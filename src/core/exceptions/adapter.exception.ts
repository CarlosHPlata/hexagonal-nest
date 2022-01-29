import { DomainErrorBase } from './domain.error.base.exception';
import { Errors } from './error.types';

export class AdapterException extends DomainErrorBase {
  name: Errors = Errors.Adapter;
}
