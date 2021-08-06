import React, {useState} from 'react';
import {Table, TableHead, TableRow, TableCell, makeStyles, TablePagination as Pagination, TableSortLabel} from '@material-ui/core';

const PAGES = [5, 10, 25];

export const useTable = (records, headCells, filter) => {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(PAGES[page]);
	const [order, setOrder] = useState();
	const [orderBy, setOrderBy] = useState();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	const recordsAfterPagingAndSorting = () => {
		return stableSort(filter.fn(records), getComparator(order, orderBy)).slice(page * rowsPerPage, page + 1 * rowsPerPage);
	};

	const stableSort = (array, comparator) => {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) return order;
			return a[1] - b[1];
		});
		return stabilizedThis.map(el => el[0]);
	};

	const getComparator = (order, orderBy) => {
		return order === 'desc' ? (a, b) => descendingCompare(a, b, orderBy) : (a, b) => -descendingCompare(a, b, orderBy);
	};

	const descendingCompare = (a, b, orderBy) => {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (a[orderBy] > b[orderBy]) {
			return 1;
		}
		return 0;
	};

	const TableContainer = props => {
		return <Table className={classes.table}>{props.children}</Table>;
	};

	const TableHeader = props => {
		const handleSortRequest = cellId => {
			const isAsc = orderBy === cellId && order === 'asc';
			setOrder(isAsc ? 'desc' : 'asc');
			setOrderBy(cellId);
		};

		return (
			<TableHead>
				<TableRow>
					{headCells.map(cell => {
						return (
							<TableCell key={cell.id} sortDirection={orderBy === cell.id ? order : false}>
								<TableSortLabel
									active={orderBy === cell.id}
									direction={orderBy === cell.id ? order : 'asc'}
									onClick={() => {
										handleSortRequest(cell.id);
									}}>
									{cell.label}
								</TableSortLabel>
							</TableCell>
						);
					})}
				</TableRow>
			</TableHead>
		);
	};

	const TablePagination = () => (
		<Pagination
			component='div'
			page={page}
			rowsPerPageOptions={PAGES}
			rowsPerPage={rowsPerPage}
			count={records.length}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
		/>
	);
	return {
		TableContainer,
		TableHeader,
		TablePagination,
		recordsAfterPagingAndSorting,
	};
};

const useStyles = makeStyles(theme => ({
	table: {
		marginTop: theme.spacing(3),
		'& thead th': {
			fontWeight: '600',
			color: theme.palette.primary.main,
			backgroundColor: theme.palette.primary.light,
		},
		'& tbody td': {
			fontWeight: '300',
		},
		'& tbody tr:hover': {
			backgroundColor: '#fffbf2',
			cursor: 'pointer',
		},
	},
}));
