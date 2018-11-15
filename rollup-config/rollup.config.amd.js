const config = require('./rollup.config.comm');

config.output.file = 'dist/index.amd.min.js';
config.output.format = 'amd';

module.exports = config;