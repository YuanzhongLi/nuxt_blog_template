import commonConfig from './common';

export default Object.assign({}, commonConfig, {
  HOST_URL: 'http://localhost:3000',
  API_HOST_URL: 'http://localhost:4000',
  API_HOST_INTERNAL_URL: 'http://localhost:4000',
  CHAT_URL: 'http://localhost:4000/chat',
});
