import path from 'path'
import webpack from 'webpack'
import {devMiddleware, hotMiddleware} from 'koa-webpack-middleware'
import webpackConfig from '../configs/dev.babel.js'
import koa from 'koa'
import koaRouter from 'koa-router'
import ora from 'ora'
import fs from 'fs'
let spinner = ora('webpack-dev-server is starting'),
	router = new koaRouter(),
	_resolve;
new Promise(resolve => {
	_resolve = resolve
})
spinner.start()
const compiler = webpack(webpackConfig, async(err, stats) => {
		if (err)
			throw err
		spinner.succeed()
		_resolve()
		process.stdout.write(stats.toString({colors: true, modules: false, children: false, chunks: false, chunkModules: false}) + '\n\n')
	}),
	app = new koa()
app.use(router.routes()).use(router.allowedMethods()).use(devMiddleware(compiler, {
	quiet: true,
	publicPath: '../'
})).use(hotMiddleware(compiler)).listen(80)
