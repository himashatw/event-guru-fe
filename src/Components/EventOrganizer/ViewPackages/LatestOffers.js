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

const Latest = () => {

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
            position: "fixed",
            marginLeft: "1220px",
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
                    <Grid container >
                        <div className={classes.notification}>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon onClick={naviagteViewApprove} />
                                </Badge>
                            </IconButton>
                        </div>
                        <Typography gutterBottom variant="h4" component="h2">
                            Latest Offers
                        </Typography>
                        {data.map((value, index) => (
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
                                                    {value.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    <h3>No Of Participants :{value.noOfParticipants}</h3>
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    <h3>Date               :{value.date}</h3>
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    <h3>Email              :{value.email}</h3>
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    <h3>Message            :{value.message ? value.message : 'No message'}</h3>
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Latest;