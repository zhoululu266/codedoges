import userController from '../controllers/user'
import movieController from '../controllers/movie'
import koaBody from 'koa-body'
import koaRouter from 'koa-router'
import multer from 'koa-multer'
import path from 'path'
import logger from 'koa-logger'
import session from 'koa-session'
let router = new koaRouter({prefix: '/api'}),
	bodyParser = new koaBody({multipart: true}),
	upload = multer({
		dest: path.resolve(__dirname, '../data/test')
	})

let routes = app => {
	app.keys = ['some secret hurr'];

	const CONFIG = {
		key: 'koa:sess',
		/** (string) cookie key (default is koa:sess) */
		/** (number || 'session') maxAge in ms (default is 1 days) */
		/** 'session' will result in a cookie that expires when session/browser is closed */
		/** Warning: If a session cookie is stolen, this cookie will never expire */
		maxAge: 86400000,
		overwrite: true,
		/** (boolean) can overwrite or not (default true) */
		httpOnly: true,
		/** (boolean) httpOnly or not (default true) */
		signed: true,
		/** (boolean) signed or not (default true) */
		rolling: false,
		/** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
	};
	router.use(session(CONFIG, app))
	// post 用户登陆
	router.post('/login', bodyParser, userController.login)
	// post 用户注册
	router.post('/signin', bodyParser, userController.signin)
	// get 获取电影列表
	router.get('/movielist', movieController.getMovielist)
	// get 豆瓣电影api TOP250 list
	router.get('/doubantop250', bodyParser, movieController.doubantop250)
	// post 添加电影
	router.post('/addmovie', bodyParser, movieController.addMovie)

	router.get('/test', ctx => {
		ctx.session.name = 'test'
		ctx.body = 'test'
	})

	// 路由中间件
	app.use(logger()).use(router.routes()).use(router.allowedMethods())
}

export default routes
