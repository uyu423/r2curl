import axios, { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import * as shelljs from 'shelljs';
import { CURL_OPTIONS } from '../enum/CURL_OPTIONS';
// tslint:disable-next-line:import-name
import r2curl from '../index';
import { defaultR2CurlOptions } from '../interface/IR2CurlOptions';
import CommonUtils from '../lib/CommonUtils';
import { OptionContainer } from '../lib/OptionContainer';

const log = debug('r2curl:tc:option-container');

// describe('Option Container Class Test Case', () => {
//   beforeAll(() => {
//     CommonUtils.bootstrap(defaultR2CurlOptions);
//   });

//   afterEach(() => {
//     OptionContainer.___reset();
//   });

//   test('only add one command', done => {
//     OptionContainer.add(CURL_OPTIONS.COMPRESSED);
//     expect(OptionContainer.toString()).toBe(CURL_OPTIONS.COMPRESSED);
//     done();
//   });

//   test('only add one commmad, one value', done => {
//     OptionContainer.add(CURL_OPTIONS.COMPRESSED, 'Trash Value');
//     expect(OptionContainer.toString()).toBe(`${CURL_OPTIONS.COMPRESSED} 'Trash Value'`);
//     done();
//   });
// });

describe('Option Container Integration Test Case', () => {
  test('include header "Accept-Encoding: gzip"', done => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: 'POST',
      data: {
        caller: 'https://github.com/uyu423/r2curl',
        sorry: true,
      },
      headers: {
        'content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
    };

    // no execute
    const curl = r2curl(config);
    const exec = shelljs.exec(`${curl} --silent > /dev/null`);

    log(curl);

    expect(exec.code).toBeLessThan(1);
    expect(curl).toBe(
      // tslint:disable-next-line: max-line-length
      'curl -X POST \'https://google.com\' -H \'content-Type:application/json\' -H \'Accept-Encoding:gzip\' --data \'{"caller":"https://github.com/uyu423/r2curl","sorry":true}\' --compressed',
    );
    done();
  });
});
