import path from 'path'
import webpack from 'webpack'
import {devMiddleware, hotMiddleware} from 'koa-webpack-middleware'
import webpackConfig from '../configs/dev.babel.js'
import koa from 'koa'
import ora from 'ora'
const spinner = ora('webpack-dev-server is starting'),
	compiler = webpack(webpackConfig, (err, stats) => {
		if (err)
			throw err
		process.stdout.write(stats.toString({colors: true, modules: false, children: false, chunks: false, chunkModules: false}) + '\n\n')
	}),
	app = new koa()
spinner.start()
app.use(devMiddleware(compiler, {quiet: true})).use(hotMiddleware(compiler)).listen(8080)
