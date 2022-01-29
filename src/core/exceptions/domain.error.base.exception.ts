import { Errors } from './error.types';

export interface Metadata {
  [key: string]: unknown;
}

export interface SerializedException {
  name: string;
  message: string;
  stack?: string;
  metadata?: Metadata;
}

export abstract class DomainErrorBase extends Error {
  constructor(readonly message: string, readonly metadata?: Metadata) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  abstract name: Errors;

  toJson(): SerializedException {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      metadata: this.metadata
    };
  }
}
