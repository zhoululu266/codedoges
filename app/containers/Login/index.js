import {Component} from 'react'
import './styles.css'
import FormLogin from '../../components/Form-login'
import * as userinfoActions from '../../actions/userinfo'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Footer from '../../components/Footer'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			avatar: ''
		}
	}
	render() {
		return (
			<div>
				<FormLogin userinfo={this.props.userinfo} actions={this.props.userinfoActions}></FormLogin>
				<Footer>我的个人项目，使用React+material-ui</Footer>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		userinfo: {
			username: state.userinfo.username,
			password: state.userinfo.password,
			uuid: state.userinfo.uuid
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		userinfoActions: bindActionCreators(userinfoActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
