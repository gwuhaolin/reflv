const fs = require('fs');
const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const EndWebpackPlugin = require('end-webpack-plugin');
const { WebPlugin } = require('web-webpack-plugin');
const ghpages = require('gh-pages');

const outputPath = path.resolve(__dirname, '.doc');
module.exports = {
  output: {
    path: outputPath,
    publicPath: '',
    filename: '[name]_[chunkhash].js',
  },
  resolve: {
    // 加快搜索速度
    modules: [path.resolve(__dirname, 'node_modules')],
    // es tree-shaking
    mainFields: ['jsnext:main', 'browser', 'main'],
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
    doc: './doc/index.js',
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    new WebPlugin({
      template: './doc/template.html',
      filename: 'index.html'
    }),
    new EndWebpackPlugin(() => {
      ghpages.publish(outputPath, { dotfiles: true }, (err) => {
        if (err) {
          console.error('push doc to gh-pages fail');
        } else {
          console.error('push doc to gh-pages succ');
        }
      })
    }),
  ]
};
