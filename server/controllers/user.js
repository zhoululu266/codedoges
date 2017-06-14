const UserModel = require('../models/user')

exports.login = async ctx => {
	let username = ctx.request.body.username
	let password = ctx.request.body.password
	try {
		let result = await UserModel.findOne({username, password})
		ctx.body = {
			msg: 'ok',
			status: 1,
			data: result
		}
	} catch (err) {
		ctx.body = {
			msg: 'error',
			status: 0,
			data: err
		}
	}
}

exports.signin = async(ctx) => {
	let username = ctx.request.body.username
	let password = ctx.request.body.password
	try {
		let newUser = new UserModel({username, password})
		let result = await UserModel.findOneAndUpdate({
			username: username
		}, newUser, {upsert: true})
		ctx.body = {
			msg: '注册成功',
			status: 1,
			data: result
		}
	} catch (err) {
		ctx.body = {
			msg: '注册失败',
			status: 0,
			data: null
		}
	}
}
