import React, {useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {Form} from '../../components/Form';
import {useForm} from '../../components/hooks';
import Controls from '../../components/controls';
import * as employeeService from '../../services/employeeService';

const EmployeeForm = props => {
	const validate = (fieldValues = values) => {
		let temp = {...errors};
		if ('fullName' in fieldValues) temp.fullName = fieldValues.fullName.length >= 1 ? '' : 'This field is required.';
		if ('email' in fieldValues) temp.email = /^\S+@\S+\.\S+$/.test(fieldValues.email) ? '' : 'Email is not valid.';
		if ('mobile' in fieldValues) temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Mobile should be minimum 10 digits.';
		if ('departmentId' in fieldValues) temp.departmentId = fieldValues.departmentId.length !== 0 ? '' : 'This field is required.';
		setErrors({...temp});
		if (fieldValues === values) {
			return Object.values(temp).every(x => x === '');
		}
	};
	const {addOrEdit, recordForEdit} = props;
	const {values, handleInputChange, errors, setErrors, resetForm, setValues} = useForm(initailFieldValues, true, validate);

	useEffect(() => {
		if (recordForEdit != null) {
			setValues({...recordForEdit});
		}
	}, [recordForEdit]);

	const handleSubmit = e => {
		e.preventDefault();
		if (validate()) {
			addOrEdit(values, resetForm);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={6}>
					<Controls.Input name='fullName' label='Full Name' value={values.fullName} onChange={handleInputChange} error={errors?.fullName} />
					<Controls.Input name='email' label='Email' value={values.email} onChange={handleInputChange} error={errors?.email} />
					<Controls.Input name='mobile' label='Mobile' value={values.mobile} onChange={handleInputChange} error={errors?.mobile} />
					<Controls.Input name='city' label='City' value={values.city} onChange={handleInputChange} />
				</Grid>
				<Grid item xs={6}>
					<Controls.RadioGroup name='gender' value={values.gender} onChange={handleInputChange} label='Gender' items={genderItems} />
					<Controls.Select
						name='departmentId'
						label='Department'
						value={values.departmentId}
						onChange={handleInputChange}
						options={employeeService.getDepartmentCollection()}
						error={errors.departmentId}
					/>
					<Controls.DatePicker name='hireDate' label='Hire Date' value={values.hireDate} onChange={handleInputChange} />
					<Controls.Checkbox name='isPermanent' label='Parmanent Employee' value={values.isPermanent} onChange={handleInputChange} />
					<div>
						<Controls.Button text='Submit' type='submit' />
						<Controls.Button text='Reset' color='default' onClick={resetForm} />
					</div>
				</Grid>
			</Grid>
		</Form>
	);
};

const initailFieldValues = {
	id: 0,
	fullName: '',
	email: '',
	mobile: '',
	city: '',
	gender: 'male',
	departmentId: '',
	hireDate: new Date(),
	isPermanent: false,
};

const genderItems = [
	{id: 'male', title: 'Male'},
	{id: 'female', title: 'Female'},
	{id: 'other', title: 'Other'},
];

export default EmployeeForm;
