const path = require('path')

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
    }
  },
  module: {
  },
  resolve: {
  },
  plugins: [
  ]
}