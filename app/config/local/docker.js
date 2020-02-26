import commonConfig from './common';

export default Object.assign({}, commonConfig, {
  HOST_URL: 'http://localhost:8080',
  API_HOST_URL: 'http://localhost:8080/api',
  API_HOST_INTERNAL_URL: 'http://api:4000',
  CHAT_URL: 'http://localhost:8080/chat',
});
