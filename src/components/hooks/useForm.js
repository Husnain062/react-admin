import {useState} from 'react';

export const useForm = (initailValues, validateOnChange = false, validate) => {
	const [values, setValues] = useState(initailValues);
	const [errors, setErrors] = useState({});

	const handleInputChange = e => {
		const {name, value} = e.target;
		setValues({
			...values,
			[name]: value,
		});
		if (validateOnChange) {
			validate({[name]: value});
		}
	};

	const resetForm = () => {
		setValues(initailValues);
		setErrors({});
	};

	return {
		values,
		errors,
		setErrors,
		handleInputChange,
		resetForm,
		setValues,
	};
};
