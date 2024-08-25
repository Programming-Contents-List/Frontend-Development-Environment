const blockScoping = require('@babel/plugin-transform-block-scoping');
const arrowFunction = require('@babel/plugin-transform-arrow-functions');
const strictMode = require('@babel/plugin-transform-strict-mode');

module.exports = function myBabelPreset() {
  return {
    plugins: [blockScoping, arrowFunction, strictMode]
  }
};