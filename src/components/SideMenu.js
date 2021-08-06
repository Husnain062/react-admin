import React from 'react';
import {withStyles} from '@material-ui/core';

const SideMenu = props => {
	const {classes} = props;
	return <div className={classes.sideMenu}>Hello</div>;
};

const styles = {
	sideMenu: {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		left: '0px',
		width: '320px',
		height: '100%',
		backgroundColor: '#253053',
	},
};

export default withStyles(styles)(SideMenu);
