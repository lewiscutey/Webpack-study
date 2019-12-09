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
    // 'app': './src/app.js'
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
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: path.resolve(__dirname, './src/commit-loader/loader.js'),
      //       options: {
      //         name: 'lewis'
      //       }
      //     },
      //   ],
      //   exclude: /node_modules/
      // },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ],
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: 'css-loader'
        // })
        // use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'a-loader.js',
            options: {
              aa: 11,
              bb: 22
            }
          },
          'b-loader.js',
          'c-loader.js',
          // {loader: 'babel-loader'}
        ],
        exclude: /node_modules/
      }
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

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.css$/,  // 尽量只在 test 和 文件名匹配 中使用正则表达式
//         resource: String | RegExp | Function | Array | Object, // 支持这些值
//         use: ['style-loader', 
//           { 
//             loader: 'css-loader',
//             options: {
//               importLoaders: 1,  // 在 css-loader 前应用的 loader 的数量
//               modules: true  // 启用 CSS 模块和设置模式
//             }
//         }],
//         enforce: 'pre' | 'inline' | 'normal' | 'post',  // 按这个顺序进行解析
//         exclude: /node_modules/,  // 尽量避免 exclude，更倾向于使用 include
//         include: ['./src/loaders/'],  // 在 include 和 exclude 中使用绝对路径数组
//         issuer: { test, include, exclude }, // 条件（导入源）
//         oneOf: [  // 只使用这些嵌套规则之一
//           {
//             resourceQuery: /inline/, // foo.css?inline
//             use: 'url-loader'
//           },
//           {
//             resourceQuery: /external/, // foo.css?external
//             use: 'file-loader'
//           }
//         ],
//         parser: {
//           amd: false, // 禁用 AMD
//           commonjs: false, // 禁用 CommonJS
//           system: false, // 禁用 SystemJS
//           harmony: false, // 禁用 ES2015 Harmony import/export
//           requireInclude: false, // 禁用 require.include
//           requireEnsure: false, // 禁用 require.ensure
//           requireContext: false, // 禁用 require.context
//           browserify: false, // 禁用特殊处理的 browserify bundle
//           requireJs: false, // 禁用 requirejs.*
//           node: false, // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
//           node: {...} // 在模块级别(module level)上重新配置 node 层(layer)
//         },
//       }
//     ]
//   }
// };