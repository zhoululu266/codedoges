import path from 'path'
import webpack from 'webpack'
import htmlWebpackPlugin from 'html-webpack-plugin'
export default {
	entry : path.resolve(__dirname, '../app/index'),
	output : {
		filename: 'app.[hash:5].js',
		path: path.resolve(__dirname, '../dist')
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
		// 代码压缩，去掉console.warning提示
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../index.html'),
			inject: true
		})
	]
}
