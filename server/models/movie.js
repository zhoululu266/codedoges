const mongoose = require('mongoose')
const MovieSchema = require('../schemas/movie')
const MovieModel = mongoose.model('movie', MovieSchema)

module.exports = MovieModel
