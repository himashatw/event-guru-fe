import React from 'react';
import axios from '../../../Services/axios';
import { Button, CssBaseline, Grid, TextField, Paper, Typography, Box, Link } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import UserNavBar from '../UserNavBar';

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

export default function ConfirmPayment() {
  const classes = useStyles();

  return (
    <div>
      <Grid item xs>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            <b>Confirm your Booking</b>
          </Typography>
        </div>
      </Grid>
      <form>
        <TextField



        />
        <TextField



        />
        <TextField



        />
      </form>

      <Grid>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            <b>Payment Details</b>
          </Typography>
        </div>
        <form>
          <TextField



          />
          <TextField



          />
          <TextField



          />
          <TextField



          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirm
          </Button>
        </form>
      </Grid>
    </div>
  );
}