import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import './style.css'

let contactsIcon = <FontIcon className='material-icons'>contacts</FontIcon>
let homeIcon = <FontIcon className='material-icons'>home</FontIcon>
let buildIcon = <FontIcon className='material-icons'>build</FontIcon>

class BottomNav extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectIndex: 1
		}
		this.handleIndex = this.handleIndex.bind(this)
	}
	handleIndex(index) {
		this.setState({selectIndex: index})
	}
	render() {
		return (
			<div>
				<Paper zDepth={1}>
					<BottomNavigation selectedIndex={this.state.selectIndex}>
						<BottomNavigationItem label="豆瓣电影TOP250" icon={contactsIcon} onTouchTap={() => this.handleIndex(0)}></BottomNavigationItem>
						<BottomNavigationItem label="豆瓣电影TOP250" icon={homeIcon} onTouchTap={() => this.handleIndex(1)}></BottomNavigationItem>
						<BottomNavigationItem label="豆瓣电影TOP250" icon={buildIcon} onTouchTap={() => this.handleIndex(2)}></BottomNavigationItem>
					</BottomNavigation>
				</Paper>
			</div>
		);
	}
}

export default BottomNav;
