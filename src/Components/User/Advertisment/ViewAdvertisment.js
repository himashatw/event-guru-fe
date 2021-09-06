import React from 'react';
import axios from '../../../Services/axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import Link from '@material-ui/core/Link';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  //form
  paper: {
    margin: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',

  },
  form: {
    width: '90%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    height: '40px'
  },
}));

export default function ViewAdert() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Show List
            </Typography>
          </div>
        </Grid>

        <Grid>
          <div className={classes.paper1}>
            <Typography component="h1" variant="h5">
              <b>Book an Event</b>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}