import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Link as RouterLink} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {withStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        // flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 2, 1, 2),
        // color: 'gray',
        fontWeight: 'bold',
        "&:hover": {
            color: "#FFFFFF",
        },
    },
    active: {
        color: '#FFFFFF',
    },
}));

export default function Header({homeActive, topPlayerActive, historyActive}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        CARO ONLINE
                    </Typography>
                    <nav style={{flex: 1, flexDirection: "row", textAlign: 'center'}}>
                        <Link component={RouterLink} to="#" variant="button"
                              className={classes.link} underline='none'
                              color={homeActive ? 'textPrimary' : 'textSecondary'}
                        >
                            Home
                        </Link>
                        <Link component={RouterLink} to="#" variant="button"
                              className={classes.link} underline='none'
                              color={topPlayerActive ? 'textPrimary' : 'textSecondary'}>
                            Top player
                        </Link>
                        <Link component={RouterLink} to="#" variant="button"
                              className={classes.link} underline='none'
                              color={historyActive ? 'textPrimary' : 'textSecondary'}>
                            History
                        </Link>
                    </nav>
                    <div>
                        <Button
                            href="#" color="inherit" className={classes.link}
                            startIcon={
                                <Avatar
                                    src="https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png"
                                />
                            }
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                        >
                            User name
                        </Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
