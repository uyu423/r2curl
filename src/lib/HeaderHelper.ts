import { HTTP_METHOD } from '../enum/HTTP_METHOD';
import { IR2CurlOptions } from '../interface/IR2CurlOptions';
import { isEmpty, isNotEmpty } from './isEmpty';

export class HeaderHelper {
  private headers: { [key in string]: string } | null;
  private keys: string[];

  private defaultContentType: string | null;

  constructor(
    private readonly _rawHeaders: { [key in string]: string },
    private readonly _method: string,
    _option: IR2CurlOptions,
  ) {
    this.defaultContentType = _option.defaultContentType || null;
    this.keys = Object.keys(_rawHeaders).map(key => key.toLowerCase());
    this.headers = this.parseHeader();
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

    const rawHeaderContentType = this.keys.find(key => key === 'content-type');
    const isNeedContentType = [HTTP_METHOD.POST as string, HTTP_METHOD.PUT as string].includes(this._method);
    const headers: { [key in string]: string } = {};

    if (isNeedContentType && isEmpty(rawHeaderContentType) && isNotEmpty(this.defaultContentType)) {
      headers['Content-Type'] = this.defaultContentType;
    }

    return {
      ...headers,
      ...this._rawHeaders,
    };
  }
}
