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
	_resolve,
	bundles = [];
let index,
	favicon,
	bundle;
(async() => {
	index = await fs.readFileSync(path.resolve(__dirname, '../index.html')).toString('utf8'),
	favicon = await fs.readFileSync(path.resolve(__dirname, '../codedoges.jpg'))
})()
new Promise(resolve => {
	_resolve = resolve
})
spinner.start()
const compiler = webpack(webpackConfig, async(err, stats) => {
		if (err)
			throw err
		spinner.stop()
		_resolve()
		process.stdout.write(stats.toString({colors: true, modules: false, children: false, chunks: false, chunkModules: false}) + '\n\n')
		let bundleName = await fs.readdirSync(path.resolve(__dirname, '../dist')).find((name) => {
			return /\.js$/g.test(name)
		})
		bundle = await fs.readFileSync(path.resolve(__dirname, `../dist/${bundleName}`)).toString('utf8')
	}),
	app = new koa()
router.get('/', async(ctx) => {
	ctx.type = 'text/html'
	ctx.body = await index
})
router.get('/codedoges.jpg', async(ctx) => {
	ctx.type = 'image/jpeg'
	ctx.body = await favicon
})
router.get('/app.js', async(ctx) => {
	ctx.type = 'text/javascript'
	ctx.body = await bundle
})
app.use(router.routes()).use(router.allowedMethods()).use(devMiddleware(compiler, {
	quiet: true,
	publicPath: '/'
})).use(hotMiddleware(compiler)).listen(80)
