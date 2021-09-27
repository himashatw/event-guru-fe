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

const CreateCustomizedPackage = (props) => {

    const [title, setTitle] = useState('');
    const [noOfParticipants, setNoOfParticipants] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [approve, seApprove] = useState("pending")
    const [options, setOptions] = useState([]);
    const [selectVenue, setSelectVenue] = useState('');

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            height: "80vh",
        },
        paper: {
            padding: theme.spacing(10),
            color: theme.palette.text.secondary,
            marginLeft: 241,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSelectedVenue = (event) => {
        setSelectVenue(event.target.value)
        console.log("selectVenue", selectVenue)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        seApprove("pending");
        const data = {
            "title": title,
            "venue": selectVenue,
            "noOfParticipants": noOfParticipants,
            "date": date,
            "email": email,
            "message": message,
            "approve": approve,
        };
        console.log("data", data)
        axios.post("/organizer/pending/add", data)
            .then(res => {
                console.log(res.data)
                alert("Data Added Successfully")
                window.location = `/eventorganizer/latestoffers`;
            })
            .catch(err => {
                console.log(err.message)
                alert("Data Failed")
            })
    }

    return (
        <div className={eventorg.root}>
            <div className={eventorg.mainDiv}>
                <Grid container >
                    <Grid item > <OfferFormDashBoard page="CreateCustomizedPackage" /></Grid>
                    <Grid item xs={12}>
                        <Paper className={eventorg.paper}>
                            <Typography gutterBottom variant="h4" component="h2">
                                Create Custom Package
                            </Typography>
                            <form onSubmit={onSubmit}>
                                <br />
                                <Grid item xs={12} >
                                    <InputLabel id="demo-simple-select-helper-label">Select The Venu*</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Venue"
                                        name="venue"
                                        value={selectVenue}
                                        onChange={onSelectedVenue}
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
                                <Grid item xs={12} >

                                    <TextField
                                        variant="outlined"
                                        id="datetime-local"
                                        fullWidth
                                        required
                                        name="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        label="Select Evenet Date"
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                        className={eventorg.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
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
                                >
                                    Cancel
                                </Button>
                                <br /><br />
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div >
        </div >
    )
}
export default CreateCustomizedPackage;