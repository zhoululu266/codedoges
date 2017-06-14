const MovieModel = require('../models/movie')
let axios = require('axios')
let doubanApi = 'https://api.douban.com/v2'
/**
* 获取豆瓣api top250列表
* @method doubantop250
* @param  {[Object]}  ctx [context]
* @return null
*/
exports.doubantop250 = async ctx => {
	try {
		let result = await axios({
			url: `${doubanApi}/movie/top250`,
			method: 'get',
			data: {
				start: 0,
				count: 250
			}
		})
		ctx.body = {
			msg: '获取豆瓣电影top250成功',
			status: 1,
			data: result.data
		}
	} catch (err) {
		ctx.body = {
			msg: '获取豆瓣电影top250失败',
			status: 0,
			data: null
		}
	}
}

/**
 * 获取电影列表
 * @method getMovielist
 * @param  {[Object]}  ctx [context]
 * @return null
 */
exports.getMovielist = async ctx => {
	try {
		let result = await MovieModel.find()
		ctx.body = {
			msg: '获取电影列表成功',
			status: 1,
			data: result
		}
	} catch (err) {
		ctx.body = {
			msg: '获取电影列表失败',
			status: 0,
			data: null
		}
	}
}

/**
 * 添加电影
 * @method addMovie
 * @param  {[Object]}  ctx [context]
 * @return null
 */
exports.addMovie = async ctx => {
	try {
		let moviename = ctx.request.body.moviename
		let newMovie = new MovieModel(ctx.request.body)
		let result = await MovieModel.findOneAndUpdate({
			moviename: moviename
		}, newMovie, {upsert: true})
		ctx.body = {
			msg: '添加电影成功',
			status: 1,
			data: result
		}
	} catch (err) {
		ctx.body = {
			msg: '添加电影失败',
			status: 0,
			data: null
		}
	}
}

exports.testBinary = async ctx => {
	ctx.req.file.filename = 'avatar.jpg'
	console.log(ctx.req.file)
}
