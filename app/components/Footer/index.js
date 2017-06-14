import {Component} from 'react'
import {indigoA100, indigo50} from 'material-ui/styles/colors'
import './style.css'

class Footer extends Component {
	render() {
		return (
			<div className='footer' style={{
				backgroundColor: indigoA100,
				color: indigo50
			}}>
				{this.props.children}
			</div>
		)
	}
}

export default Footer
