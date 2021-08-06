import React, {useState} from 'react';
import EmployeeForm from './EmployeeForm';
import {Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment} from '@material-ui/core';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PageHeader from '../../components/PageHeader';
import {useTable} from '../../components/hooks';
import * as employeeService from '../../services/employeeService';
import Controls from '../../components/controls';
import Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import {Popup} from '../../components/Popup';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import ConfirmDialog from '../../components/controls/ConfirmDialog';

const Employees = () => {
	const [records, setRecords] = useState(employeeService.getAllEmployees());
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});
	const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''});
	const [filter, setFilter] = useState({
		fn: items => {
			return items;
		},
	});
	const [openPopup, setOpenPopup] = useState(false);
	const {TableContainer, TableHeader, TablePagination, recordsAfterPagingAndSorting} = useTable(records, headCells, filter);
	const classes = useStyles();

	const handleSearch = e => {
		let target = e.target;
		setFilter({
			fn: items => {
				if (target.value === '') return items;
				else return items.filter(x => x.fullName.toLowerCase().includes(target.value));
			},
		});
	};

	const handlePopUp = () => {
		setRecordForEdit(null);
		setOpenPopup(true);
	};

	const addOrEdit = (employee, resetForm) => {
		if (employee.id === 0) {
			employeeService.insertEmployee(employee);
		} else {
			employeeService.updateEmployee(employee);
		}
		setRecordForEdit(null);
		resetForm();
		setOpenPopup(false);
		setRecords(employeeService.getAllEmployees());
		setNotify({
			isOpen: true,
			message: 'Submitted Sccessfully',
			type: 'success',
		});
	};

	const openInPopup = record => {
		setRecordForEdit(record);
		setOpenPopup(true);
	};

	const onDelete = record => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		employeeService.deleteEmployee(record);
		setRecords(employeeService.getAllEmployees());
		setNotify({
			isOpen: true,
			message: 'Deleted Sccessfully',
			type: 'error',
		});
	};

	return (
		<>
			<PageHeader title='New Employee' subTitle='Page Description' icon={<PeopleOutlineIcon fontSize='large' />} />
			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
						className={classes.searchInput}
						label='Search Employees'
						onChange={handleSearch}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Search />
								</InputAdornment>
							),
						}}
					/>
					<Controls.Button text='Add New' variant='outlined' className={classes.newButton} onClick={handlePopUp} startIcon={<AddIcon />} />
				</Toolbar>
				<TableContainer>
					<TableHeader />
					<TableBody>
						{recordsAfterPagingAndSorting().map(item => (
							<TableRow key={item.id}>
								<TableCell>{item.fullName}</TableCell>
								<TableCell>{item.email}</TableCell>
								<TableCell>{item.mobile}</TableCell>
								<TableCell>{item.department}</TableCell>
								<TableCell>
									<Controls.ActionButton color='primary' onClick={() => openInPopup(item)}>
										<EditIcon fontSize='small' />
									</Controls.ActionButton>
									<Controls.ActionButton
										color='secondary'
										onClick={() => {
											setConfirmDialog({
												isOpen: true,
												title: 'Are you sure you want to delete',
												subTitle: "You can't undo this operationS",
												onConfirm: () => {
													onDelete(item.id);
												},
											});
											//onDelete(item.id);
										}}>
										<CloseIcon fontSize='small' />
									</Controls.ActionButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TableContainer>
				<TablePagination />
			</Paper>
			<Popup title='New Employee' openPopup={openPopup} setOpenPopup={setOpenPopup}>
				<EmployeeForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
			</Popup>
			<Controls.Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
		</>
	);
};

const useStyles = makeStyles(theme => ({
	pageContent: {
		margin: theme.spacing(5),
		padding: theme.spacing(5),
	},
	searchInput: {
		width: '75%',
	},
	newButton: {
		position: 'absolute',
		right: '10px',
	},
}));

export default Employees;

const headCells = [
	{id: 'fullName', label: 'Employee Name'},
	{id: 'email', label: 'Email Address(Personal)'},
	{id: 'mobile', label: 'Mobile Number'},
	{id: 'department', label: 'Department'},
	{id: 'actions', label: 'Actions', disableSorting: true},
];
