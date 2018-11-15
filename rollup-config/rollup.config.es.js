const config = require('./rollup.config.comm');

config.output.file = 'dist/index.es.min.js';
config.output.format = 'es';

module.exports = config;