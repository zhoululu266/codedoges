import path from 'path'
import webpackHtmlPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
export default {
	entry : './src/index',
	output : {
		path: path.resolve( __dirname, 'dist' ),
		filename: '[hash].index.js'
	},
	devServer : {
		inline: true,
		hot: true,
		port: 80,
		host: '0.0.0.0'
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
			}
		]
	},
	resolve : {
		extensions: [
			'.js', '.css', '.json'
		],
		alias: {
			'@': 'src'
		}
	},
	plugins : [
		new webpackHtmlPlugin({ filename: 'index.html', template: 'index.html', inject: true }),
		new webpack.HotModuleReplacementPlugin( )
	]
}
