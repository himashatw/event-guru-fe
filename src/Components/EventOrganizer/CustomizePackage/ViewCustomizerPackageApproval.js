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
import OfferFormDashBoard from '../SlideBar/OfferFormDashBoard';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

const ViewCustomizerPackageApproval = () => {

    const [data, setData] = useState([]);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            padding: theme.spacing(0, 3),
            margin: `${theme.spacing(1)}px auto`,
            display: 'flex',
        },
        paper: {
            maxWidth: 400,
            margin: `${theme.spacing(1)}px auto`,
            padding: theme.spacing(2),
        },
        maindiv: {
            flexGrow: 1,
            padding: theme.spacing(0),
            display: 'flex',
            marginLeft: 220,
        },
        avatar: {
            width: "70px",
            height: "70px",
            marginLeft: 10,
        }
    }));
    const eventorg = useStyles();
    useEffect(() => {
        axios.get(`/organizer/custom/view/approval`)
            .then(res => {
                console.log(res.data.data)
                setData(res.data.data);
            }).catch(err => console.log(err.message))
    }, [])

    return (
        <div className={eventorg.root}>
            <OfferFormDashBoard page="ViewCustomizerPackageApproval" />
            <div className={eventorg.maindiv}>
                <Paper style={{ height: "90vh", overflowX: 'hidden', overflowY: 'scroll' }}>
                    <List>
                        <Grid container >
                            <center> <Typography gutterBottom variant="h4" component="h2">
                                View Package Approval
                            </Typography></center>
                            {data.map((value, index) => (
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item xs={12}>
                                        <Card className={eventorg.root}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={eventorg.media}
                                                    image=""
                                                    title="Contemplative Reptile"
                                                />
                                                <CardContent>
                                                    <div className={eventorg.avatar}>
                                                        {value.approve === "true" ? <div><Avatar>✅</Avatar><h1>Accept</h1></div> : <div> <Avatar>❌</Avatar><h1>Decline</h1></div>}
                                                    </div>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        <div marginLeft="0">{value.title}</div>
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
                    </List>
                </Paper>
            </div>
        </div>
    );
}

export default ViewCustomizerPackageApproval;