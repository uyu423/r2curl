import axios, { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import * as shelljs from 'shelljs';
// tslint:disable-next-line:import-name
import r2curl from '../index';

const log = debug('r2curl:tc:default');

describe('default', () => {
  test('AxiosResponse params will success', async done => {
    const request = await axios.get('https://google.com');
    const curl = r2curl(request);

    log(curl);

    const exec = shelljs.exec(`${curl} --silent > /dev/null`);

    expect(exec.code).toBeLessThan(1);
    expect(curl).toBe(
      'curl -X GET \'https://google.com\' -H \'Accept:application/json, text/plain, */*\' -H \'User-Agent:axios/0.18.0\'',
    );

    done();
  });
  test('AxiosRequestConfig params will success', async done => {
    const config: AxiosRequestConfig = {
      url: 'https://google.com',
      method: 'POST',
      data: {
        caller: 'curl tester',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const curl = r2curl(config);
    const exec = shelljs.exec(`${curl} --silent > /dev/null`);

    log(curl);

    expect(exec.code).toBeLessThan(1);
    expect(curl).toBe(
      'curl -X POST \'https://google.com\' -H \'Content-Type:application/json\' --data \'{"caller":"curl tester"}\'',
    );
    done();
  });
});
