import path from 'path'
import webpack from 'webpack'
import openBrowserPlugin from 'open-browser-webpack-plugin'
import htmlWebpckPlugin from 'html-webpack-plugin'
export default {
	entry : path.resolve(__dirname, '../app/index.js'),
	output : {
		filename: 'app[hash].js',
		path: path.resolve(__dirname)
	},
	module : {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}, {
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}, {
				test: /\.(jpg|png)/,
				use: ['url-loader?limit=10000', 'file-loader']
			}, {
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader'
			}, {
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			}
		]
	},
	resolve : {
		extensions: [
			'.js',
			'.css',
			'.less',
			'.json',
			'.sass',
			'.scss'
		],
		alias: {
			'@': 'src'
		}
	},
	plugins : [
		//定义打包后的代码头部信息
		new webpack.BannerPlugin('Copyright by 石坤@492809110@qq.com'),
		//热加载模块替换
		new webpack.HotModuleReplacementPlugin(),
		//打包完成后自动打开浏览器
<<<<<<< HEAD
		new openBrowserPlugin({url: 'http://localhost'})
=======
		new openBrowserPlugin({url: 'http://localhost'}),
		new htmlWebpckPlugin({
			inject: true,
			filename: 'index.html',
			template: path.resolve(__dirname, '../index.html')
		})
>>>>>>> 1fe326f69a3cfdb0b0508297d35050bcbaeb2e53
	]
}
