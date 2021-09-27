import React, { useState, useEffect } from 'react';
import axios from '../../../Services/axios.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import OfferDashBoard from '../SlideBar/OfferDashBoard';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

const Latest = () => {

    function createData(id, offerName, venue, discount, date, condition) {
        return { id, offerName, venue, discount, date, condition };
    }
    const rows = [
        createData(0, 'Super Discount', 'Colombo-GalaDari Hotel', '20%', '16 Sep, 2021', '20% discount more than 100 participants'),
        createData(1, '50% Discount', 'Wadduwa-Safron Hotel', '50%', '26 Oct, 2021', '50% discount more than 100 participants'),
        createData(2, 'Foods free of charge', 'Panadura-Hotel White', '', '06 Mar, 2021', 'Foods free of charge for more than 200'),
        createData(3, 'Panadura Public Ground now  available', 'Pandura Public Ground', '', '16 Aug, 2021', 'More than 14 hours events, 2 hours free charge'),
        createData(4, '3 hours Free of charge', 'Kalutara Public Conference', '', '15 Mar, 2019', 'More than 14 hours events, 2 hours free charge'),
    ];

    const [data, setData] = useState([]);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: theme.spacing(0, 3),
            margin: `${theme.spacing(1)}px auto`,
            display: 'flex',
        },
        paper: {
            maxWidth: 400,
            margin: `${theme.spacing(1)}px auto`,
            padding: theme.spacing(2),
        },
        notification: {
            marginLeft: "1220px",
            display: 'flex',
            hight: 10
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
    }));

    const classes = useStyles();
    useEffect(() => {
        axios.get(`/organizer/custom/view/approval`)
            .then(res => {
                console.log(res.data.data)
                setData(res.data.data);
            }).catch(err => console.log(err.message))
    }, [])

    const naviagteViewApprove = () => {
        window.location = `/eventorganizer/packagesapproval`;
    }

    return (
        <div>
            <div className={classes.root}>
                <OfferDashBoard />
                <div className={classes.mainDIv}>
                    <div className={classes.notification}>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon onClick={naviagteViewApprove} />
                            </Badge>
                        </IconButton>
                    </div>
                    <Typography gutterBottom variant="h4" component="h2"><center>
                        Latest Offers
                    </center></Typography>

                    <Paper style={{ height: 750, overflowX: 'hidden', overflowY: 'scroll' }}>
                        <List>
                            <Grid container >
                                {rows.map((value, index) => (
                                    <Grid container wrap="nowrap" spacing={2}>
                                        {/* 
                <Grid item xs={12}> */}
                                        {/* <Paper className={classes.paper}> */}
                                        <Grid item xs={12}>
                                            <Card className={classes.root}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image=""
                                                        title="Contemplative Reptile"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h4" component="h2">
                                                            {value.offerName}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            <h3>Venue               :{value.venue}</h3>
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            <h3>Date               :{value.date}</h3>
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            <h3>Condition              :{value.condition}</h3>
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            <h3>Discount            :{value.discount ? value.discount : 'No discount'}</h3>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </List>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default Latest;