import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../../Services/axios';
import { Button, Grid, TextField, Paper, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import UserNavBar from '../UserNavBar';
import { useFormik } from "formik";
import * as Yup from "yup";

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
    height: 50,
    width: 200,
    margin: 'auto'
  },
  gride: {
    marginLeft: '400px',

  },
}));

export default function ConfirmPayment() {
  const classes = useStyles();

  const advertId = useParams();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const addId = advertId.id;

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({
    initialValues: {
      cardNo: "",
      cardHolderName: "",
      expireDate: "",
      cvv: "",
      users: user.user._id,
      advert: addId
    },
    validationSchema: Yup.object({
      cardNo: Yup.number().required('Card Number is required'),
      cardHolderName: Yup.string().required("Card Holder Name is Required"),
      expireDate: Yup.string().required("Expire date required"),
      cvv: Yup.number().required('Cvv Number is required')
    }),
    onSubmit: () => {
      axios.post("/user/payment", values)
        .then(response => {
          console.log(response.data);
          alert('Booking successfully !!!');
          history.push('/user/dashboard')
        }).catch(error => {
          console.log(error.response.data.error);
        })
    }
  })

  const getUserDetails = () => {
    axios.get(`/user/${user.user._id}`)
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

  useEffect(() => {
    getUserDetails();
    getAdvertDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <UserNavBar />
      <br />
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

          <Grid>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                <b>Payment Details</b>
              </Typography>
              <br />
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3} >
                  <Grid item xs={12}>
                    Card Number* :
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="cardNo"
                      name="cardNo"
                      value={values.cardNo}
                      autoComplete="cardNo"
                      placeholder="Card Number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                     {touched.cardNo && errors.cardNo ? (<div className="yupErros">{errors.cardNo}</div>) : null}
                  </Grid>
                  <Grid item xs={12} >
                    Card Holder Name* :
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="cardHolderName"
                      name="cardHolderName"
                      value={values.cardHolderName}
                      autoComplete="cardHolderName"
                      placeholder="Card Holder Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                     {touched.cardHolderName && errors.cardHolderName ? (<div className="yupErros">{errors.cardHolderName}</div>) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Expire Date* :
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="expireDate"
                      name="expireDate"
                      value={values.expireDate}
                      autoComplete="expireDate"
                      placeholder="Expire Date"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.expireDate && errors.expireDate ? (<div className="yupErros">{errors.expireDate}</div>) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Cvv Code* :
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="cvv"
                      name="cvv"
                      value={values.cvv}
                      autoComplete="cvv"
                      placeholder="Cvv Code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                     {touched.cvv && errors.cvv ? (<div className="yupErros">{errors.cvv}</div>) : null}
                  </Grid>
                  <br /><br /><br /><br /><br />
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