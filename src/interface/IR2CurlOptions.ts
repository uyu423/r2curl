import { HEADER_CONTENT_TYPE } from '../enum/HEADER_CONTENT_TYPE';

export interface IR2CurlOptions {
  /** Determines the type of quota around the body and uri. */
  quote: 'single' | 'double';
  defaultContentType: HEADER_CONTENT_TYPE | string | false;
}

export const defaultR2CurlOptions: IR2CurlOptions = {
  quote: 'single',
  defaultContentType: HEADER_CONTENT_TYPE.JSON_UTF8,
};
