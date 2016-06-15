'use strict';

exports.eslint = {
  test: /\.ts$/,
  loader: 'esint-loader',
  exclude: /node_modules/,
};

exports.babel = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    presets: ['es2015'],
  },
};

exports.html = {
  test: /\.html$/,
  loader: 'raw',
  exclude: /node_modules/,
};

exports.css = {
  test: /\.css$/,
  loader: 'style!css!postcss',
  exclude: /node_modules/,
};

exports.svg = makeUrlLoader(/\.svg$/);
exports.eot = makeUrlLoader(/\.eot$/);
exports.woff = makeUrlLoader(/\.woff$/);
exports.woff2 = makeUrlLoader(/\.woff2$/);
exports.ttf = makeUrlLoader(/\.ttf$/);

function makeUrlLoader(pattern) {
  return {
    test: pattern,
    loader: 'url',
    exclude: /node_modules/,
  };
}
