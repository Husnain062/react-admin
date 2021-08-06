import React from 'react';
import {makeStyles} from '@material-ui/core';

export const Form = props => {
	const {children, ...rest} = props;
	const classes = useStyles();
	return (
		<form className={classes.root} {...rest}>
			{children}
		</form>
	);
};

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiFormControl-root': {
			width: '80%',
			margin: theme.spacing(1),
		},
	},
}));
