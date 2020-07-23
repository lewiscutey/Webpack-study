const path = require('path')
const FileListPlugin = require('./src/plugins/FileListPlugin')
const ExtractChunksPlugin = require('./src/plugins/ExtractChunksPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: {
    app: './src/a.js',
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader']
      },
    ]
  },
  optimization: {
    // runtimeChunk: {
    //   name: 'bundle'
    // },
    splitChunks: {
      chunks: 'all',
      // minSize: 5000,
      // maxSize: 0,
      // minChunks: 2,
      // maxAsyncRequests: 6,
      // maxInitialRequests: 4,
      // automaticNameDelimiter: '~',
      // automaticNameMaxLength: 30,
      cacheGroups: {
        default: {
          minChunks: 1
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10
        },
        'sync-commons': {
          chunks: 'all',
          // name: 'sync-commons',
          minChunks: 2,
          priority: 1,
          reuseExistingChunk: true,
          enforce: true
        },
        'async-commons': {
          chunks: 'async',
          name: 'async-commons',
          minChunks: 1,
          priority: 2,
          reuseExistingChunk: true,
          enforce: true
        },
        // styles: {
        //   chunks: 'all',
        //   test: /\.less|scss|css$/,
        //   name: 'styles',
        //   minChunks: 2,
        //   priority: 1,
        //   reuseExistingChunk: true,
        //   enforce: true
        // }
      }
    }
  },
  resolve: {
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ExtractTextPlugin',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'head',
      chunks: ['index']
    }),
    new FileListPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/copy.txt') },
      ],
    }),
    // new ExtractChunksPlugin({
    //   chunkPath: ''
    // })
  ]
}