var webpack = require('webpack')

module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: './index.js',
    html: './index.html'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'dist',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.html$/,
        loader: 'file?name=[path][name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      { test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ }
    ]
  }
};
