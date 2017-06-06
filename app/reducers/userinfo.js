import * as actionTypes from '../constants/userinfo'

const initialState = {
	uuid: '',
	username: '账号',
	password: '密码',
	avatar: ''
}

export default function userinfo(state = initialState, action) {
	switch (action.type) {
		case actionTypes.USERINFO_LOGIN:
			return action.data
		default:
			return state
	}
}
