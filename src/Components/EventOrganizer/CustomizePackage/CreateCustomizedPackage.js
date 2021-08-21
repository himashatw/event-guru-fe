import axios from '../../../Services/axios.js';
import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


const CreateCustomizedPackage = () => {

    const [venue, setVenue] = useState('');
    const [noOfParticipants, setNoOfParticipants] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [options, setOptions] = useState([]);


    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 1020,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    const handleChange = (event) => {
        setVenue(event.target.value);
    };
    const onSubmit = () => {

    }
    onSubmit();
    return (
        <div>
            <br /><br />
            <form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Select The Venue</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Last Name"
                                value={venue}
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Coldddddddddddddddddddddddddddddddomo</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"

                >
                    Submit
                </Button>

            </form>
        </div>
    )

}
export default CreateCustomizedPackage;