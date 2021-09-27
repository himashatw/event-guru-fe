import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import CakeIcon from '@material-ui/icons/Cake';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import LocalBarIcon from '@material-ui/icons/LocalBar';

export const mainListItems = (
    <div>
        <ListItem button onClick={(event) => {
            event.preventDefault();
            window.location = `/eventorganizer/latestoffers`;
        }}>
            <ListItemIcon>
                <NewReleasesIcon />
            </ListItemIcon>
            <ListItemText primary="Latest Offers" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Offer Types</ListSubheader>
        <ListItem button onClick={(event) => {
            event.preventDefault();
            window.location = `/eventorganizer/wedding`;
        }}>
            <ListItemIcon>
                <LocalBarIcon />
            </ListItemIcon>
            <ListItemText primary="Wedding" />
        </ListItem>
        <ListItem button onClick={(event) => {
            event.preventDefault();
            window.location = `/eventorganizer/partyoffers`;
        }}>
            <ListItemIcon>
                <CakeIcon />
            </ListItemIcon>
            <ListItemText primary="Party" />
        </ListItem>
        <ListItem button onClick={(event) => {
            event.preventDefault();
            window.location = `/eventorganizer/showoffers`;
        }}>
            <ListItemIcon>
                <AudiotrackIcon />
            </ListItemIcon>
            <ListItemText primary="Concert" />
        </ListItem>
        <ListItem button onClick={(event) => {
            event.preventDefault();
            window.location = `/eventorganizer/otherOffers`;
        }}>
            <ListItemIcon>
                <BeachAccessIcon />
            </ListItemIcon>
            <ListItemText primary="Other" />
        </ListItem>
    </div>
);