const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin');
const webpack = require('webpack');
const childProcess = require('child_process');  //from node_modules
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  entry: {
    main: './app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: [
        //   path.resolve('./my-webpack-loader.js')
        // ],
        exclude: /node_modules/,  // node_modules는 제외
        loader: 'babel-loader', //바벨 로더 추가
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader', 'css-loader'
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
    new webpack.BannerPlugin({
      banner: `
      Build Date: ${new Date().toLocaleDateString()}
      Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
      Author: ${childProcess.execSync('git config user.name')}
      `
    }),
    new webpack.DefinePlugin({
      TWO: JSON.stringify('1+1'),
      'api.domain': JSON.stringify('http://dev.api.domain.com')
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      },
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
      } : false
    }),
    new CleanWebpackPlugin(), // 빌드 전에 dist 폴더를 정리합니다.
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : [])

  ],
}