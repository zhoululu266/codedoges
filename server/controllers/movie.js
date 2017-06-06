const MovieModel = require('../models/movie')

exports.getMovielist = () => {
	return new Promise((resolve, reject) => {
		MovieModel.find({}).then((doc, err) => {
			if (err) {
				reject(err)
			} else {
				resolve(doc)
			}
		})
	})
}

exports.addMovie = (movie) => {
	return new Promise((resolve, reject) => {
		MovieModel.findOne({moviename: movie.moviename}).then((doc, err) => {
			if (doc) {
				reject('电影已存在')
			} else {
				let newMovie = new MovieModel(movie)
				newMovie.save().then((doc, err) => {
					resolve(doc)
				})
			}
		})
	})
}
