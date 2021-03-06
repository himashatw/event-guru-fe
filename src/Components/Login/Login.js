import React from "react";
import { useHistory } from "react-router-dom";
import axios from "../../Services/axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useFormik } from "formik";
import Header from "../HomePage/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "70vh",
    marginTop: theme.spacing(4),
  },
  image: {
    backgroundImage:
      "url(https://thumbs.dreamstime.com/b/event-management-business-background-chalkboard-wooden-176007384.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginLeft: theme.spacing(10),
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(5),
  },
  submit: {
    marginTop: theme.spacing(2),
    height: "40px",
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        role: "",
      },
      onSubmit: (e) => {
        console.log("button clicked");
        console.log(e.role);
        if (e.role === "user") {
          console.log("user clicked");
          axios
            .post("/user/login", values)
            .then((res) => {
              if (res.status === 200) {
                alert(res.data.message);
                localStorage.setItem('user', JSON.stringify(res.data))
                console.log(res.data)
                history.push('/user/dashboard');
              }
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        }
        if (e.role === "eventOrganizer") {
          console.log("eventOrganizer clicked");
          axios
            .post("/organizer/login", values)
            .then((res) => {
              if (res.status === 200) {
                alert(res.data.message);
                localStorage.setItem('eventOrganizer', JSON.stringify(res.data))
                console.log(res.data)
                history.push('/eventorganizer/latestoffers');
              }
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        }
        if (e.role === "propertyOwner") {
          console.log("propertyOwner clicked");
          axios
            .post("/propertyOwner/login", values)
            .then((res) => {
              if (res.status === 200) {
                alert(res.data.message);
                localStorage.setItem('owner', JSON.stringify(res.data))
                history.push('/owner/dashboard')
              }
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        }
        if (e.role === "admin") {
          console.log("admin clicked");
          axios
            .post("/admin/login", values)
            .then((res) => {
              if (res.status === 200) {
                alert(res.data.message);
                history.push('/admin/dashboard')
              }
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        }
      },
    });

  return (
    <>
      <Header />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          elevation={20}
          className={classes.image}
        />
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          component={Paper}
          elevation={20}
          square
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address*"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
              />
              {touched.email && errors.email ? <div>{errors.email}</div> : null}
              <TextField
                variant="outlined"
                margin="normal"
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
              {touched.password && errors.password ? (
                <div>{errors.password}</div>
              ) : null}
              <FormControl
                component="fieldset"
                style={{ marginLeft: "4px", marginTop: "10px" }}
              >
                <FormLabel component="legend">Select your role*</FormLabel>
                <RadioGroup
                  aria-label="role"
                  name="role"
                  id="role"
                  style={{ display: "initial" }}
                  required
                >
                  <FormControlLabel
                    value="user"
                    onChange={handleChange}
                    control={<Radio required />}
                    label="User"
                  />
                  <FormControlLabel
                    value="eventOrganizer"
                    onChange={handleChange}
                    control={<Radio required />}
                    label="Event Organizer"
                  />
                  <FormControlLabel
                    value="propertyOwner"
                    onChange={handleChange}
                    control={<Radio required />}
                    label="Property Owner"
                  />
                  <FormControlLabel
                    value="admin"
                    onChange={handleChange}
                    control={<Radio required />}
                    label="Admin"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <br />
              <br />
              <Link href="#">Forgot password?</Link>
              <br /> <br />
              <Link href="/register">Don't have an account? Sign Up</Link>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
