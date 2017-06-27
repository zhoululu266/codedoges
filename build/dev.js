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
	_resolve
new Promise(resolve => {
	_resolve = resolve
})
spinner.start()
const compiler = webpack(webpackConfig, (err, stats) => {
		if (err)
			throw err
		spinner.stop()
		_resolve()
		process.stdout.write(stats.toString({colors: true, modules: false, children: false, chunks: false, chunkModules: false}) + '\n\n')
	}),
	app = new koa()
router.get('/', async(ctx) => {
	ctx.type = 'text/html'
	ctx.body = await fs.readFileSync(path.resolve(__dirname, '../index.html')).toString('utf8')
})
app.use(router.routes()).use(router.allowedMethods()).use(devMiddleware(compiler, {quiet: true})).use(hotMiddleware(compiler)).listen(80)
