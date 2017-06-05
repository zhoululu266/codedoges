import { Component } from 'react'
import './style.css'

class Footer extends Component {
	render( ) {
		return (
			<div className='footer'>
				{this.props.children}
			</div>
		)
	}
}

export default Footer
