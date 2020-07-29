import debug from 'debug';
import { CURL_OPTIONS } from '../enum/CURL_OPTIONS';
import { HTTP_HEADER, HTTP_HEADER_LOWERCASE } from '../enum/HTTP_HEADER';
import { HTTP_METHOD } from '../enum/HTTP_METHOD';
import { IR2CurlOptions } from '../interface/IR2CurlOptions';
import { isEmpty, isNotEmpty } from './isEmpty';
import { OptionContainer } from './OptionContainer';

const log = debug('r2curl:HeaderHelper');

type HttpHeaderType = { [key in string]: string };

export class HeaderHelper {
  private headers: { [key in string]: string } | null;
  // only contain lowercase key
  private keys: string[];
  // contain lowercase key and value pair
  private pairs: HttpHeaderType;

  private defaultContentType: string | null;

  constructor(
    private readonly _rawHeaders: HttpHeaderType,
    private readonly _method: string,
    private readonly _curlOptionContainer: OptionContainer,
    private readonly _option: IR2CurlOptions,
  ) {
    this.defaultContentType = _option.defaultContentType === false ? null : _option.defaultContentType;

    this.keys = [];
    this.pairs = {};

    Object.keys(_rawHeaders).forEach(key => {
      const lower = key.toLowerCase();

      this.pairs[lower] = _rawHeaders[key];
      this.keys.push(lower);
    });

    this.headers = this.parseHeader();

    log('keys', this.keys);
  }

  public toObject() {
    if (isEmpty(this.headers)) {
      return {};
    }
    return this.headers;
  }

  private parseHeader() {
    if (isEmpty(this._rawHeaders) && isEmpty(this.defaultContentType)) {
      return null;
    }

    this.judgeAcceptEncoding();

    return {
      ...this.parseContentHeader(),
      ...this._rawHeaders,
    };
  }

  private parseContentHeader(): HttpHeaderType {
    log('_rawHeaders', this._rawHeaders);
    log('defaultContentType', this.defaultContentType);

    const rawHeaderContentType = this.keys.find(key => key === HTTP_HEADER_LOWERCASE.CONTENT_TYPE);
    const isNeedContentType =
      [
        HTTP_METHOD.POST as string,
        HTTP_METHOD.PUT as string,
        HTTP_METHOD.PATCH as string,
      ].includes(this._method) || this._option.forceBody;

    log(
      'isNeedContentType',
      [
        HTTP_METHOD.POST as string,
        HTTP_METHOD.PUT as string,
        HTTP_METHOD.PATCH as string,
      ].includes(this._method),
      this._option.forceBody,
      'OR CALC',
      isNeedContentType,
    );

    const headers: HttpHeaderType = {};

    if (isNeedContentType && isEmpty(rawHeaderContentType) && isNotEmpty(this.defaultContentType)) {
      headers[HTTP_HEADER.CONTENT_TYPE] = this.defaultContentType;
    }

    return headers;
  }

  private judgeAcceptEncoding(): void {
    const rawHeaderAcceptEncoding = this.keys.find(key => key === HTTP_HEADER_LOWERCASE.ACCEPT_ENCODING);

    log('rawHeaderAcceptEncoding:', rawHeaderAcceptEncoding);
    log(
      'this.paris[rawHeaderAcceptEncoding]:',
      isNotEmpty(rawHeaderAcceptEncoding) ? this.pairs[rawHeaderAcceptEncoding] : null,
    );

    if (isNotEmpty(rawHeaderAcceptEncoding) && this.pairs[rawHeaderAcceptEncoding] === 'gzip') {
      this._curlOptionContainer.add(CURL_OPTIONS.COMPRESSED);
    }

    return;
  }
}
