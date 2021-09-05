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

  //card
  root: {
    marginTop: 20,
  },
  bullet: {
    display: 'inline-block',
  },
  paper1: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',

  },
  title: {
    fontSize: 14,
    marginTop: theme.spacing(3),
  },
  pos: {
    marginBottom: 10,
  },
  button: {
    marginLeft: 420,
    color: 'red',
  }
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
        <div className={classes.paper1}>
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