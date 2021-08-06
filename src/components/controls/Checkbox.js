import React from 'react';
import {FormControl, FormControlLabel, Checkbox as MuiCheckbox} from '@material-ui/core';
const Checkbox = props => {
	const {name, label, value, onChange} = props;
	const convertToDefaultParameters = (name, value) => ({
		target: {
			name,
			value,
		},
	});
	return (
		<FormControl>
			<FormControlLabel
				control={<MuiCheckbox name={name} label={label} value={value} onChange={e => onChange(convertToDefaultParameters(name, e.target.checked))} />}
				label={label}></FormControlLabel>
		</FormControl>
	);
};

export default Checkbox;
