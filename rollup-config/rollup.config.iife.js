const config = require('./rollup.config.comm');

config.output.file = 'dist/index.iife.min.js';
config.output.format = 'iife';
config.output.name = 'index';

module.exports = config;