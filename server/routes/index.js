let userController = require('../controllers/user')
let routes = (router, koaBody) => {
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
	router.post('/signin', koaBody, async(ctx, next) => {
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
}

module.exports = routes
