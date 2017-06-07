import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import createHashHistory from 'history/createHashHistory'
import axios from 'axios'
import './style.css'
import '../main.css'

const history = createHashHistory()

class FormLogin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			avatar: '',
			username: '',
			password: '',
			loginButton: '登陆'
		}
		this.handleChange = this.handleChange.bind(this)
		this.handlelogin = this.handlelogin.bind(this)
		this.handlesignin = this.handlesignin.bind(this)
	}
	componentDidMount() {
		const avatar = this.refs.avatar
		if (avatar) {
			avatar.onload = e => {
				console.log(e)
			}
			avatar.onerror = e => {
				console.log(e)
			}
		}
	}
	handleChange(e) {
		if (e.target.type == 'text') {
			this.setState({username: e.target.value})
		} else if (e.target.type == 'password') {
			this.setState({password: e.target.value})
		}
	}
	handlelogin() {
		let loginButton = <CircularProgress size={36}></CircularProgress>
		this.setState({loginButton: loginButton})
		axios({
			url: '/api/login',
			method: 'post',
			data: {
				username: this.state.username,
				password: this.state.password
			}
		}).then(res => {
			let data = res.data
			if (data.status === 1) {
				this.props.actions.login({username: data.data.username, password: data.data.password, uuid: data.data._id, avatar: data.data.avatar})
				this.setState({avatar: data.data.avatar})
				this.refs.avatarBox.style.opacity = 1
				this.setState({loginButton: '登陆'})
				history.push('/home')
			} else {
				alert(data.msg)
			}
		}).catch(err => {
			console.log(err)
		});
		// let data = JSON.stringify({username: this.state.username, password: this.state.password})
		// fetch('/api/login', {
		// 	method: 'post',
		// 	headers: {
		// 		'Content-type': 'application/json'
		// 	},
		// 	body: data
		// }).then(res => {
		// 	return res.json()
		// }).then(data => {
		// 	if (data.status === 1) {
		// 		this.props.actions.login({username: data.data.username, password: data.data.password, uuid: data.data._id, avatar: data.data.avatar})
		// 		this.setState({avatar: data.data.avatar})
		// 		this.refs.avatarBox.style.opacity = 1
		// 		this.setState({loginButton: '登陆'})
		// 		history.push('/home')
		// 	} else {
		// 		alert(data.msg)
		// 	}
		// }).catch(err => {
		// 	console.log(err)
		// });
	}
	handlesignin() {
		axios({
			url: '/api/signin',
			method: 'post',
			data: {
				username: this.state.username,
				password: this.state.password
			}
		}).then(res => {
			let data = res.data
			if (data.status === 1) {
				alert(data.msg)
			} else {
				alert(data.msg)
			}
		}).catch(err => {
			console.log(err)
		});
		// let data = JSON.stringify({username: this.state.username, password: this.state.password})
		// fetch('/api/signin', {
		// 	method: 'post',
		// 	headers: {
		// 		'Content-type': 'application/json'
		// 	},
		// 	body: data
		// }).then(res => {
		// 	return res.json()
		// }).then(data => {
		// 	if (data.status === 1) {
		// 		console.log(this.props)
		// 	} else {
		// 		console.log(data)
		// 		alert(data.msg)
		// 	}
		// }).catch(err => {
		// 	console.log(err)
		// });
	}
	render() {
		return (
			<div className="login-form">
				<div className="login-avatar" ref='avatarBox'>
					{this.state.avatar
						? <img src={this.state.avatar} alt="用户头像" ref='avatar'/>
						: ''}
				</div>
				<TextField hintText='请输入用户名' fullWidth={true} onChange={this.handleChange}></TextField>
				<TextField hintText='请输入密码' type='password' fullWidth={true} onChange={this.handleChange}></TextField>
				<div className='clearfixed' style={{
					marginTop: '50px'
				}}>
					<RaisedButton label={this.state.loginButton} style={{
						float: 'left',
						lineHeight: 0
					}} onClick={this.handlelogin}/>
					<RaisedButton label="注册" secondary={true} style={{
						float: 'right'
					}} onClick={this.handlesignin}/>
				</div>
				<div style={{
					color: '#9e9e9e',
					lineHeight: 1.5,
					fontSize: '13px',
					marginTop: '10px'
				}}>
					管理员账户admin，1。普通用户无需输入密码，点击登陆即可登陆。仅做测试用，解释权归个人所有。
				</div>
			</div>
		)
	}
}

export default FormLogin
