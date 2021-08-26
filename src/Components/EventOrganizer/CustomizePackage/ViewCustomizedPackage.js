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

const ViewCustomizedPackage = (props) => {

    const [data, setData] = useState([]);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: theme.spacing(0, 3),
        },
        paper: {
            maxWidth: 400,
            padding: theme.spacing(2),
        },
        mainDIv: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: theme.spacing(0),
            display: 'flex',
            marginLeft: 220,
        }
    }));
    const classes = useStyles();
    useEffect(() => {
        axios.get(`/organizer/pending/requests`)
            .then(res => {
                console.log(res.data.data)
                setData(res.data.data);
            }).catch(err => console.log(err.message))
    }, [])

    const navigateEdit = (e, id) => {
        e.preventDefault();
        window.location = `/eventorganizer/editpackages/${id}`;
    }
    const navigateDelete = (e, id) => {
        e.preventDefault();
        axios.delete(`organizer/pending/delete/${id}`)
            .then(res => {
                console.log(res.data.data);
                alert("Delete successfully!");
                window.location = `/eventorganizer/customizedpackages`;
            }).catch(err => console.log(err.message));
    }

    return (
        <div className={classes.root}>
            <OfferFormDashBoard page="ViewCustomizedPackage" />
            <div className={classes.mainDIv}>
                <Grid container >
                    <Typography gutterBottom variant="h4" component="h2">
                        Edit Package
                    </Typography>
                    {data.map((value, index) => (
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs={12} spacing={2}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image=""
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
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
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={event => navigateEdit(event, value._id)} >
                                            Edit
                                        </Button>
                                        <Button size="small" color="primary" onClick={event => navigateDelete(event, value._id)}>
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    ))}
                    <br />
                </Grid>
            </div>
        </div>
    );
}

export default ViewCustomizedPackage;