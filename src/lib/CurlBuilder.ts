import { IR2CurlOptions } from '../interface/IR2CurlOptions';
import IRequestAdaptor from '../interface/IRequestAdaptor';
import { BodyHelper } from './BodyHelper';
import { HeaderHelper } from './HeaderHelper';
import { isEmpty } from './isEmpty';

export class CurlBuilder {
  private readonly outputQuote: '\'' | '"';

  constructor(private readonly _adap: IRequestAdaptor, private readonly _option: IR2CurlOptions) {
    this.outputQuote = _option.quote === 'single' ? '\'' : '"';
  }

  get method(): string {
    if (isEmpty(this._adap.method)) {
      return '';
    }
    return `-X ${this._adap.method}`;
  }

  get headers(): string {
    const helper = new HeaderHelper(this._adap.headers, this._adap.method, this._option);
    const headers = helper.toObject();
    if (isEmpty(headers)) {
      return '';
    }
    return Object.entries(headers)
      .map(header => `-H ${this.wrapQuote(`${header[0]}:${header[1]}`)}`)
      .join(' ');
  }

  get body(): string {
    const helper = new BodyHelper(this._adap.headers, this._adap.body);
    const body = helper.toString();

    if (isEmpty(body)) {
      return '';
    }
    return `--data ${this.wrapQuote(helper.toString())}`;
  }

  get url(): string {
    return this.wrapQuote(this._adap.url);
  }

  public toString() {
    const existData = [this.method, this.url, this.headers, this.body].filter(data => !isEmpty(data));
    return `curl ${existData.join(' ')}`.trim();
  }

  private wrapQuote(content: string) {
    return `${this.outputQuote}${content}${this.outputQuote}`;
  }
}
