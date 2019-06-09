import { HTTP_HEADER_CONTENT_TYPE } from '../enum/HTTP_HEADER_CONTENT_TYPE';

export interface IR2CurlOptions {
  /**
   * Determines the type of quota around the body and uri.
   * @default 'single'
   */
  quote: 'single' | 'double';
  /**
   * Determines the default Content-Type header value for POST and PUT requests.
   * @default HTTP_HEADER_CONTENT_TYPE.JSON_UTF8 (appplication/json; charset=utf-8)
   */
  defaultContentType: HTTP_HEADER_CONTENT_TYPE | string | false;
  /**
   * Accept Body all HTTP Method.(Including GET and DELETE methods)
   * @default false
   */
  forceBody: boolean;
}

export const defaultR2CurlOptions: IR2CurlOptions = {
  quote: 'single',
  defaultContentType: HTTP_HEADER_CONTENT_TYPE.JSON_UTF8,
  forceBody: false,
};
