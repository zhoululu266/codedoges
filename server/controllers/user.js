const UserModel = require('../models/user')

exports.login = (username, password) => {
	return new Promise((resolve, reject) => {
		UserModel.findOne({username: username, password: password}).then((doc, err) => {
			if (err) {
				reject(err)
			} else {
				resolve(doc)
			}
		})
	})
}

exports.signin = (username, password) => {
	return new Promise((resolve, reject) => {
		UserModel.findOne({username: username}).then((doc, err) => {
			if (doc) {
				reject('用户已存在')
			} else {
				UserModel.save({username: username, password: password}).then((doc, err) => {
					resolve(doc)
				})
			}
		})
	})
}
