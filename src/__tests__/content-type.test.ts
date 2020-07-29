import { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import { HTTP_HEADER } from '../enum/HTTP_HEADER';
import { HTTP_HEADER_CONTENT_TYPE } from '../enum/HTTP_HEADER_CONTENT_TYPE';
import { HTTP_METHOD } from '../enum/HTTP_METHOD';
// tslint:disable-next-line: import-name
import r2curl from '../index';

// tslint:disable-next-line:no-implicit-dependencies

// tslint:disable-next-line:import-name

const log = debug('r2curl:tc:content-type');

describe('content-type r2curl option', () => {
  test('default content-type option is json utf8', () => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: 'POST',
      data: {
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
    };

    const curl = r2curl(config);

    log(curl);

    expect(curl.includes(`Content-Type:${HTTP_HEADER_CONTENT_TYPE.JSON_UTF8}`)).toBeTruthy();
  });

  test('"PATCH" Method has content-type option is json utf8', () => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: 'PATCH',
      data: {
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
    };

    const curl = r2curl(config);

    log(curl);

    expect(curl.includes(`Content-Type:${HTTP_HEADER_CONTENT_TYPE.JSON_UTF8}`)).toBeTruthy();
  });

  test('formal string default content-type', () => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: HTTP_METHOD.POST,
    };

    const defaultContentType = 'application/json5';
    const curl = r2curl(config, { defaultContentType });

    log('json5 content-type: ', curl);

    expect(curl.includes(`Content-Type:${defaultContentType}`)).toBeTruthy();
  });

  test('defaultContentType value is "false" => not include Content-Type header', () => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: HTTP_METHOD.PUT,
    };

    const defaultContentType = false;
    const curl = r2curl(config, { defaultContentType });

    expect(curl.includes(`Content-Type:`)).toBeFalsy();
  });

  test('GET method not appear Content-Type Header', () => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: HTTP_METHOD.GET,
    };

    const curl = r2curl(config);

    expect(curl.includes(`Content-Type:`)).toBeFalsy();
  });

  test('DELETE method not appear Content-Type Header', () => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: HTTP_METHOD.DELETE,
    };

    const curl = r2curl(config);

    expect(curl.includes(`Content-Type:`)).toBeFalsy();
  });

  test('if use "forceBody" option, enable default Content-Type', () => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: HTTP_METHOD.GET,
      data: {
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
    };

    const curl = r2curl(config, {
      forceBody: true,
    });

    expect(curl.includes(`Content-Type:`)).toBeTruthy();
  });
});

describe('difference content-type', () => {
  test('difference body string as form-urlencoded content-type', done => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: HTTP_METHOD.POST,
      data: {
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
      headers: {
        [HTTP_HEADER.CONTENT_TYPE]: HTTP_HEADER_CONTENT_TYPE.FORM_URLENCODED,
      },
    };

    const curl = r2curl(config);

    log(curl);

    expect(curl).toBe(
      // tslint:disable-next-line:max-line-length
      "curl -X POST 'https://google.com' -H 'Content-Type:application/x-www-form-urlencoded' --data 'caller=https%3A%2F%2Fgithub.com%2Fuyu423%2Fr2curl&sorry=true'",
    );

    done();
  });
});
