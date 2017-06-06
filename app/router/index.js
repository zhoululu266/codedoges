import {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import AppBarBtn from '../components/AppBar-Button'
import Footer from '../components/Footer'
import {HashRouter as Router, Route} from 'react-router-dom'
import NotFound from '../containers/NotFound'
import Login from '../containers/Login'
import Home from '../containers/Home'
import '../containers/main.css'

class RouteMap extends Component {
	render() {
		return (
			<Router>
				<div>
					<AppBar iconElementLeft={< AppBarBtn > </AppBarBtn>} title='Codedoges'></AppBar>
					<Route exact path="/" component={Login}></Route>
					<Route path="/home" component={Home}></Route>
					<Route path="/404" component={NotFound}></Route>
					<Footer>个人博客，Driving by React</Footer>
				</div>
			</Router>
		)
	}
}

export default RouteMap
