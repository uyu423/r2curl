# r2curl

 [![npm version](https://badge.fury.io/js/r2curl.svg)](https://badge.fury.io/js/r2curl) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php) [![CircleCI](https://circleci.com/gh/uyu423/r2curl.svg?style=svg)](https://circleci.com/gh/uyu423/r2curl)
 [![Codacy Badge](https://api.codacy.com/project/badge/Grade/c6b96d8b0ded4763aaf8b6a8179fb093)](https://app.codacy.com/app/uyu423/r2curl?utm_source=github.com&utm_medium=referral&utm_content=uyu423/r2curl&utm_campaign=Badge_Grade_Dashboard) [![Code Climate](https://codeclimate.com/github/uyu423/r2curl.svg)](https://codeclimate.com/github/uyu423/r2curl) [![Test Coverage](https://api.codeclimate.com/v1/badges/bb19fbd2394b545aefb2/test_coverage)](https://codeclimate.com/github/uyu423/r2curl/test_coverage)



Node.js Request Wrapper (axios, fetch, ..) to cURL Command String

## Roadmap

- [ ] axios
  - [x] AxiosRequestConfig
  - [ ] AxiosResposne
- [ ] node-fetch
- [ ] request
- [ ] ...

## Usage

### Basic

```typescript
// if js, const r2curl = require('r2curl');
import r2curl from 'r2curl';

// requestConfig as AxiosRequestConfig in axios
const curl = r2curl(reqeustConfig);
console.log(curl);
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
