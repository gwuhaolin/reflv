const fs = require('fs');
const path = require('path');
const { WebPlugin } = require('web-webpack-plugin');

module.exports = {
  output: {
    publicPath: '',
    filename: '[name].js',
  },
  resolve: {
    // 加快搜索速度
    modules: [path.resolve(__dirname, 'node_modules')],
    // es tree-shaking
    mainFields: ['jsnext:main', 'browser', 'main'],
    // 支持 npm link
    symlinks: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // cacheDirectory 缓存babel编译结果加快重新编译速度
        loader: 'babel-loader?cacheDirectory',
        // 只命中src目录里的js文件，加快webpack搜索速度
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'doc')]
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'doc')]
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf|flv)$/,
        loader: 'file-loader',
      },
    ]
  },
  entry: {
    doc: './doc/index',
  },
  plugins: [
    new WebPlugin({
      template: './doc/template.html',
      filename: 'index.html'
    }),

  ],
  devtool: 'source-map',
};
