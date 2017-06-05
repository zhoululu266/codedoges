import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import './style.css'

class FormLogin extends React.Component {
	constructor( props ) {
		super( props )
		this.state = {
			avatar: '',
			username: '',
			password: ''
		}
		this.handleChange = this.handleChange.bind( this )
		this.handleLogin = this.handleLogin.bind( this )
	}
	componentDidMount( ) {
		const avatar = this.refs.avatar
		if ( avatar ) {
			avatar.onload = e => {
				console.log( e )
			}
			avatar.onerror = e => {
				console.log( e )
			}
		}
	}
	handleChange( e ) {
		if ( e.target.type == 'text' ) {
			this.setState({ username: e.target.value })
		} else if ( e.target.type == 'password' ) {
			this.setState({ password: e.target.value })
		}
	}
	handleLogin( ) {
		let data = JSON.stringify({ username: this.state.username, password: this.state.password })
		fetch('/api/signin', {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		}).then(res => {
			return res.json( )
		}).then(data => {
			if ( data.status === 1 ) {
				this.props.actions.login({ username: data.data.username, password: data.data.password, uuid: data.data._id })
				console.log( this.props )
			} else {
				alert( data.msg )
			}
		}).catch(err => {
			console.log( err )
		});
	}
	render( ) {
		return (
			<div className="login-form">
				<div className="login-avatar" ref='avatarBox'>
					{this.state.avatar
						? <img src={this.state.avatar} alt="用户头像" ref='avatar'/>
						: ''}
				</div>
				<TextField hintText='请输入用户名' fullWidth={true} onChange={this.handleChange}></TextField>
				<TextField hintText='请输入密码' type='password' fullWidth={true} onChange={this.handleChange}></TextField>
				<FlatButton label="点击登陆" fullWidth={true} primary={true} style={{
					marginTop: '50px'
				}} onClick={this.handleLogin}/>
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
