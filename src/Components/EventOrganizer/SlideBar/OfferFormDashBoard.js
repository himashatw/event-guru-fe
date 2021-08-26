import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import TextField from '@material-ui/core/TextField';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    Dbutton: {
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        margin: "3px",
        padding: theme.spacing(2),
        fontSize: 12,
        minWidth: 240,
    },
    setting: {
        margin: "2px",
    },
    arrow: {
        top: "220px",
        left: "70px",
        margin: "20px",
        position: 'fixed',
        fontSize: 40,
    },
    packageFont: {
        top: "260px",
        left: "10px",
        margin: "20px",
        position: 'fixed',
        fontSize: 20,
    },
    searchForm: {
        top: "80px",
        left: "10px",
        position: 'fixed',
    },
}));

const CustomizeDashBoard = (props) => {

    const cusDash = useStyles();
    const [page, setPage] = React.useState(props.page);
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(cusDash.paper, cusDash.fixedHeight);

    const navigateEdit = () => {
        window.location = `/eventorganizer/customizedpackages`;
    }
    const navigateHome = () => {
        window.location = `/eventorganizer/latestoffers`;
    }

    return (
        <div className={cusDash.root}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                cusDash={{
                    paper: clsx(cusDash.drawerPaper, !open && cusDash.drawerPaperClose),
                }}
                open={open}
            >
                <div className={cusDash.packageFont}>
                    <center> <b>Customize Package</b></center>
                </div>
                <DoubleArrowIcon className={cusDash.arrow} fontSizeLarge={true}></DoubleArrowIcon>
                {page === "CreateCustomizedPackage" ?
                    <Button variant="contained" color="primary" className={cusDash.Dbutton} onClick={navigateEdit}>
                        <EditIcon className={cusDash.setting} />Edit Requested Package
                    </Button> :
                    page === "UpdateCustomizedPackage" ?
                        <Button variant="contained" color="primary" className={cusDash.Dbutton} onClick={navigateHome}>
                            <HomeIcon className={cusDash.setting} />Home
                        </Button> :
                        page === "ViewCustomizedPackage" ?
                            <Button variant="contained" color="primary" className={cusDash.Dbutton} onClick={navigateHome}>
                                <HomeIcon className={cusDash.setting} />Home
                            </Button> :
                            page === "ViewCustomizerPackageApproval" ?
                                <Button variant="contained" color="primary" className={cusDash.Dbutton} onClick={navigateHome}>
                                    <EditIcon className={cusDash.setting} />HOME
                                </Button> : ""
                }
            </Drawer>

            {page === "ViewCustomizedPackage" || page === "ViewCustomizerPackageApproval" ?
                <form className={cusDash.searchForm} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="SEARCH HERE" variant="outlined" />
                </form> : ''
            }
        </div >
    );
}

export default CustomizeDashBoard;