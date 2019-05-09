# r2curl

[![npm version](https://badge.fury.io/js/r2curl.svg)](https://badge.fury.io/js/r2curl) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php) [![CircleCI](https://circleci.com/gh/uyu423/r2curl.svg?style=svg)](https://circleci.com/gh/uyu423/r2curl)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f74cdea970d44550a0bff9319e467256)](https://www.codacy.com/app/uyu423/r2curl?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=uyu423/r2curl&amp;utm_campaign=Badge_Grade)[![Code Climate](https://codeclimate.com/github/uyu423/r2curl.svg)](https://codeclimate.com/github/uyu423/r2curl) [![Test Coverage](https://api.codeclimate.com/v1/badges/bb19fbd2394b545aefb2/test_coverage)](https://codeclimate.com/github/uyu423/r2curl/test_coverage)

Node.js Request Wrapper (axios, fetch, ..) to cURL Command String

## Roadmap

  - [x] axios
    - [x] AxiosRequestConfig
    - [x] AxiosResposne
  - [ ] node-fetch
  - [ ] request
  - [ ] ...

## Usage

### Basic

### `AxiosResponse`

```typescript
// if js, const r2curl = require('r2curl');
import r2curl from 'r2curl';

const response = await axios.get('https://google.com');
const curl = r2curl(response);

console.log(curl);
// stdout "curl -X GET 'https://google.com' -H 'Accept:application/json, text/plain, */*' -H 'User-Agent:axios/0.18.0'"
```

### `AxiosRequestConfig`

```typescript
// if js, const r2curl = require('r2curl');
import r2curl from 'r2curl';

// config as AxiosRequestConfig
const config = {
  url: 'https://google.com',
  method: 'POST',
  data: {
    caller: 'curl tester',
  },
  headers: {
    'Content-Type': 'application/json',
  },
};

const curl = r2curl(reqeustConfig);
console.log(curl);
// stdout `curl -X POST 'https://google.com' -H 'Content-Type:application/json' --data '{"caller":"curl tester"}'`

const response = await axios.request(config);
```

### More Options

```typescript
import r2curl from 'r2curl';

// option as IR2CurlOptions.ts
const option = {
  /** Determines the type of quota around the body and uri. */
  quote: 'double',
};

const curl = r2curl(requestConfig, option);
console.log(curl); 
```
