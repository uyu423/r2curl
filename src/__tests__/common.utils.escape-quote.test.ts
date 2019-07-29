import { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import * as shelljs from 'shelljs';
// tslint:disable-next-line:import-name
import r2curl from '../index';
import { defaultR2CurlOptions } from '../interface/IR2CurlOptions';
import CommonUtils from '../lib/CommonUtils';

const log = debug('r2curl:test:escape-quote');

describe('Escape Quote Test', () => {
  test('simple single quote', done => {
    CommonUtils.bootstrap({ ...defaultR2CurlOptions, quote: 'single' });
    const text = 'Hello \'World\'';
    const escaped = CommonUtils.escapeQuote(text);

    log(escaped);

    expect(escaped).toBe('Hello \\\'World\\\'');

    done();
  });
  test('simple double quote', done => {
    CommonUtils.bootstrap({ ...defaultR2CurlOptions, quote: 'double' });
    const text = 'Hello "World"';
    const escaped = CommonUtils.escapeQuote(text);

    log(escaped);

    expect(escaped).toBe('Hello \\"World\\"');

    done();
  });
  test('single object stringify', done => {
    CommonUtils.bootstrap({ ...defaultR2CurlOptions, quote: 'single' });
    const payload = {
      text1: 'Hello \'World\'',
      text2: 'I\'m Gro\'ot',
      't\'est': '\'\'\'\'\'',
    };
    const escaped = CommonUtils.jsonStringifyWithEscapeQuote(payload);

    expect(escaped).toBe(`{"text1":"Hello \\'World\\'","text2":"I\\'m Gro\\'ot","t\\'est":"\\'\\'\\'\\'\\'"}`);

    log(escaped);
    done();
  });
  test('r2curl command with single quote in body', done => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: 'POST',
      data: {
        introduce: 'I\'m Yowu',
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
      headers: {
        'content-Type': 'application/json',
      },
    };

    const curl = r2curl(config);

    log(curl);

    expect(curl).toBe(
      // tslint:disable-next-line: max-line-length
      'curl -X POST \'https://google.com\' -H \'content-Type:application/json\' --data \'{"caller":"https://github.com/uyu423/r2curl","sorry":true}\'',
    );

    const exec = shelljs.exec(`${curl} --silent > /dev/null`);
    expect(exec.code).toBeLessThan(1);
    done();
  });
  test('r2curl command with double quote in body', done => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: 'POST',
      data: {
        introduce: 'My Name Is "Yu Yongwoo"',
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
      headers: {
        'content-Type': 'application/json',
      },
    };

    const curl = r2curl(config, { quote: 'double' });

    log(curl);

    expect(curl).toBe(
      // tslint:disable-next-line: max-line-length
      'curl -X POST \'https://google.com\' -H \'content-Type:application/json\' --data \'{"caller":"https://github.com/uyu423/r2curl","sorry":true}\'',
    );

    const exec = shelljs.exec(`${curl} --silent > /dev/null`);

    expect(exec.code).toBeLessThan(1);
    done();
  });
});
