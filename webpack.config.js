'use strict';

const path = require('path');
// const proxy = require('./server/webpack-dev-proxy');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const postcssInit = require('./webpack/postcss');

module.exports = {
  entry: { app: './src/app/app.js' },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.jsx'],
  },

  plugins: plugins,
  postcss: postcssInit,

  devServer: {
    contentBase: './src/',
  },

  // devServer: {
  //   historyApiFallback: { index: '/' },
  //   proxy: Object.assign({}, proxy(), { '/api/*': 'http://localhost:3000' }),
  // },

  module: {
    loaders: [
      loaders.babel,
      loaders.html,
      loaders.css,
      loaders.svg,
      loaders.eot,
      loaders.woff,
      loaders.woff2,
      loaders.ttf,
    ],
  },
};
