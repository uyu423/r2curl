import { IR2CurlOptions } from '../interface/IR2CurlOptions';
import { isEmpty } from './isEmpty';

export default class CommonUtils {
  public static bootstrap(options: IR2CurlOptions) {
    this.quote = options.quote === 'single' ? '\'' : '"';
  }

  public static wrapQuote(content: string) {
    if (isEmpty(this.quote)) {
      throw new Error('CommonUtils not Bootstraped');
    }
    return `${this.quote}${content}${this.quote}`;
  }

  /**
   * If the same quota is present in a quoted string, it will not be properly parsed and added.
   *
   * @see https://github.com/uyu423/r2curl/issues/17
   */
  public static escapeQuote(content: string): string {
    const regex = new RegExp(this.quote, 'gi');
    return content.replace(regex, `\\${this.quote}`);
  }

  public static jsonStringifyWithEscapeQuote(payload: any): string {
    return this.escapeQuote(JSON.stringify(payload));
  }

  private static quote: '\'' | '"';
}
