const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'index': ['./src/index.js'],
    'main': ['./src/main.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [
        //   {loader: 'style-loader'},
        //   {loader: 'css-loader'}
        // ]
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      title: 'ExtractTextPlugin',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'head'
    })
  ]
}