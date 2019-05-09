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

```typescript
// ts
import r2curl from 'r2curl';

const curl = r2curl(reqeustConfig as AxiosRequestConfig);
console.log(curl);
```
