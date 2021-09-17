import React, { useEffect, useState } from 'react';
import axios from '../../Services/axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Paper, Grid, Button, Typography, Divider, Dialog,
   useMediaQuery, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core';
import {
  ArrowDownward, Check, ChevronLeft, ChevronRight, Clear,
   FilterList, FirstPage, LastPage, Remove, Search, ViewColumn, 
} from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import EditUserDetails from './EditUserDetails';
import UserNavBar from './UserNavBar';

const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    marginLeft: 'auto',
    marginRight: 'auto',
    color: theme.palette.text.primary,
  },
  paper1: {
    padding: theme.spacing(5),
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBlockColor: 'solid black',
    color: theme.palette.text.primary,
    backgroundRepeat: 'no-repeat',
    display: 'flex',
  },
  heading: {
    textAlign: 'center',
    marginTop: 10
  },
}));

export default function UserDashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const userId = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [imageUrl, setimageUrl] = useState("");

  const loggedUserId = userId.id;

  const getUserDetails = () => {
    axios.get(`/user/${loggedUserId}`)
      .then(res => {
        setFirstName(res.data.data.firstName);
        setLastName(res.data.data.lastName);
        setEmail(res.data.data.email);
        setPhoneNo(res.data.data.phoneNo);
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  const navigateEventPage = () => {
    history.push(`/user/enquiry/${loggedUserId}`)
  }

  const deleteUserProfile = () => {
    axios.delete(`/user/${loggedUserId}`)
      .then(res => {
        console.log(res.data.message);
        history.push('/login')
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  const getBookedEvent = () =>{

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUserDetails();
    getBookedEvent();
  });


  return (
    <div>
      <UserNavBar/>
      <Grid container>
        <CssBaseline />
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" className={classes.heading}>
            <b>Personal Details:</b>
          </Typography>
        </Grid>
        <div className={classes.paper1}>
          <img src=""
            alt="" 
            style={{ width: "300px", height: "260px" }}></img>
        </div>
        <Grid item xs={7} className={classes.paper} >
          <Typography component="h1" variant="h6">
            First Name:{firstName}
          </Typography>
          <Typography component="h1" variant="h6">
            Last Name:{lastName}
          </Typography>
          <Typography component="h1" variant="h6">
            Email :{email}
          </Typography>
          <Typography component="h1" variant="h6">
            Phone:{phoneNo}
          </Typography>
          <br />

          {/**Update Dialog Box */}
          <Button variant="outlined" color="primary" onClick={handleClickOpen} >Update Profile</Button>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                <EditUserDetails />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          {/**Delete Dialog Box */}
          <Button variant="outlined" color="secondary" onClick={deleteUserProfile} style={{ marginLeft: '10px' }}>Delete Profile</Button><br /><br />
          <Button variant="outlined" color="primary" onClick={navigateEventPage}>Send Enquiry</Button>
        </Grid>
      </Grid>

      <Divider />

      <Grid item xs={12}>
        <Typography component="h1" variant="h5" className={classes.heading}>
          <b>Booked Event Details:</b>
        </Typography>
      </Grid>
      <div style={{ marginTop: '10px', marginLeft: '100px', marginRight: '100px', marginBottom: '5px' }}>
        <MaterialTable
          icons={tableIcons}
          title="Booked Events"
          columns={[
            { title: 'Title', field: 'name' },
            { title: 'Description', field: 'name' },
            { title: 'Schedule Time', field: 'surname' },
            { title: 'Schedule Date', field: 'birthYear'},
            { title: 'Ticket Price', field: 'birthYear'},
            { title: 'Venue', field: 'birthYear'},
            { title: 'Event Type', field: 'birthYear'},
          ]}
          data={[
            { name: firstName, surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          ]}
        // actions={[
        //   {
        //     icon: 'add',
        //     tooltip: 'Add User',
        //     isFreeAction: true,
        //     onClick: (event) => alert("You want to add a new row")
        //   }
        // ]}
        />
      </div>
    </div>
  );
}