const {
  TARGET,
} = require('./meta'); // eslint-disable-line import/no-unresolved

let config;

if (TARGET === 'common') {
  config = require('./common'); // eslint-disable-line global-require
}

module.exports = config;
