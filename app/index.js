import React from 'react'
import RouteMap from './router'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
const store = configureStore( )

injectTapEventPlugin( )
render(
	<Provider store={store}>
	<MuiThemeProvider>
		<RouteMap/>
	</MuiThemeProvider>
</Provider>, document.querySelector( '#app' ))
