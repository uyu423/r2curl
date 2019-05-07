# r2curl
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
