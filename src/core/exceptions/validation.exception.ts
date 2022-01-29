import { DomainErrorBase, Metadata } from './domain.error.base.exception';
import { Errors } from './error.types';

export class ValidationException extends DomainErrorBase {
  name: Errors = Errors.ValidationError;

  userMessage: string;

  constructor(message: string, userMessage?: string, metadata?: Metadata) {
    super(message, metadata);

    if (!userMessage) {
      userMessage = message;
    }
    this.userMessage = userMessage;
  }
}
