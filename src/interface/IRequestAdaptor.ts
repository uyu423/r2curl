import * as shelljs from 'shelljs';
import { HTTP_METHOD } from '../enum/HTTP_METHOD';

export default interface IRequestAdaptor {
  method: HTTP_METHOD;
  headers: { [key in string]: string };
  body: { [key in string]: any } | Array<{ [key in string]: any }>;
  url: string;
}
