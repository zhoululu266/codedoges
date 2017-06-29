import userController from '../controllers/user'
import movieController from '../controllers/movie'
import koaBody from 'koa-body'
import koaRouter from 'koa-router'
import multer from 'koa-multer'
import path from 'path'
import logger from 'koa-logger'
let router = new koaRouter({prefix: '/api'}),
	bodyParser = new koaBody({multipart: true}),
	upload = multer({
		dest: path.resolve(__dirname, '../data/test')
	})
let routes = app => { // post 用户登陆
	router.post('/login', bodyParser, userController.login)
	// post 用户注册
	router.post('/signin', bodyParser, userController.signin)
	// get 获取电影列表
	router.get('/movielist', movieController.getMovielist)
	// get 豆瓣电影api TOP250 list
	router.get('/doubantop250', bodyParser, movieController.doubantop250)
	// post 添加电影
	router.post('/addmovie', bodyParser, movieController.addMovie)

	// 路由中间件
	app.use(logger()).use(router.routes()).use(router.allowedMethods())
}

export default routes
