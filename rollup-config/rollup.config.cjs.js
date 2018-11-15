const config = require('./rollup.config.comm');

config.output.file = 'dist/index.cjs.min.js';
config.output.format = 'cjs';

module.exports = config;