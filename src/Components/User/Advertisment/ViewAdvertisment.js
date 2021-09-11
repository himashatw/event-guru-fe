import React from 'react';
import axios from '../../../Services/axios';
import { Button, CssBaseline, Grid, Paper, Typography, Box, Link } from '@material-ui/core/';
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