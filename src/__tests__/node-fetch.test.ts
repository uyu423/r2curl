import debug from 'debug';
import nodeFetch, { Request, Response } from 'node-fetch';
// tslint:disable-next-line:no-implicit-dependencies
import * as shelljs from 'shelljs';
// tslint:disable-next-line:import-name
import r2curl from '../index';

const log = debug('r2curl:tc:node-fetch');

describe('node-fetch reqeust test', () => {
  test('fetch', async () => {
    const resp: Response = await nodeFetch('https://google.com');
    log(resp.body);
  });
});
