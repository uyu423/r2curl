import debug from 'debug';
import { CURL_OPTIONS } from '../enum/CURL_OPTIONS';
import CommonUtils from './CommonUtils';
import { isNotEmpty } from './isEmpty';

const log = debug('r2curl:OptionContainer');

/** curl 옵션을 구성한다. command - value 쌍이다. */
interface ICurlOption {
  command: string;
  value: string | null;
}

// tslint:disable-next-line: class-name
class OptionContainer {
  private options: ICurlOption[];

  constructor() {
    this.options = [];
  }

  // The following methods are used from time to time when needed.
  public add(command: CURL_OPTIONS, value?: string) {
    this.options.push({
      command,
      value: isNotEmpty(value) ? value : null,
    });
  }

  public toString(): string {
    log(this.options);

    return this.options
      .map(option => {
        const value = isNotEmpty(option.value) ? CommonUtils.wrapQuote(option.value) : null;

        return `${option.command}${isNotEmpty(value) ? ' [[value]]'.replace('[[value]]', value) : ''}`;
      })
      .join(' ');
  }

  // for Debug & testCase
  // tslint:disable-next-line: function-name
  public ___reset() {
    this.options = [];
  }
}

// this container is singletone;
// tslint:disable-next-line: variable-name
const container = new OptionContainer();
export { container as OptionContainer };
