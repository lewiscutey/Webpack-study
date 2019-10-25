const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    'index': ['./src/index.js'],
    // 'main': ['./src/main.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/loaders')
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [
        //   {loader: 'style-loader'},
        //   {loader: 'css-loader'}
        // ],
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: 'css-loader'
        // })
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'a-loader.js',
      //       options: {
      //         aa: 11,
      //         bb: 22
      //       }
      //     },
      //     'b-loader.js',
      //     'c-loader.js',
      //     {loader: 'babel-loader'}
      //   ],
      //   exclude: /node_modules/
      // }
    ]
  },
  plugins: [
    // new ExtractTextPlugin('[name].css'),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      title: 'ExtractTextPlugin',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'head'
    })
  ]
}