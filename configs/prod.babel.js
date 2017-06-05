import path from 'path'
import webpack from 'webpack'
export default {
	entry : path.resolve( __dirname, '../app/index' ),
	output : {
		filename: 'dist/app.js'
	},
	module : {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}, {
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}, {
				test: /\.(jpg|png)/,
				use: [ 'url-loader?limit=10000', 'file-loader' ]
			}, {
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader'
			}, {
				test: /\.less$/,
				use: [ 'style-loader', 'css-loader', 'less-loader' ]
			}
		]
	},
	resolve : {
		extensions: [
			'.js', '.css', '.less', '.json'
		],
		alias: {
			'@': 'src'
		}
	},
	plugins : [
		//定义打包后的代码头部信息
		new webpack.BannerPlugin( 'Copyright by 石坤@492809110@qq.com' ),
		//热加载模块替换
		new webpack.HotModuleReplacementPlugin( ),
		//定义runtime全局变量
		new webpack.DefinePlugin({
			__DEV__: JSON.stringify(JSON.parse( ( process.env.NODE_ENV == 'production' ) || 'false' ))
		}),
		// 可以将react的执行改为发布环境，去掉错误提示等，NODE_ENV应该赋值为production
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(JSON.parse( process.env.NODE_ENV ))
			}
		}),
		// 代码压缩，去掉console.warning提示
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
}
