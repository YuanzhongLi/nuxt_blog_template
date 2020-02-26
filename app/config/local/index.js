import consola from 'consola';
import Meta from './meta';

const { TARGET } = Meta;

/* eslint-disable global-require, consistent-return */
const getConfig = () => {
  if (TARGET === 'ordinary') {
    return require('./ordinary').default;
  }
  if (TARGET === 'staging') {
    return require('./staging').default;
  }
  if (TARGET === 'docker') {
    return require('./docker').default;
  }

  consola.error(`Invalid Target: ${TARGET}`);
  process.exit(1);
};
/* eslint-enable global-require, consistent-return */

const config = getConfig();

export default config;
