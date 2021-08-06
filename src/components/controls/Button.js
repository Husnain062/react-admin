import React from 'react';
import {Button as MuiButton, makeStyles} from '@material-ui/core';

const Button = props => {
	const {text, size, color, variant, onClick, ...rest} = props;
	const classes = useStyles();
	return (
		<MuiButton onClick={onClick} variant={variant || 'contained'} color={color || 'primary'} size={size || 'large'} classes={{root: classes.root, label: classes.label}} {...rest}>
			{text}
		</MuiButton>
	);
};

export default Button;

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(0.5),
	},
	label: {
		textTransform: 'none',
	},
}));
