const path = require('path')
const FileListPlugin = require('./src/plugins/FileListPlugin')

module.exports = {
  mode: "production",
  entry: {
    app: './src/a.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].bundle.[chunkhash:8].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: {
      name: 'bundle'
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
  },
  resolve: {
  },
  plugins: [
    new FileListPlugin()
  ]
}