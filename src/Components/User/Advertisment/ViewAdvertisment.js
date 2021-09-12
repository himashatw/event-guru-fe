import React from 'react';
import axios from '../../../Services/axios';
import { Button, CssBaseline, Grid, Paper, Typography, Box, Link } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

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
    margin: theme.spacing(2, 0, 2),
    height: '40px'
  },
}));

export default function ViewAdert() {
  const classes = useStyles();

  return (
    <div>
      
          <div style={{}}>
            <Typography component="h1" variant="h5">
              Show List
            </Typography>
          </div>
        

        
          <div style={{margin:'auto',border:'1px solid black',width:600,height:'auto'}}>
            <Typography component="h1" variant="h5" style={{textAlign:'center'}}>
              <b>Book an Event</b>
            </Typography>
            <br/>
            <img 
              src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"  
              alt="" 
              style={{maxWidth:300,margin:'auto'}}
              >
            </img>
            <br/>
            <Box style={{border:'1px solid black'}}>aaa</Box>
            <Box style={{border:'1px solid black'}}>aaa</Box>
            <Box style={{border:'1px solid black'}}>aaa</Box>
            <Box style={{border:'1px solid black'}}>aaa</Box>
            <Box style={{border:'1px solid black'}}>aaa</Box>
            <Box style={{border:'1px solid black'}}>aaa</Box>
            <Box style={{border:'1px solid black'}}>aaa</Box>
            <Box style={{border:'1px solid black'}}>aaa</Box>
            <Box style={{border:'1px solid black'}}>aaa</Box>
            <center>
              <Button style={{border:'1px solid black'}}>Book Now</Button>
            </center>
          </div>
       
      
    </div>
  );
}