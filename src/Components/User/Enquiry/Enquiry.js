import React, { useState, useEffect } from 'react';
import axios from '../../../Services/axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
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
    height: 'auto'
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
    fontSize: 'auto',
    marginTop: theme.spacing(3),
  },
  pos: {
    marginBottom: 10,
  },
  button: {
    marginLeft: 'auto',
    color: 'red',
  }
}));

export default function SendEnquiry() {

  const userId = useParams();
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [enquiries, setEnquirie] = useState([]);
  const [email, setEmail] = useState("");

  const classes = useStyles();

  console.log(userId.id);
  const loggedUserId = userId.id;

  //get user email
  function getLoggedUserEmail() {
    axios.get(`/user/${loggedUserId}`)
      .then(res => {
        console.log(res.data.data.email);
        setEmail(res.data.data.email);
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  //send enquiry
  const onSubmit = (e) => {
    e.preventDefault();

    const enquiry = {
      reason,
      date,
      users: loggedUserId
    }
    axios.post('/user/enquiry', enquiry)
      .then(res => {
        console.log(res.data);
        alert('Enquiry send successfully');
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  //get enquiries
  const getEnquiries = () => {
    axios.get(`/user/enquiry/${loggedUserId}`)
      .then(res => {
        console.log(res.data.data);
        setEnquirie(res.data.data)
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  //delete enquiry
  const deleteEnquiry = (e, id) => {
    axios.delete(`/user/enquiry/${id}`)
      .then(res => {
        console.log(res.data.message);
        window.location.reload();
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  useEffect(() => {
    getEnquiries();
    getLoggedUserEmail();
  });

  return (
    <div>
      <UserNavBar />
      <Grid container style={{ marginTop: "15px" }}>
        <CssBaseline />
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={1} square style={{ marginLeft: '50px' }}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Send Enquiry
            </Typography>
            <form className={classes.form} onSubmit={onSubmit}>
              <Grid container spacing={3} >
                <Grid item xs={12}>
                  Email :
                  <TextField
                    name="email"
                    variant="outlined"
                    disabled
                    value={email}
                    fullWidth
                    id="firstName"
                  />
                </Grid>
                <Grid item xs={12}>
                  Reason* :
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={5}
                    onChange={(e) => { setReason(e.target.value); }}
                    id="reason"
                    name="reason"
                    autoComplete="reason"
                    placeholder="Reason"
                  />
                </Grid>
                <Grid item xs={12}>
                  Date* :
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="date"
                    name="date"
                    onChange={(e) => { setDate(e.target.value); }}
                    autoComplete="date"
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
        <Grid item xs={12} sm={6} md={5} component={Paper} style={{ marginLeft: "90px" }} elevation={1} square>
          <div className={classes.paper1}>
            <Typography component="h1" variant="h5">
              Enquiries History
            </Typography>
            {
              enquiries.map((value, index) => (
                <Card className={classes.root} key={index}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Reason : {value.reason}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      State : {'true'}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Date: {value.date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <DeleteForeverIcon className={classes.button} onClick={e => { deleteEnquiry(e, value._id) }} style={{ fontSize: '35px' }} />
                  </CardActions>
                </Card>
              ))
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
}