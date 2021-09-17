import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../Services/axios';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function UserNavBar() {
  const classes = useStyles();
  const history = useHistory();
  const userId = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const loggedUserId = userId.id;

  const getUserDetails = () => {
    axios.get(`/user/${loggedUserId}`)
      .then(res => {
        setFirstName(res.data.data.firstName);
        setLastName(res.data.data.lastName);
      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  const navigateDashboard = () =>{
    history.push(`/user/dashboard/${loggedUserId}`)
  }

  useEffect(() => {
    getUserDetails();
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <button onClick={navigateDashboard}>{firstName + " " +lastName}</button>
          <Link to="/login"><Button color="inherit">Logout</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
