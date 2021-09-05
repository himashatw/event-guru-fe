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

export default function OwnerSignUp() {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      contactNumber: '',
      propertyType: '',
      accountActive: false,
      location: '',
      bioDetails: '',
      propertyImageUrl: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Full Name Name Required'),
      email: Yup.string()
        .email('Please Enter Valid Email')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm password is required'),
      contactNumber: Yup.string()
        .required('Phone Number is required')
        .matches(/^[0-9]+$/, "Must be only numbers")
        .min(10, 'Must be minimum 10 numbers')
        .max(12, 'Must be maximum 12 numbers'),
      propertyType: Yup.string()
        .required('Property Type is required'),
      location: Yup.string()
        .required('Location is required'),
      bioDetails: Yup.string()
        .required('Bio Details is required'),
      propertyImageUrl: Yup.string()
        .required('Image of Property is required'),
    }),
    onSubmit: () => {
      console.log('button clicked');
      axios.post("/propertyOwner/register", values)
        .then(response => {
          console.log(response.data);
          alert('Registered Successfully');
          history.push('/login');
        }).catch(error => {
          console.log(error.response.data.error);
        })
    }
  })

  const uploadImage = (e) =>{
    const files = e.target.files;
    const formData = new FormData();
    formData.append("file",files[0])
    formData.append("upload_preset", "o72lqtty")
    axios.post("https://api.cloudinary.com/v1_1/db7nslark/image/upload",formData)
    console.log(files[0]);
  }

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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="contactNumber"
                  label="Phone Number*"
                  name="contactNumber"
                  value={values.contactNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="contactNumber"
                />
                {touched.contactNumber && errors.contactNumber ? (<div>{errors.contactNumber}</div>) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="propertyType"
                  label="Property Type*"
                  name="propertyType"
                  value={values.propertyType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="propertyType"
                />
                {touched.propertyType && errors.propertyType ? (<div>{errors.propertyType}</div>) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  autoComplete="password"
                />
                {touched.password && errors.password ? (<div>{errors.password}</div>) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  autoComplete="confirmPassword"
                />
                {touched.confirmPassword && errors.confirmPassword ? (<div>{errors.confirmPassword}</div>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="location"
                  label="Location*"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="location"
                />
                {touched.location && errors.location ? (<div>{errors.location}</div>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                  id="bioDetails"
                  label="Bio Details*"
                  name="bioDetails"
                  value={values.bioDetails}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="bioDetails"
                />
                {touched.bioDetails && errors.bioDetails ? (<div>{errors.bioDetails}</div>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="propertyImageUrl"
                  name="propertyImageUrl"
                  value={values.propertyImageUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="file"
                />
                {touched.propertyImageUrl && errors.propertyImageUrl ? (<div>{errors.propertyImageUrl}</div>) : null}
              </Grid>
              <FormControlLabel
                style={{ marginLeft: "9px" }}
                control={<Checkbox color="primary" required />}
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