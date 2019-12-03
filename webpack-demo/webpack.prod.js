const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
	mode: 'production',
	devtool: 'cheap-module-source-map',  // 控制是否生成以及如何生成 source map
	devServer: {  // 检测代码变化并自动重新编译并自动刷新浏览器
		contentBase: path.resolve(__dirname, 'dist'),  // 设置静态资源的根目录
	},
	output: {  // 输出，只可指定一个输出配置
		filename: '[name].[chunkhash].js',  // 输出文件名
	},
	plugins: [  // 插件属性，是插件的实例数组
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production') // 在编译的代码里设置了`process.env.NODE_ENV`变量
		}),
	]
});