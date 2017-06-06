const UserModel = require('../models/user')

exports.login = (username, password) => {
	return new Promise((resolve, reject) => {
		UserModel.findOne({username: username, password: password}).then((doc, err) => {
			if (err) {
				reject(err)
			} else {
				if (doc) {
					resolve(doc)
				} else {
					reject('登陆失败')
				}
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
				let newUser = new UserModel({username: username, password: password})
				newUser.save({username: username, password: password}).then((doc, err) => {
					if (err) {
						reject(err)
					} else {
						resolve(doc)
					}
				})
			}
		})
	})
}
