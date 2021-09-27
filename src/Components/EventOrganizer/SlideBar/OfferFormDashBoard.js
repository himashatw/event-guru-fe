import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router';

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
        width: `100%`,
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

    const eventorg = useStyles();
    const [page, setPage] = React.useState(props.page);
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(eventorg.paper, eventorg.fixedHeight);

    const history = useHistory();
    const navigateEdit = () => {
        history.push(`/eventorganizer/customizedpackages`);
    }
    const navigateHome = () => {
        history.push(`/eventorganizer/latestoffers`);
    }

    return (
        <div className={eventorg.root}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                eventorg={{
                    paper: clsx(eventorg.drawerPaper, !open && eventorg.drawerPaperClose),
                }}
                open={open}
            >
                <div className={eventorg.packageFont}>
                    <center> <b>Customize Package</b></center>
                </div>
                <DoubleArrowIcon className={eventorg.arrow} fontSizeLarge={true}></DoubleArrowIcon>
                {page === "CreateCustomizedPackage" ?
                    <Button variant="contained" color="primary" className={eventorg.Dbutton} onClick={navigateEdit}>
                        <EditIcon className={eventorg.setting} />Edit Requested Package
                    </Button> :
                    page === "UpdateCustomizedPackage" ?
                        <Button variant="contained" color="primary" className={eventorg.Dbutton} onClick={navigateHome}>
                            <HomeIcon className={eventorg.setting} />Home
                        </Button> :
                        page === "ViewCustomizedPackage" ?
                            <Button variant="contained" color="primary" className={eventorg.Dbutton} onClick={navigateHome}>
                                <HomeIcon className={eventorg.setting} />Home
                            </Button> :
                            page === "ViewCustomizerPackageApproval" ?
                                <Button variant="contained" color="primary" className={eventorg.Dbutton} onClick={navigateHome}>
                                    <HomeIcon className={eventorg.setting} />HOME
                                </Button> : ""
                }
            </Drawer>
        </div >
    );
}

export default CustomizeDashBoard;