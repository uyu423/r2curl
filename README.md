# r2curl

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c6b96d8b0ded4763aaf8b6a8179fb093)](https://app.codacy.com/app/uyu423/r2curl?utm_source=github.com&utm_medium=referral&utm_content=uyu423/r2curl&utm_campaign=Badge_Grade_Dashboard)

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
