import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../../Services/axios';
import { Button, Grid, TextField, Paper, Typography, Link } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import UserNavBar from '../UserNavBar';
import toastify from 'react-toastify';

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
    //margin: theme.spacing(2, 0, 2),
    height: 50,
    width: 200,
    margin:'auto'
  },
  gride:{
    marginLeft: '400px',
    
  },
}));

export default function ConfirmPayment() {
  const classes = useStyles();

  const userId = useParams();
  const advertId = useParams();
  const history = useHistory();
  const [email,setEmail] = useState("");
  const [phoneNo,setPhoneNo] = useState("");
  const [ticketPrice,setTicketPrice] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCvv] = useState("");

  console.log("User Id",userId);
  const loggedUserId = userId.id;
  console.log("Add Id",userId);
  const addId = advertId.id;

  const getUserDetails = () => {
    axios.get(`/user/${loggedUserId}`)
      .then(res => {
        setEmail(res.data.data.email);
        setPhoneNo(res.data.data.phoneNo);
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  const getAdvertDetails = () => {
    axios.get(`/advert/${addId}`)
    .then(res => {
      setTicketPrice(res.data.data.ticketPrice);  
    }).catch(error => {
      console.log(error);
    })
  }


  const confirmPay = (e) => {
    e.preventDefault();

    const payments = {
      cardNo,
      cardHolderName,
      expireDate,
      cvv,
      state:"pending",
      users: loggedUserId,
      advert:addId
    }
    axios.post('/user/payment',payments)
    .then(res =>{
      console.log(res.data);
      alert('Booking successfully !!!');
      history.push(`/user/dashboard/${loggedUserId}`)
    }).catch(error =>{
      console.log(error.response.data.message);
    })

  }

  useEffect(() => {
    getUserDetails();
    getAdvertDetails();
  });

  return (
    <div>
      <UserNavBar />
      <br/>
      <Grid container>
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={10} className={classes.gride}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              <b>Confirm Your Booking</b>
            </Typography>
            <form className={classes.form}>
              <Grid container spacing={3} >
                <Grid item xs={12}>
                  Email :
                  <TextField
                    name="email"
                    variant="outlined"
                    disabled
                    value={email}
                    fullWidth
                    id="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  Phone No :
                  <TextField
                    name="phoneNo"
                    variant="outlined"
                    disabled
                    value={phoneNo}
                    fullWidth
                    id="phoneNo"
                  />
                </Grid>
                <Grid item xs={12}>
                  Ticket Price :
                  <TextField
                    name="ticketPrice"
                    variant="outlined"
                    disabled
                    value={ticketPrice}
                    fullWidth
                    id="ticketPrice"
                  />
                </Grid>
              </Grid>
            </form>
          </div>
          {/* </Grid> */}

          <Grid>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                <b>Payment Details</b>
              </Typography>
              <br/>
              <form onSubmit={confirmPay}>
                <Grid container spacing={3} >
                  <Grid item xs={12}>
                  Card Number* :
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="cardNo"
                      name="cardNo"
                      onChange={(e) => { setCardNo(e.target.value); }}
                      autoComplete="cardNo"
                      placeholder="Card Number"
                    />
                  </Grid>
                  <Grid item xs={12} >
                  Card Holder Name* :
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="cardHolderName"
                      name="cardHolderName"
                      onChange={(e) => { setCardHolderName(e.target.value); }}
                      autoComplete="cardHolderName"
                      placeholder="Card Holder Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Expire Date* :
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="expireDate"
                      name="expireDate"
                      onChange={(e) => { setExpireDate(e.target.value); }}
                      autoComplete="expireDate"
                      placeholder="Expire Date"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Cvv Code* :
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="cvv"
                      name="cvv"
                      onChange={(e) => { setCvv(e.target.value); }}
                      autoComplete="cvv"
                      placeholder="Cvv Code"
                    />
                  </Grid>
                  <br/><br/><br/><br/><br/>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Confirm
                  </Button>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}