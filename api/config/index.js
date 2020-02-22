const {
  TARGET,
} = require('./meta'); // eslint-disable-line import/no-unresolved

let config;

if (TARGET === 'local') {
  config = require('./local'); // eslint-disable-line global-require
} else if (TARGET === 'staging') {
  config = require('./staging'); // eslint-disable-line global-require
} else if (TARGET === 'production') {
  config = require('./production'); // eslint-disable-line global-require
} else {
  // eslint-disable-next-line no-console
  console.error('Invalid Target');
  process.exit(1);
}

module.exports = config;
