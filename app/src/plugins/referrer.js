/* eslint-disable */

export default ({ app }) => {
  if (!document.cookie.includes('referrer=')) {
    document.cookie = 'referrer=' + document.referrer;
  }
};
