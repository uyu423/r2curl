/**
 * Standard Http Methods
 * @see https://tools.ietf.org/html/rfc7231#section-4.3
 */
export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  HEAD = 'HEAD',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  CONNECT = 'CONNECT',
  TRACE = 'TRACE',
  // purge is assumed to be non-standard, but it is used in many requests.
  PURGE = 'PURGE',
}
