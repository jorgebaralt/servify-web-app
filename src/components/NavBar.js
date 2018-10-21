import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


function navBar() {
	return (
		<div style={{ flexGrow: 1 }} className="animated slideInDown">
			<AppBar
				position="static"
				style={{ paddingLeft: '10%', paddingRight: '10%' }}
			>
				<Toolbar>
					<Typography
						variant="h5"
						color="inherit"
						style={{ marginLeft: '10%', flexGrow: 2, textAlign: 'left' }}
						onClick={() => { console.log('home pressed')}}
					>
						Servify
					</Typography>
					<div>
						<Button color="inherit"></Button>
						<Button color="inherit">Features</Button>
						<Button color="inherit">Contact us</Button>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default navBar;
