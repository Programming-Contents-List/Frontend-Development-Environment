const { version } = require('webpack');
const myBabelPreset = require('./my-babel-preset');
module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          chrome: '79',  //79, 60
          ie: '11'
        },
        useBuiltIns: "usage", // 폴리필 사용 방식 지정 기본값은 false
        corejs: {
          // 폴리필 버전 지정
          version: 3,
        },
        /**
         * useBuiltIns: "usage", // 폴리필 사용 방식 지정 기본값은 false
        corejs: 3, // 폴리필 버전 지정
         */
      }
    ]
  ]
};
