import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../../Services/axios';
import {Grid, Paper, Typography } from '@material-ui/core/';
import '../styles/styles.css';
import Header from '../../HomePage/Header';
import '../styles/styles.css';
import UserNavBar from '../UserNavBar';

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

  console.log("Advert Id",advertId.id);
  const addId = advertId.id;
  const user = JSON.parse(localStorage.getItem("user"));

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
    if(user === null){
      alert('please log before booking');
      history.push('/login');
    }else{
      history.push(`/user/payment/${addId}`)
    } 
  }

  useEffect(() => {
    getAdvertDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>
      {user === null ? <Header/> : <UserNavBar/>}
      <br />
      <div>
      <Grid container>
        <div style={{ margin: 'auto', width: 600, height: 'auto' }} >
          <Paper elevation={5}> 
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
            <p className="dashp">Title  : {title}</p>
            <p className="dashp">Description  :{description}</p>
            <p className="dashp">Schedule Time :{scheduleTime}</p>
            <p className="dashp">Schedule Date :{scheduleDate}</p>
            <p className="dashp">Ticket Price :{ticketPrice}</p>
            <p className="dashp">Venue :{venue}</p>
            <p className="dashp">AdType :{adType}</p>
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