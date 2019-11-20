const path = require('path')

module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    filename: 'webpack-number.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'webpackNumbers',
    libraryTarget: 'umd'
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  }
}