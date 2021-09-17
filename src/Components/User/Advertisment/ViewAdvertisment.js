import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../../Services/axios';
import {Grid, Paper, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/styles.css';

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

  const advertId = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [venue, setVenue] = useState("");
  const [adType, setAdType] = useState("");
  const [imageUrl, setImgUrl] = useState("");

  //console.log("Advert Id",advertId.id);
  const addId = advertId.id;

  const getAdvertDetails = () => {
    axios.get(`/advert/${addId}`)
      .then(res => {
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        setScheduleTime(res.data.data.scheduleTime);
        setScheduleDate(res.data.data.scheduleDate);
        setTicketPrice(res.data.data.ticketPrice);
        setVenue(res.data.data.venue);
        setAdType(res.data.data.adType);
        setImgUrl(res.data.data.imageUrl);

      }).catch(error => {
        console.log(error.response.data.message);
      })
  }

  const bookEvent = () => {


  }

  useEffect(() => {
    getAdvertDetails();
  });

  return (
    <div>
      <br />
      <div>
      <Grid container>
        <div style={{ margin: 'auto', width: 600, height: 'auto' }} >
          <Paper elevation={15}> 
            <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
              <b>Book an Event</b>
            </Typography>
            <br />
            <img
              src={imageUrl}
              alt=""
              style={{ maxWidth: 300, maxHeight: 200, margin: 'auto', borderRadius: '15px', border: '2px solid black' }}
            >
            </img>
            <br />
            <br />
            <div style={{marginLeft:'10px'}}>
            <p>Title  : {title}</p>
            <p>Description  :{description}</p>
            <p>Schedule Time :{scheduleTime}</p>
            <p>Schedule Date :{scheduleDate}</p>
            <p>Ticket Price :{ticketPrice}</p>
            <p>Venue :{venue}</p>
            <p>AdType :{adType}</p>
            </div>
            <br />
            <center>
              <button className='button button2' style={{ borderRadius: '15px;' }} onClick={bookEvent}>Book Now</button>
            </center>
          </Paper>
        </div>
        </Grid>
      </div>
    </div>
  );
}