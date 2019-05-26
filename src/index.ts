import { AxiosRequestConfig, AxiosResponse } from 'axios';
import debug from 'debug';
import { AxiosRequestConfigAdapter } from './adapter/AxiosRequestConfigAdapter';
import { defaultR2CurlOptions, IR2CurlOptions } from './interface/IR2CurlOptions';
import IRequestAdaptor from './interface/IRequestAdaptor';
import { CurlBuilder } from './lib/CurlBuilder';

const log = debug('r2curl:index');

export default function r2curl(
  request: AxiosRequestConfig | AxiosResponse,
  option: Partial<IR2CurlOptions> = {},
): string {
  const mergedOption: IR2CurlOptions = { ...defaultR2CurlOptions, ...option };

  // judge request wrapper object type
  const adapter: IRequestAdaptor = (() => {
    if (((_request: any): _request is AxiosResponse => 'config' in _request)(request)) {
      // judge request is AxiosResponse
      return new AxiosRequestConfigAdapter(request.config);
    }
    // judge request is AxiosRequestConfig
    return new AxiosRequestConfigAdapter(request);
  })();

  const curl = new CurlBuilder(adapter, mergedOption).toString();
  log('cURL Command: ', curl);

  return curl;
}
