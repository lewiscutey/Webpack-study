const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js',
		print: './src/print.js',
	},
	output: {  // 输出，只可指定一个输出配置
		path: path.resolve(__dirname, 'dist')  // 输出文件所在的目录
	},
	module: {  // 如何处理项目中不同类型的模块
		rules: [  // 用于规定在不同模块被创建时如何处理模块的规则数组
			{
				test: /\.css$/,  // 匹配特定文件的正则表达式或正则表达式数组
				use: ['css-loader', 'style-loader']  // 应用于模块的 loader 使用列表
			},
			{ 
				test: /\.(png|svg|jpg|gif)$/,  // 增加加载图片的规则
				use: ['file-loader']
			},
			{ 
				test: /\.(woff|woff2|eot|ttf|otf)$/,  // 增加加载字体的规则
				use: ['file-loader']
			}
		]
	},
	plugins: [  // 插件属性，是插件的实例数组
		new CleanWebpackPlugin(['dist']),
	]
};