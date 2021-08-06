import React from 'react';
import {Dialog, DialogTitle, DialogContent, makeStyles, Typography} from '@material-ui/core';
import Controls from './controls';
import CloseIcon from '@material-ui/icons/Close';

export const Popup = props => {
	const classes = useStyles();
	const {title, children, openPopup, setOpenPopup} = props;
	return (
		<Dialog open={openPopup} maxWidth='md' classes={{paper: classes.dialogWrapper}}>
			<DialogTitle className={classes.dialogTitle}>
				<div style={{display: 'flex'}}>
					<Typography variant='h5' component='div' style={{flexGrow: 1}}>
						{title}
					</Typography>
					<Controls.ActionButton color='secondary' onClick={() => setOpenPopup(false)}>
						<CloseIcon />
					</Controls.ActionButton> 
				</div>
			</DialogTitle>
			<DialogContent dividers>{children}</DialogContent>
		</Dialog>
	);
};

const useStyles = makeStyles(theme => ({
	dialogWrapper: {
		padding: theme.spacing(2),
		position: 'absolute',
		top: theme.spacing(5),
	},
	dialogTitle: {
		paddingRight: '0px',
	},
}));
