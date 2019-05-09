export interface IR2CurlOptions {
  /** Determines the type of quota around the body and uri. */
  quote: 'single' | 'double';
}

export const defaultR2CurlOptions: IR2CurlOptions = {
  quote: 'single',
};
