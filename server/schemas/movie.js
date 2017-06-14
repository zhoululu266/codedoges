const Schema = require('mongoose').Schema
const MovieSchema = new Schema({
	//电影名字，唯一
	moviename: {
		unique: true,
		type: String
	},
	//电影海报图url地址
	poster: String,
	//演员信息数组，name名字，avatar头像url地址
	actors: [
		{
			name: String,
			avatar: String
		}
	],
	//导演信息数组，name名字，avatar头像url地址
	directors: [
		{
			name: String,
			avatar: String
		}
	],
	//是否喜欢，true喜欢
	isLike: Boolean,
	//播放电影url地址
	url: String,
	//截图url地址
	screenshot: String
})

module.exports = MovieSchema
