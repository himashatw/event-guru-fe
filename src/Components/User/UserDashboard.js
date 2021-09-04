import React, { useEffect, useState } from 'react';
import axios from '../../Services/axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import MaterialTable from 'material-table';

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
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
    color: theme.palette.text.primary,
    backgroundImage: 'url(https://i.pinimg.com/originals/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg)',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
  },
  heading: {
    textAlign: 'center',
    marginTop: 10
  },
}));

export default function SendEnquiry() {
  const classes = useStyles();
  const history = useHistory();
  const userId = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  console.log(userId.id);
  const loggedUserId = userId.id;

  const getUserDetails = () => {
    axios.get(`/user/${loggedUserId}`)
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

  const navigateEventPage = () =>{
    history.push(`/user/enquiry/${loggedUserId}`)
  }

  const deleteUserProfile = () =>{
    axios.delete(`/user/${loggedUserId}`)
      .then(res =>{
        console.log(res.data.message);
        history.push('/login')
      }).catch(error =>{
        console.log(error.response.data.message);
      })
  }

  // const updateUserProfile = () =>{
  //   axios.put(`/user/${loggedUserId}`)
  //     .then(res =>{
  //       console.log(res.data.message);
  //     }).catch(error =>{
  //       console.log(error.response.data.message);
  //     })
  // }

  useEffect(() => {
    getUserDetails();
  }, );


  return (
    <div>
      <Grid container>
        <CssBaseline />
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" className={classes.heading}>
            <b>Personal Details:</b>
          </Typography>
        </Grid>
        <Grid item xs={false} sm={4} md={3} className={classes.paper1} />
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
          <Button variant="outlined" color="primary" onClick={navigateEventPage} >Update Profile</Button>
          <Button variant="outlined" color="secondary" onClick={deleteUserProfile} style={{ marginLeft: '10px' }}>Delete Profile</Button><br/><br/>
          <Button variant="outlined" color="primary" onClick={navigateEventPage}>Send Enquiry</Button>
        </Grid>
      </Grid>
      
      <Divider />
      
      <Grid item xs={12}>
        <Typography component="h1" variant="h5" className={classes.heading}>
          <b>Booked Event Details:</b>
        </Typography>
      </Grid>
      <div style={{marginTop:'10px',marginLeft:'100px',marginRight:'100px',marginBottom:'5px'}}>
        <MaterialTable
          icons={tableIcons}
          title="Free Action Preview"
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            {
              title: 'Birth Place',
              field: 'birthCity',
              lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
          ]}
          data={[
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
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