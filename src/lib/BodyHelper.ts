import { HTTP_HEADER_LOWERCASE } from '../enum/HTTP_HEADER';
import { HTTP_HEADER_CONTENT_TYPE } from '../enum/HTTP_HEADER_CONTENT_TYPE';
import CommonUtils from './CommonUtils';
import { isEmpty, isNotEmpty } from './isEmpty';

export class BodyHelper {
  private contentType: string | null;
  private body: string | null = null;

  constructor(
    private readonly _headers: { [key in string]: string },
    private readonly _rawBody: { [key in string]: any } | Array<{ [key in string]: any }>,
  ) {
    this.contentType = this.getContentType();
    this.body = this.parseBody();
  }

  public toString(): string {
    if (isEmpty(this.body)) {
      return '';
    }
    return this.body;
  }

  private getContentType(): string | null {
    if (isEmpty(this._headers)) {
      return null;
    }
    const lowerHeaderArray = Object.entries(this._headers);
    const [contentTypePair] = lowerHeaderArray.filter(
      header => header[0].toLowerCase() === HTTP_HEADER_LOWERCASE.CONTENT_TYPE,
    );

    if (isEmpty(contentTypePair)) {
      return null;
    }
    return contentTypePair[1];
  }

  private parseBody(): string | null {
    if (isEmpty(this._rawBody)) {
      return null;
    }
    if (
      isNotEmpty(this.contentType) &&
      this.contentType.includes(HTTP_HEADER_CONTENT_TYPE.FORM_URLENCODED) &&
      isNotEmpty(this._rawBody) &&
      typeof this._rawBody === 'object'
    ) {
      return this.getFormBody();
    }
    return this.getTextBody();
  }

  private getFormBody(): string {
    return Object.entries(this._rawBody)
      .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
  }
  private getTextBody(): string | null {
    return typeof this._rawBody === 'object' || Array.isArray(this._rawBody)
      ? CommonUtils.jsonStringifyWithEscapeQuote(this._rawBody)
      : null;
  }
}
