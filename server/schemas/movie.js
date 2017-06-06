const Schema = require('mongoose').Schema
const MovieSchema = new Schema({
	moviename: {
		unique: true,
		type: String
	},
	poster: String,
	avatars: [
		{
			actorname: String,
			avatar: String
		}
	]
})

module.exports = MovieSchema
