import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
require( '../assets/styles/default' )
injectTapEventPlugin( );
class Index extends React.Component {
	render( ) {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme( darkBaseTheme )}>
				<AppBar title='codedoges' iconClassNameRight="muidocs-icon-navigation-expand-more"></AppBar>
			</MuiThemeProvider>
		)
	}
}
export default Index
