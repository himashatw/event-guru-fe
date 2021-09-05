import React, { useEffect, useState } from 'react';
import axios from '../../Services/axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Paper, Grid, Button, Typography, Divider, Dialog, MuiDialogTitle, MuiDialogContent, 
  MuiDialogActions, IconButton } from '@material-ui/core';
import {
   ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline
  , FilterList, FirstPage, LastPage, Remove, Search, ViewColumn, CloseIcon
} from '@material-ui/icons';
import { makeStyles,useTheme,withStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

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

  const userId = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [imageUrl, setimageUrl] = useState("");

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

  // const updateUserProfile = () =>{
  //   axios.put(`/user/${loggedUserId}`)
  //     .then(res =>{
  //       console.log(res.data.message);
  //     }).catch(error =>{
  //       console.log(error.response.data.message);
  //     })
  // }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUserDetails();
  });


  return (
    <div>
      <Grid container>
        <CssBaseline />
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" className={classes.heading}>
            <b>Personal Details:</b>
          </Typography>
        </Grid>
        <div className={classes.paper1}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABIFBMVEUilNIdd6v///86iacbeanz+/QXdawhldL///wceKn8//8dd6z///j///sjk9P///f//P8lktT2//z///Mmk80ljMT/+/f/9/4hlc8ZeqgajtEqksgbl9f8//X2/+7/+/v//uwAbqIAbacAcp8agLQshbEAitAknNI4ptdaqdhfqtSWyOHB4evg8fDs9frS5Oyk0d9os9d4t9Mckt46ota03+fC5ffX8vaGw+q12uvM6OlFl8cSkODc6uLS4eTt8/ILksGfxuNup8Xo7viGrMW/1d2iyd2z0tyLssJ0u9+01ddXkrra4O54o8VjnLshfpd1rbwEdbYairkngKOFwtUnmcCxx+S51OlworBhudOZ0OYoosMAaJ+Dtd1Ji7yfztnn35DFAAAMlElEQVR4nO2dC1PbxhqGJSFppZW01h1ZMjHGJk7A4ABpCKQnJhcMaVJOU9qTnqan/f//4nxrShIuNt6VxModvTOdaWc6RE+++96QpFq1atWqVatWrVq1atWqVatWrVq1atWqVatWrVq1atWqVatWrVq1atWqVeuqWoRIkufBv6EkSSQpDCXieQh5oj+sKKEsTBBJH0b9R48eP37cD9M9gpIs9Fqiv6wokZRkG5uDLcNeDRRFsZXt4ZOdvreX9kV/WW4hiUghSZPd77RGw7Z938cGyLHhv7SXm0+Jh8BfCRL9nXnk7ZGn45FymwzH/24jglBc6HD00v6B1vBvJXSdIG48e5yizCOiv5Nf0aaGnWDlVkJFwRivNg4yL1lQN81Q9Hi/0Y4VbNzOp7RtB2N7e5eGYib6czmUpc81H08x3zeKVw76R9me6M/l0UGjPQcgxrEzzLzFsyHZO1xZmQNQcWys2Psvvl+wWEzC/r/moLuUuzJ66iXpItmRJC9jBsJAC0Yv9rIFauLI0acHtyfQ29V2NW0/Q4tSFkkiha8abRZCv91w7WcpQd6CRCPamSfFXJVhK5spWowWFaVH2wEHYcPfaGULQShJ41VmQKiLTrAvoeoTeijbe+z4LEH4VcFzsgBjBvHSZ40pnehdMkYLYEMU7m0YscOeaajc4FX1iz458o5txeYjbPujSDTAnULeU42LjsrGjddR1SuGJ71qcBMqOBh2oiQUDTFT3tEbm5/QdhRT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"
            alt="" style={{ width: "300px", height: "260px" }}></img>
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
          <Button variant="outlined" color="primary" onClick={navigateEventPage} >Update Profile</Button>
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