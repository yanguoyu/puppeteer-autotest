const config = require('./rollup.config.comm');

config.output.file = 'dist/index.umd.min.js';
config.output.format = 'umd';
config.output.name = 'index';

module.exports = config;