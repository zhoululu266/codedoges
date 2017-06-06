import {Component} from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import {grey50} from 'material-ui/styles/colors'

class AppBarBtn extends Component {
	constructor(props) {
		super(props)
	}
	goGithub() {
		location.href = 'https://github.com/galaxycubic'
	}
	render() {
		return (
			<IconMenu iconButtonElement={< IconButton > <Menu color={grey50}/> < /IconButton>} anchorOrigin={{
				horizontal: 'left',
				vertical: 'top'
			}} targetOrigin={{
				horizontal: 'left',
				vertical: 'top'
			}}>
				<MenuItem primaryText="GitHub" onClick={this.goGithub}></MenuItem>
			</IconMenu>
		)
	}
}

export default AppBarBtn
