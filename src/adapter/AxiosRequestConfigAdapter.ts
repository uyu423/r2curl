import { AxiosRequestConfig } from 'axios';
import { HTTP_METHOD } from '../enum/HTTP_METHOD';
import IRequestAdaptor from '../interface/IRequestAdaptor';
import { isEmpty } from '../lib/isEmpty';

export class AxiosRequestConfigAdapter implements IRequestAdaptor {
  constructor(private readonly _prop: AxiosRequestConfig) {}

  get method(): HTTP_METHOD {
    if (isEmpty(this._prop.method)) {
      return HTTP_METHOD.GET;
    }
    const method = this._prop.method.toUpperCase();
    switch (method) {
      case 'GET': {
        return HTTP_METHOD.GET;
      }
      case 'POST': {
        return HTTP_METHOD.POST;
      }
      case 'PUT': {
        return HTTP_METHOD.PUT;
      }
      case 'DELETE': {
        return HTTP_METHOD.DELETE;
      }
      case 'HEAD': {
        return HTTP_METHOD.HEAD;
      }
      case 'OPTIONS': {
        return HTTP_METHOD.OPTIONS;
      }
      default: {
        return HTTP_METHOD.GET;
      }
    }
  }

  get headers() {
    if (isEmpty(this._prop.headers)) {
      return {};
    }
    return this._prop.headers;
  }

  get body() {
    return this._prop.data;
  }

  get url() {
    return `${this._prop.baseURL || ''}${this._prop.url || ''}`;
  }
}
