import consola from 'consola';
import Meta from './meta';

const { TARGET } = Meta;

/* eslint-disable global-require, consistent-return */
const getConfig = () => {
  if (TARGET === 'common') {
    return require('./common').default;
  }

  consola.error(`Invalid Target: ${TARGET}`);
  process.exit(1);
};
/* eslint-enable global-require, consistent-return */

const config = getConfig();

export default config;
