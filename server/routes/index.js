let userController = require('../controllers/user')
let movieController = require('../controllers/movie')
let koaBody = require('koa-body')()
let router = require('koa-router')({prefix: '/api'})
let axios = require('axios')
let doubanApi = 'https://api.douban.com/v2'
let routes = (app) => {
	// get 测试webpack-dev-server.proxy
	router.get('/', koaBody, ctx => {
		ctx.body = 'proxy test'
	})
	// post 测试post
	router.post('/user', koaBody, ctx => {
		let username = ctx.request.body.username
		let password = ctx.request.body.password
		ctx.body = username + password
	})
	// post 用户登陆
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
	// post 用户注册
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
	// get 获取TOP250的电影列表
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
	// post 添加电影
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
	// get 豆瓣电影api TOP250
	router.get('/doubantop250', koaBody, async ctx => {
		let result;
		await axios({
			url: `${doubanApi}/movie/top250`,
			method: 'get',
			data: {
				start: 0,
				count: 250
			}
		}).then(res => {
			let data = res.data
			if (res.status === 200) {
				result = {
					msg: '获取豆瓣电影top250成功',
					status: 1,
					data
				}
			} else {
				result = {
					msg: '获取豆瓣电影top250失败',
					status: 0,
					data: null
				}
			}
		})
		ctx.body = result
	})
	app.use(router.routes()).use(router.allowedMethods())
}

module.exports = routes
