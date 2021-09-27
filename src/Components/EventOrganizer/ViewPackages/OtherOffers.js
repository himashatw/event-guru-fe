import React, { useState, useEffect } from 'react';
import axios from '../../../Services/axios.js';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import OfferDashBoard from '../SlideBar/OfferDashBoard';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

function Other(props) {
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState('');

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            overflowY: 'hidden',
            padding: theme.spacing(0, 3),
            margin: `${theme.spacing(1)}px auto`,
            display: 'flex',
            overflowX: 'hidden',
        },
        maindiv: {
            flexGrow: 1,
            marginLeft: 240,
        },
        dashboard: {
            position: 'fixed',
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
        packageContent: {
            marginLeft: '320px',
            top: 'flex',
            padding: theme.spacing(2),
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    const eventorg = useStyles();
    useEffect(() => {
        axios.get(`/organizer/packages/other`)
            .then(res => {
                console.log(res.data.data)
                setData(res.data.data);
            }).catch(err => console.log(err.message))
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        axios.get(`/organizer/packages/search/${keyword}`)
            .then(res => {
                setData(res.data.data);
            }).catch(err => console.log(err.message))
    }

    console.log("data=>", data)
    return (
        <div>
            <div className={eventorg.root}>
                <div className={eventorg.dashboard}><OfferDashBoard /></div>
                <div className={eventorg.maindiv}>
                    <Grid container >
                        <Grid item xs={9}>
                            <Typography gutterBottom variant="h4" component="h2">
                                Offers Related to Other Packages..
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <div className={eventorg.search}>
                                <form onSubmit={onSubmit}>
                                    <Grid container >
                                        <Grid item xs={9}>
                                            <div className={eventorg.searchIcon}>
                                                <SearchIcon />
                                            </div>
                                            <InputBase
                                                placeholder="Search…"
                                                classes={{
                                                    root: eventorg.inputRoot,
                                                    input: eventorg.inputInput,
                                                }}
                                                name="keyword"
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Search
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                    <Paper style={{ height: "80vh", overflowX: 'hidden', overflowY: 'scroll' }}>
                        <List>
                            <Grid container >
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
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <center><Typography gutterBottom variant="h5" component="h2">
                                                                    {value.packageName}
                                                                </Typography></center>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <img
                                                                    src={value.packageImageUrl}
                                                                    className="card-img-top"
                                                                    alt="..."
                                                                    style={{
                                                                        objectFit: "cover",
                                                                        maxHeight: "200px",
                                                                        borderRadius: "20px",
                                                                        border: "1px solid black",
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <Typography variant="subtitle1" gutterBottom component="div">
                                                                    <h2>Package Details               :{value.packageDetails}</h2>
                                                                </Typography>
                                                                <Typography variant="subtitle1" gutterBottom component="div">
                                                                    <h2>Packaage Venue            :{value.packageVenue}</h2>
                                                                </Typography>
                                                                <Typography variant="subtitle1" gutterBottom component="div">
                                                                    <h2>Maximum Participants              :{value.participants}</h2>
                                                                </Typography>
                                                                <Typography variant="subtitle1" gutterBottom component="div">
                                                                    <h2>Package Price            :{value.packagePrice}</h2>
                                                                </Typography>
                                                                <Typography variant="subtitle1" gutterBottom component="div">
                                                                    <h2>Discount            :{value.discount ? value.discount : 'No discount'}</h2>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
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

export default Other;
