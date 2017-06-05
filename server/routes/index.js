const userController = require( '../controllers/user' )
const routes = ( router, koaBody ) => {
	router.get('/', koaBody, ctx => {
		ctx.body = 'proxy test'
	})
	router.post('/user', koaBody, ctx => {
		let username = ctx.request.body.username
		let password = ctx.request.body.password
		ctx.body = username + password
	})
	router.post('/login', koaBody, async( ctx, next ) => {
		const username = ctx.request.body.username
		const password = ctx.request.body.password
		console.log( ctx.request.body )
		let result;
		await userController.login( username, password ).then(( res ) => {
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
}

module.exports = routes
