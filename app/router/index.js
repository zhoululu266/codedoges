import {Component} from 'react'
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
					<Route exact path="/" component={Login}></Route>
					<Route path="/home" component={Home}></Route>
					<Route path="/404" component={NotFound}></Route>
				</div>
			</Router>
		)
	}
}

export default RouteMap
