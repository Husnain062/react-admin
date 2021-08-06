import React from 'react';
import {AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';

const Header = () => {
	const classes = useStyles();
	return (
		<AppBar position='static' className={classes.root}>
			<Toolbar>
				<Grid container alignItems='center'>
					<Grid item>
						<InputBase placeholder='Search Topics' className={classes.searchInput} startAdornment={<SearchIcon fontSize='small' />} />
					</Grid>
					<Grid item sm></Grid>
					<Grid item>
						<IconButton>
							<Badge badgeContent={4} color='secondary'>
								<NotificationsNoneIcon />
							</Badge>
						</IconButton>
						<IconButton>
							<Badge badgeContent={4} color='primary'>
								<ChatBubbleOutlineIcon />
							</Badge>
						</IconButton>
						<IconButton>
							<PowerSettingsNewIcon />
						</IconButton>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Header;

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: '#fff',
	},
	searchInput: {
		opacity: '0.9',
		padding: `0px ${theme.spacing(1)}px`,
		fontSize: '0.8rem',
		'&:hover': {
			backgroundColor: '#f2f2f2',
		},
		'& .MuiSvgIcon-root': {
			marginRight: theme.spacing(1),
		},
	},
}));
