import {
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from '@notionhq/client';

type WikiErrorCode =
  | 'authorization'
  | 'configuration'
  | 'not-found'
  | 'rate-limit'
  | 'schema'
  | 'service';

export class WikiError extends Error {
  constructor(
    readonly code: WikiErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'WikiError';
  }
}

export const getWikiError = (error: unknown): WikiError => {
  if (error instanceof WikiError) {
    return error;
  }

  if (isNotionClientError(error)) {
    switch (error.code) {
      case APIErrorCode.Unauthorized:
      case APIErrorCode.RestrictedResource:
        return new WikiError(
          'authorization',
          'Notion rejected the read-only connection.',
          { cause: error },
        );
      case APIErrorCode.ObjectNotFound:
        return new WikiError(
          'not-found',
          'A configured Notion data source is unavailable.',
          { cause: error },
        );
      case APIErrorCode.RateLimited:
        return new WikiError(
          'rate-limit',
          'Notion rate-limited the Wiki request.',
          { cause: error },
        );
      case APIErrorCode.ValidationError:
        return new WikiError(
          'schema',
          'Notion rejected a Wiki query because its schema is incompatible.',
          { cause: error },
        );
      case APIErrorCode.InternalServerError:
      case APIErrorCode.ServiceOverload:
      case APIErrorCode.ServiceUnavailable:
      case APIErrorCode.GatewayTimeout:
      case ClientErrorCode.RequestTimeout:
      case ClientErrorCode.ResponseError:
        return new WikiError('service', 'Notion is temporarily unavailable.', {
          cause: error,
        });
      default:
        return new WikiError(
          'service',
          'The Wiki could not read content from Notion.',
          { cause: error },
        );
    }
  }

  return new WikiError('service', 'The Wiki could not load its content.', {
    cause: error,
  });
};
