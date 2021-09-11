import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid, Paper, ButtonBase } from '@material-ui/core';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        width: '450px',
        height: 'auto',
        margin: 'auto',
        color: theme.palette.text.primary,
    },
    font: {
        fontFamily: "Impact,Charcoal,sans-serif",
        fontSize:'20px'
    },
    button: {
        color: theme.palette.text.secondary,
        backgroundColor: '#1d57c2',
        
    },
    image: {
        width: 200,
        height: 200,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function RegistrationHome() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <br />
            <Grid container spacing={2}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            <b>Customer</b>
                        </Typography>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="https://www.coxblue.com/wp-content/uploads/2019/01/15-Ways-to-Guarantee-Your-Small-Business-or-Startup-Is-Meeting-Customer-Needs-1024x682.jpg" />
                        </ButtonBase>
                        <p className={classes.font}>
                        {"As a Customer you can register with our system and you will be able to Book an Event. Customer Registration is important."}
                        </p>
                        <br/>
                        <Link to="/user/register"><Button variant="outlined" >{"Click Here <<!"}</Button></Link>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            <b>Event Organizer</b>
                        </Typography>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="https://www.thebalancesmb.com/thmb/SWITytalvwQiOxjXPQlKmj2Alpg=/1500x844/smart/filters:no_upscale()/Event-planners-56a2b3873df78cf77278efd5.jpg" />
                        </ButtonBase>
                        <p className={classes.font}>
                           {"As a Event Organizer you can register with system and organize with contact with the Owner's Properties."}
                        </p>
                        <br/>
                        <Link to="/eventorganizer/register"><Button variant="outlined" >{"Click Here <<!"}</Button></Link>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            <b>Property Owner</b>
                        </Typography>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="https://lh3.googleusercontent.com/proxy/xlIF-9tvCzNOrmPUDdZSMd3vO9bybTW0DrjGAXU_0mZV6_RMmf8vMlRlOOpW5MFQRMF8FHOXw4Ma2rdmcer03NuFkTmb7N-CHNd0H0X79KM-jbNgHnhyew" />
                        </ButtonBase>
                        <p className={classes.font}>
                            {"As a Property Owner you can register with system and share your Property details among the Customers."}
                        </p>
                        <br/>
                        <Link to="/owner/register"><Button variant="outlined" >{"Click Here <<!"}</Button></Link>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
