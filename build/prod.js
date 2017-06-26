import webpack from 'webpack'
import {devMiddleware} from 'koa-webpack-middleware'
import webpackConfig from '../configs/prod.babel.js'
import ora from 'ora'
let spinner = ora({text: 'building for production...', spinner: 'dots2'})
spinner.start()
webpack(webpackConfig, (err, stats) => {
	spinner.succeed()
	if (err)
		throw err
	process.stdout.write(stats.toString({colors: true, modules: false, children: false, chunks: false, chunkModules: false}) + '\n\n')
})
