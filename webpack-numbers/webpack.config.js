const path = require('path')
const WorkBoxPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: "production",
  entry: './src/index.ts',
  devtool: 'inline-source-map',
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
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new WorkBoxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}