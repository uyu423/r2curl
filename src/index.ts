import { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import { AxiosRequestConfigAdapter } from './AxiosRequestConfigAdapter';
import { CurlBuilder } from './CurlBuilder';
import IRequestAdaptor from './interface/IRequestAdaptor';

const log = debug('r2curl:index');

export default function r2curl(request: AxiosRequestConfig): string {
  const adapter: IRequestAdaptor = (() => {
    return new AxiosRequestConfigAdapter(request);
  })();

  const curl = new CurlBuilder(adapter).toString();
  log('cURL Command: ', curl);

  return curl;
}
