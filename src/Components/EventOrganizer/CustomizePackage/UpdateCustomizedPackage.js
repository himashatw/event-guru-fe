import axios from '../../../Services/axios.js';
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import OfferFormDashBoard from '../SlideBar/OfferFormDashBoard';
import Typography from '@material-ui/core/Typography';
import { useParams, useHistory } from 'react-router-dom';

const UpdateCustomizedPackage = (props) => {

    const updateParam = useParams();
    console.log(updateParam.id);
    const [title, setTitle] = useState('');
    const [noOfParticipants, setNoOfParticipants] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [options, setOptions] = useState([]);
    const [selectVenue, setSelectVenue] = useState('');
    const history = useHistory();

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(10),
            color: theme.palette.text.secondary,
            marginLeft: 242,

        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        textField: {
            marginLeft: theme.spacing(0),
            marginRight: theme.spacing(0),
            minWidth: 200,
        },
        card: {
            minHeight: 500,
        },
    }));
    const eventorg = useStyles();

    useEffect(() => {
        console.log("start")
        axios.get(`/organizer/custom/view/venue`)
            .then((res) => {
                console.log(res.data.data)
                let data = [];
                // eslint-disable-next-line array-callback-return
                res.data.data.map((value, index) => {
                    let venue = {
                        value: value._id,
                        label: value.location,
                    }
                    data.push(venue);
                    console.log(data)
                })
                setOptions(data);
                console.log("options", options)
            })
            .catch(err => console.log(err.message))

        var vid = 0;
        axios.get(`/organizer/pending/get/${updateParam.id}`)
            .then((res) => {
                setTitle(res.data.data.title);
                setNoOfParticipants(res.data.data.noOfParticipants);
                setEmail(res.data.data.email);
                setMessage(res.data.data.message);
                setSelectVenue(res.data.data.venue);
                console.log("vid =>", res.data.data.venue);
            }).catch(err => console.log(err.message));
        console.log(vid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            "venue": selectVenue,
            "noOfParticipants": noOfParticipants,
            "title": title,
            "email": email,
            "message": message,
        };
        console.log("data", data)
        axios.put(`/organizer/pending/update/${updateParam.id}`, data)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    alert("Data Added Successfully")
                    window.location = "/eventorganizer/customizedpackages";
                } else {
                    alert("Data Failed")
                }
            })
            .catch(err => {
                console.log(err.message)
                alert("Data Failed")
            })
    }
    return (
        <div>
            <div className={eventorg.root}>
                <Grid container spacing={2}>
                    <Grid item > <OfferFormDashBoard page="UpdateCustomizedPackage" /></Grid>
                    <Grid item xs={12}>
                        <Paper className={eventorg.paper}>
                            <Typography gutterBottom variant="h4" component="h2">
                                Update Custom Package
                            </Typography>
                            <form onSubmit={onSubmit}>
                                <br />
                                <Grid item xs={12} >
                                    <InputLabel id="demo-simple-select-helper-label">Select The Venue*</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Venue"
                                        name="venue"
                                        value={selectVenue}
                                        onChange={e => setSelectVenue(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                    >
                                        {options.map((value, index) => (
                                            < MenuItem value={value.value} >{value.label}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <br />
                                <Grid item xs={12} >
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="title"
                                        label="Package Title"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Grid>
                                <br />
                                <Grid item xs={12} >
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="noOfParticipants"
                                        label="No Of Participants"
                                        name="noOfParticipants"
                                        value={noOfParticipants}
                                        onChange={(e) => setNoOfParticipants(e.target.value)}
                                    />
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                    />
                                </Grid>
                                <br />

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"

                                        fullWidth
                                        id="message"
                                        label="Message about package"
                                        name="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <br />
                                <Button
                                    type="submit"

                                    variant="contained"
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: "green",
                                        color: "white",
                                        fontSize: "18px"
                                    }}
                                >
                                    Submit
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: "red",
                                        marginLeft: 10,
                                        color: "white",
                                        fontSize: "18px"
                                    }}
                                    onClick={(e) => history.push('/eventorganizer/latestoffers')}
                                >
                                    Cancel
                                </Button>
                                <br /><br />
                            </form>
                        </Paper>
                    </Grid>
                    <br />
                </Grid>
            </div >
        </div>
    )

}
export default UpdateCustomizedPackage;