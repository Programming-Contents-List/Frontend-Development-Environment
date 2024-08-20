const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve('./my-webpack-loader.js')
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: './dist/',
              name: '[name].[ext]' //?[hash]
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 빌드 전에 dist 폴더를 정리합니다.
    new MyWebpackPlugin(),
  ],
}