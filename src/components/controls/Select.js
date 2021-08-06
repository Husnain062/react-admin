import React from 'react';
import {FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText} from '@material-ui/core';

const Select = props => {
	const {name, label, value, onChange, options, error = null} = props;

	return (
		<FormControl variant='outlined' {...(error && {error: true})}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect label={label} name={name} value={value} onChange={onChange}>
				<MenuItem value=''>None</MenuItem>
				{options.map((option, index) => (
					<MenuItem value={option.id} key={index}>
						{option.title}
					</MenuItem>
				))}
			</MuiSelect>
			{error && <FormHelperText>{error}</FormHelperText>}
		</FormControl>
	);
};

export default Select;
