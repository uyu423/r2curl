import IRequestAdaptor from './interface/IRequestAdaptor';
import { BodyHelper } from './lib/BodyHelper';
import isEmpty from './lib/isEmpty';

export class CurlBuilder {
  constructor(private readonly _adap: IRequestAdaptor) {}

  get method(): string {
    if (isEmpty(this._adap.method)) {
      return '';
    }
    return `-X ${this._adap.method}`;
  }

  get headers(): string {
    if (isEmpty(this._adap.headers)) {
      return '';
    }
    return Object.entries(this._adap.headers)
      .map(header => `-H '${header[0]}:${header[1]}'`)
      .join(' ');
  }

  get body(): string {
    const helper = new BodyHelper(this._adap.headers, this._adap.body);
    const body = helper.toString();

    if (isEmpty(body)) {
      return '';
    }
    return `--data '${helper.toString()}'`;
  }

  get url(): string {
    return `"${this._adap.url}"`;
  }

  public toString() {
    const existData = [this.method, this.url, this.headers, this.body].filter(data => !isEmpty(data));
    return `curl ${existData.join(' ')}`.trim();
  }
}
