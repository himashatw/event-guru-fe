import React from 'react';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
//import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import Container from '@material-ui/core/Container';

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
    margin: '0 2px',
    transform: 'scale(0.8)',
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
    marginBottom: 12,
  },
  button:{
    marginLeft: 420,
    color:'red',
  }
}));

export default function SendEnquiry() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid container style={{ marginTop: "15px" }}>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={1} square  style={{marginLeft:'50px'}}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Send Enquiry
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={3} >
              <Grid item xs={12}>
                Email :
                <TextField
                  name="email"
                  variant="outlined"
                  disabled
                  fullWidth
                  id="firstName"
                  label="Email"
                />
              </Grid>
              <Grid item xs={12}>
                Reason* :
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={5}
                  id="lastName"
                  label="Reason"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                Date* :
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  type="date"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send
            </Button>
          </form>
        </div>
      </Grid>

      {/* show enquiry grid*/}
      <Grid item xs={12} sm={6} md={5} component={Paper} style={{marginLeft:"100px"}} elevation={1} square>
        <div className={classes.paper1}>
          <Typography component="h1" variant="h5">
            Enquiries History
          </Typography>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="h2">
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                adjective
              </Typography>
              <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" className={classes.button}><DeleteForeverIcon style={{fontSize:'40px'}}/></Button>
            </CardActions>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
}