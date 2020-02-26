import commonConfig from './common';

// connect staging local
export default Object.assign({}, commonConfig, {
  HOST_URL: 'http://localhost:3000',
  API_HOST_URL: 'https://staging.../api',
  API_HOST_INTERNAL_URL: 'https://staging.../api',
});
