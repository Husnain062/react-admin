import React from 'react';
import {TextField} from '@material-ui/core';

const Input = props => {
	const {name, label, value, onChange, error = null, ...other} = props;
	return <TextField variant='outlined' label={label} value={value} name={name} onChange={onChange} {...(error && {error: true, helperText: error})} {...other} />;
};

export default Input;
