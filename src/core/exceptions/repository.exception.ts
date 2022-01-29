import { DomainErrorBase } from './domain.error.base.exception';
import { Errors } from './error.types';

export class RepositoryException extends DomainErrorBase {
  name: Errors = Errors.Repository;
}
