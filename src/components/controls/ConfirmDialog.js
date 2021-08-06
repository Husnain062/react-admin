import React from 'react';
import {Dialog, DialogTitle, DialogContent, Typography, DialogActions, makeStyles} from '@material-ui/core';
import Button from './Button';

const ConfirmDialog = props => {
	const {confirmDialog, setConfirmDialog} = props;
	const classes = useStyles();
	return (
		<Dialog open={confirmDialog.isOpen} className={classes.dialog}>
			<DialogTitle></DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<Typography variant='h6'>{confirmDialog.title}</Typography>
				<Typography variant='subtitle2'>{confirmDialog.subTitle}</Typography>
			</DialogContent>
			<DialogActions className={classes.dialogAction}>
				<Button text='No' color='default' onClick={() => setConfirmDialog({...confirmDialog, isOpen: false})}></Button>
				<Button text='Yes' color='secondary' onClick={confirmDialog.onConfirm}></Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;

const useStyles = makeStyles(theme => ({
	dialog: {
		padding: theme.spacing(2),
		position: 'absolute',
		top: theme.spacing(5),
	},
	dialogContent: {
		textAlign: 'center',
	},
	dialogAction: {
		justifyContent: 'center',
	},
}));
