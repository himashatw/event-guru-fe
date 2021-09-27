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
import { Link } from "react-router-dom";

export const mainListItems = (
    <div>
        <Link to="/eventorganizer/latestoffers">
            <ListItem button>
                <ListItemIcon>
                    <NewReleasesIcon />
                </ListItemIcon>
                <ListItemText primary="Latest Offers" />
            </ListItem>
        </Link>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Offer Types</ListSubheader>
        <Link to="/eventorganizer/wedding">
            <ListItem button>
                <ListItemIcon>
                    <LocalBarIcon />
                </ListItemIcon>
                <ListItemText primary="Wedding" />
            </ListItem>
        </Link>
        <Link to="/eventorganizer/partyoffers">
            <ListItem button>
                <ListItemIcon>
                    <CakeIcon />
                </ListItemIcon>
                <ListItemText primary="Party" />
            </ListItem>
        </Link>
        <Link to="/eventorganizer/showoffers">
            <ListItem button >
                <ListItemIcon>
                    <AudiotrackIcon />
                </ListItemIcon>
                <ListItemText primary="Concert" />
            </ListItem>
        </Link>
        <Link to="/eventorganizer/otherOffers">
            <ListItem button>
                <ListItemIcon>
                    <BeachAccessIcon />
                </ListItemIcon>
                <ListItemText primary="Other" />
            </ListItem>
        </Link>
    </div>
);