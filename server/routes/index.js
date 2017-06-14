let userController = require('../controllers/user')
let movieController = require('../controllers/movie')
let koaBody = require('koa-body')({multipart: true})
let router = require('koa-router')({prefix: '/api'})
let multer = require('koa-multer')
let path = require('path')
let upload = multer({
	dest: path.resolve(__dirname, '../data/test')
})
let logger = require('koa-logger')

let routes = app => { // post 用户登陆
	router.post('/login', koaBody, userController.login)
	// post 用户注册
	router.post('/signin', koaBody, userController.signin)
	// get 获取电影列表
	router.get('/movielist', movieController.getMovielist)
	// get 豆瓣电影api TOP250 list
	router.get('/doubantop250', koaBody, movieController.doubantop250)
	// post 添加电影
	router.post('/addmovie', koaBody, movieController.addMovie)

	router.post('/testbinary', upload.single('picture'), movieController.testBinary)
	// 路由中间件
	app.use(logger()).use(router.routes()).use(router.allowedMethods())
}

module.exports = routes
