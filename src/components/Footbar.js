import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


function footbar() {
	return (
		<div style={{ flexGrow: 1 }} className="animated slideInUp">
			<Paper
				position="static"
				color="default"
				style={{ padding: 20}}
			>
				<div>Servify App @2018 by Jorge Baralt</div>
				<div>Contact info:</div>
				<div>jorgebaraltq@gmail.com</div>
			</Paper>
		</div>
	);
}

export default footbar;
