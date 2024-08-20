class MyWebpackPlugin {
  apply(compiler) {
    // compiler.hooks.done.tap('My Plugin', stats => {
    //   console.log('MyPlugin: done');
    // })
    compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
      console.log('This is an example plugin!');
      const source = compilation.assets['main.js'].source();
      const banner = [
        '/**',
        ' * 이것은 BannerPlugin이 처리한 결과입니다.',
        ' * Build Date: 2023-08-20',
        ' */'
      ].join('\n');
      const updatedSource = banner + '\n\n' + source;
      // 수정된 소스를 assets에 다시 설정합니다.
      compilation.assets['main.js'] = {
        source: () => updatedSource,
        size: () => updatedSource.length
      };
      console.log('Banner added to main.js');
      callback();// 비동기 작업이 완료되었음을 알림.
    })
  }
}

module.exports = MyWebpackPlugin;