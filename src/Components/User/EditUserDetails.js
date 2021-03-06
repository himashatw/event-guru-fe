import React, { useEffect, useState } from 'react';
import axios from '../../Services/axios'
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
    marginLeft: '120px'
  },
}));

export default function EditUserDetails() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  //const [imageUrl, setimageUrl] = useState("");
  
  const user = JSON.parse(localStorage.getItem("user"));

  const getUserDetails = () => {
    axios.get(`/user/${user.user._id}`)
      .then(res => {
        console.log(res.data.data);
        setFirstName(res.data.data.firstName);
        setLastName(res.data.data.lastName);
        setEmail(res.data.data.email);
        setPhoneNo(res.data.data.phoneNo);
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  const updateUserProfile = (e) => {
    e.preventDefault();
    const newData = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      phoneNo:phoneNo
    }
    axios.put(`/user/${user.user._id}`,newData)
      .then(res => {
        alert('update successfully !!!')
        window.location.reload();
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  useEffect(() => {
    getUserDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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
                value={firstName}
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
                value={lastName}
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
                value={email}
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
                value={phoneNo}
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