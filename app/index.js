import React from 'react'
import RouteMap from './router'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {indigoA100, indigo50} from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import AppBarBtn from './components/AppBar-Button'
import './static/main.css'

const store = configureStore()

injectTapEventPlugin()
render(
	<Provider store={store}>
	<MuiThemeProvider>
		<div>
			<AppBar iconElementLeft={< AppBarBtn > </AppBarBtn>} title='Codedoges' style={{
				backgroundColor: indigoA100,
				color: indigo50
			}}></AppBar>
			<RouteMap/>
		</div>
	</MuiThemeProvider>
</Provider>, document.querySelector('#app'))
