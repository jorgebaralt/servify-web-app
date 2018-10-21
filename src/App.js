import React, { Component } from 'react';
import './App.css';
import Description from './components/Description';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import NavBar from './components/NavBar';
import Features from './components/Features';
import Footbar from './components/Footbar'

const theme = createMuiTheme({
	palette: {
		primary: deepOrange,
		secondary: {
			main: '#F4511E',
			light: '#FF8A65',
			dark: '#D84315',
		},
	},
	status: {
		danger: 'orange',
	},
});
console.log(theme);

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<NavBar />
					<Description />
					<Features />
					<Footbar />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
