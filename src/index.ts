import { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import { AxiosRequestConfigAdapter } from './adapter/AxiosRequestConfigAdapter';
import { defaultR2CurlOptions, IR2CurlOptions } from './interface/IR2CurlOptions';
import IRequestAdaptor from './interface/IRequestAdaptor';
import { CurlBuilder } from './lib/CurlBuilder';

const log = debug('r2curl:index');

export default function r2curl(request: AxiosRequestConfig, option: Partial<IR2CurlOptions> = {}): string {
  const mergedOption: IR2CurlOptions = { ...defaultR2CurlOptions, ...option };

  const adapter: IRequestAdaptor = (() => {
    return new AxiosRequestConfigAdapter(request);
  })();

  const curl = new CurlBuilder(adapter, mergedOption).toString();
  log('cURL Command: ', curl);

  return curl;
}
