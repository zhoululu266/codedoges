let userController = require('../controllers/user')
let movieController = require('../controllers/movie')
let koaBody = require('koa-body')()
let router = require('koa-router')({prefix: '/api'})
let routes = (app) => {
	router.get('/', koaBody, ctx => {
		ctx.body = 'proxy test'
	})
	router.post('/user', koaBody, ctx => {
		let username = ctx.request.body.username
		let password = ctx.request.body.password
		ctx.body = username + password
	})
	router.post('/login', koaBody, async(ctx, next) => {
		let username = ctx.request.body.username
		let password = ctx.request.body.password
		let result;
		await userController.login(username, password).then(res => {
			result = {
				msg: 'ok',
				status: 1,
				data: res
			}
		}).catch(err => {
			result = {
				msg: 'error',
				status: 0,
				data: err
			}
		});
		ctx.body = result
	})
	router.post('/signin', koaBody, async ctx => {
		let username = ctx.request.body.username
		let password = ctx.request.body.password
		let result;
		await userController.signin(username, password).then(res => {
			result = {
				msg: '注册成功',
				status: 1,
				data: res
			}
		}).catch(err => {
			result = {
				msg: '注册失败',
				status: 0,
				data: err
			}
		});
		ctx.body = result
	})
	router.get('/movielist', async ctx => {
		let result;
		await movieController.getMovielist().then(res => {
			result = {
				msg: '获取电影列表成功',
				status: 1,
				data: res
			}
		}).catch(err => {
			result = {
				msg: '获取电影列表失败',
				status: 0,
				data: err
			}
		});
		ctx.body = result
	})
	router.post('/addmovie', koaBody, async ctx => {
		let movie = ctx.request.body
		let result;
		await movieController.addMovie(movie).then(res => {
			result = {
				msg: '添加电影成功',
				status: 1,
				data: res
			}
		}).catch(err => {
			result = {
				msg: '添加电影失败',
				status: 0,
				data: err
			}
		});
		ctx.body = result
	})
	app.use(router.routes()).use(router.allowedMethods())
}

module.exports = routes
