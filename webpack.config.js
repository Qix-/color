var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'index'),
  output: {
    path: path.join(__dirname, 'standalone_dist'),
    filename: 'color.min.js',
    library: 'Color',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  resolve: {
    extensions: ['', '.js']
  }
};
