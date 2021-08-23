import React from 'react';
import axios from '../../Services/axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from "formik";
import * as Yup from 'yup';


const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: 'url(https://thumbs.dreamstime.com/b/event-management-business-background-chalkboard-wooden-176007384.jpg)',
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // marginLeft: theme.spacing(10),
  },
  paper: {
    margin: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: '40px'
  },
}));

export default function ContactUs() {
  const classes = useStyles();
  const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is Required'),
      email: Yup.string()
        .email('Please Enter Valid Email')
        .required('Email is required'),
      subject: Yup.string()
        .required('Subject is required'),
      message: Yup.string()
        .required('Message is required'),
    }),
    onSubmit: () => {
      console.log('button clicked');
      axios.post("/visitor/contactus", values)
        .then(response => {
          console.log(response.data);
          alert('Send Successfully');
          //history.push('/user/attendee/login');
        }).catch(error => {
          console.log(error.response.data.error);
        })
    }
  })

  return (
    <Grid container justifyContent="space-evenly" style={{ marginTop: "15px" }}>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={20} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3} >
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Full Name*"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                />
                {touched.name && errors.name ? (<div>{errors.name}</div>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address*"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                />
                {touched.email && errors.email ? (<div>{errors.email}</div>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="subject"
                  label="Subject*"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="subject"
                />
                {touched.subject && errors.subject ? (<div>{errors.subject}</div>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                  id="message"
                  label="Message*"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="messsage"
                />
                {touched.message && errors.message ? (<div>{errors.message}</div>) : null}
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
    </Grid>
  );
}