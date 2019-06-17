import debug from 'debug';
import { HTTP_METHOD } from '../enum/HTTP_METHOD';
import { IR2CurlOptions } from '../interface/IR2CurlOptions';
import IRequestAdaptor from '../interface/IRequestAdaptor';
import { BodyHelper } from './BodyHelper';
import CommonUtils from './CommonUtils';
import { HeaderHelper } from './HeaderHelper';
import { isEmpty, isNotEmpty } from './isEmpty';
import { OptionContainer } from './OptionContainer';

const log = debug('r2curl:CurlBuilder');

export class CurlBuilder {
  private optionContainer: OptionContainer;

  constructor(private readonly _adap: IRequestAdaptor, private readonly _option: IR2CurlOptions) {
    this.optionContainer = new OptionContainer();
  }

  get method(): string {
    if (isEmpty(this._adap.method)) {
      return '';
    }
    return `-X ${this._adap.method}`;
  }

  get headers(): string {
    const helper = new HeaderHelper(this._adap.headers, this._adap.method, this.optionContainer, this._option);
    const headers = helper.toObject();
    if (isEmpty(headers)) {
      return '';
    }
    return Object.entries(headers)
      .map(header => `-H ${CommonUtils.wrapQuote(`${header[0]}:${header[1]}`)}`)
      .join(' ');
  }

  get body(): string {
    log(`method: ${this._adap.method}`, `forceBody: ${this._option.forceBody}`, this._adap.body);

    if (!this._option.forceBody && [HTTP_METHOD.GET, HTTP_METHOD.DELETE].includes(this._adap.method)) {
      return '';
    }

    const helper = new BodyHelper(this._adap.headers, this._adap.body);
    const body = helper.toString();

    if (isEmpty(body)) {
      return '';
    }
    return `--data ${CommonUtils.wrapQuote(helper.toString())}`;
  }

  get url(): string {
    return CommonUtils.wrapQuote(this._adap.url);
  }

  public toString() {
    const existData = [this.method, this.url, this.headers, this.body].filter(data => !isEmpty(data));
    const curlOptions = this.optionContainer.toString();
    return `curl ${[existData.join(' '), curlOptions].filter(data => isNotEmpty(data)).join(' ')}`.trim();
  }
}
