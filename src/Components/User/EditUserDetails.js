import React, { useEffect, useState } from 'react';
import axios from '../../Services/axios'
import { useHistory, useParams } from 'react-router-dom';
import { CssBaseline, Grid, Typography, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  //form
  paper: {
    margin: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '90%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    height: '40px',
    width: "200px",
    marginLeft: '150px'
  },
}));

export default function EditUserDetails() {
  const classes = useStyles();
  const history = useHistory();
  const userId = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [imageUrl, setimageUrl] = useState("");

  console.log(userId.id);
  const loggedUserId = userId.id;

  // const getUserDetails = () => {
  //   axios.get(`/user/${loggedUserId}`)
  //     .then(res => {
  //       console.log(res.data.data);
  //       setFirstName(res.data.data.firstName);
  //       setLastName(res.data.data.lastName);
  //       setEmail(res.data.data.email);
  //       setPhoneNo(res.data.data.phoneNo);
  //     }).catch(error => {
  //       console.log(error.response.data.message);
  //     })
  // }

  const updateUserProfile = () => {
    const newData = {
      firstName,
      lastName,
      email,
      phoneNo
    }
    axios.put(`/user/${loggedUserId}`,newData)
      .then(res => {
        console.log(res.data.message);
        //history.push(``)
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  // useEffect(() => {
  //   getUserDetails();
  // });

  return (
    <Grid item xs>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Personal Details
        </Typography>
        <form className={classes.form} onSubmit={updateUserProfile}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name*"
                //value={firstName}
                onChange={(e) => setFirstName(e.target.value)}   
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                autoComplete="lname"
                name="lastName"
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name*"
                //value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                fullWidth
                id="email"
                label="Email*"
                //value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                autoComplete="phoneNo"
                name="phoneNo"
                variant="outlined"
                fullWidth
                id="phoneNo"
                label="Phone Number*"
                //value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </div>
    </Grid>

  );
}