// tslint:disable max-line-length
import axios, { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import * as shelljs from 'shelljs';
// tslint:disable-next-line:import-name
import r2curl from '../index';

const log = debug('r2curl:tc:force-body-option');

describe('force-body option', () => {
  test('if options is false, GET not allow body', done => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: 'GET',
      data: {
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
    };

    const curl = r2curl(config, { forceBody: false });
    const exec = shelljs.exec(`${curl} --silent > /dev/null`);

    log(curl);

    expect(exec.code).toBeLessThan(1);
    expect(curl).toBe('curl -X GET \'https://google.com\'');
    done();
  });

  test('if options is false, DELETE not allow body', done => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: 'DELETE',
      data: {
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
    };

    const curl = r2curl(config, { forceBody: false });
    const exec = shelljs.exec(`${curl} --silent > /dev/null`);

    log(curl);

    expect(exec.code).toBeLessThan(1);
    expect(curl).toBe('curl -X DELETE \'https://google.com\'');
    done();
  });

  test('if options is true, GET allow body', done => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: 'GET',
      data: {
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
    };

    const curl = r2curl(config, { forceBody: true });

    log(curl);

    // somtime occur http protocol error.
    // const exec = shelljs.exec(`${curl} --silent > /dev/null`);
    // expect(exec.code).toBeLessThan(1);

    expect(curl).toBe('curl -X GET \'https://google.com\' --data \'{"caller":"https://github.com/uyu423/r2curl","sorry":true}\'');
    done();
  });

  test('if options is true, DELETE allow body', done => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: 'DELETE',
      data: {
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
    };

    const curl = r2curl(config, { forceBody: true });
    const exec = shelljs.exec(`${curl} --silent > /dev/null`);

    log(curl);

    expect(exec.code).toBeLessThan(1);
    expect(curl).toBe('curl -X DELETE \'https://google.com\' --data \'{"caller":"https://github.com/uyu423/r2curl","sorry":true}\'');
    done();
  });
});
