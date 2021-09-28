import React from 'react';
import axios from '../../Services/axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
    height: '40px'
  },
}));

export default function OrganizerSignUp() {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Full Name Name Required'),
      email: Yup.string()
        .email('Please Enter Valid Email')
        .required('Email is required'),
      phone: Yup.string()
        .required('Phone Number is required')
        .matches(/^[0-9]+$/, "Must be only numbers")
        .min(10, 'Must be minimum 10 numbers')
        .max(12, 'Must be maximum 12 numbers'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm password is required'),
    }),
    onSubmit: () => {
      console.log('button clicked');
      axios.post("/organizer/register", values)
        .then(response => {
          console.log(response.data);
          alert('Registered Successfully');
          history.push('/login');
        }).catch(error => {
          console.log(error.response.data.error);
        })
    }
  })

  return (
    <Grid container justifyContent="center" style={{ marginTop: "15px" }}>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={20} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                {touched.name && errors.name ? (<div className="yupErros">{errors.name}</div>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address*"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                />
                {touched.email && errors.email ? (<div className="yupErros">{errors.email}</div>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone Number*"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="phone"
                />
                {touched.phone && errors.phone ? (<div className="yupErros">{errors.phone}</div>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password*"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                />
                {touched.password && errors.password ? (<div className="yupErros">{errors.password}</div>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password*"
                  type="password"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                />
                {touched.confirmPassword && errors.confirmPassword ? (<div className="yupErros">{errors.confirmPassword}</div>) : null}
              </Grid>
              <FormControlLabel
                style={{ marginLeft: "9px" }}
                control={<Checkbox color="primary" required/>}
                label="I agree with privacy and policy agreement."
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}