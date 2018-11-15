const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');  // 引入 webpack 便于调用其内置插件

module.exports = {
	devtool: 'inline-source-map',  // 控制是否生成以及如何生成 source map
	devServer: {  // 检测代码变化并自动重新编译并自动刷新浏览器
		contentBase: path.resolve(__dirname, 'dist'),  // 设置静态资源的根目录
		hot: true,  // 告诉 dev-server 我们在用 HMR
		hotOnly: true  // 指定如果热加载失败了禁止刷新页面 (这是 webpack 的默认行为)，这样便于我们知道失败是因为何种错误
	},
	// entry: './src/index.js',  // 入口起点，可以指定多个入口起点
	entry: {
		app: './src/index.js',
		// print: './src/print.js'
		another: './src/another.js'
	},
	output: {  // 输出，只可指定一个输出配置
		// filename: '[name].bundle.js',  // 输出文件名
		filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].bundle.js',  // 在配置文件中使用`process.env.NODE_ENV`
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
		new HtmlWebpackPlugin({
			title: "webpack demo",  // 生成 HTML 文档的标题
			filename: "index.html"  // 写入 HTML 文件的文件名，默认 `index.html`
		}),
		new CleanWebpackPlugin(['dist']),
		new webpack.optimize.CommonsChunkPlugin({
      		name: 'common'  // 抽取出的模块的模块名
    	}),
		// new webpack.HotModuleReplacementPlugin(),  // 启用 HMR
    	new webpack.NamedModulesPlugin()  // 打印日志信息时 webpack 默认使用模块的数字 ID 指代模块，不便于 debug，这个插件可以将其替换为模块的真实路径
	]
};