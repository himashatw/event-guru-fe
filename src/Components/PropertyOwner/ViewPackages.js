import React, { useEffect, useState } from "react";
import SlideShow from "./SlideShow";
import SideBar from "../PropertyOwner/SideBar";
import axios from "../../Services/axios";
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CakeIcon from '@material-ui/icons/Cake';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import AllInboxIcon from '@material-ui/icons/AllInbox';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function ViewPackages() {
  const classes = useStyles();
  const [packagesList, setPackagesList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("/propertyOwner/packages")
        .then((response) => {
          console.log(response.data.result);
          setPackagesList(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  const handListAllItemClick  = async()=>{
    await axios
     .get("/propertyOwner/packages")
      .then((response) => {
        console.log(response.data.result);
        setPackagesList([])
        setPackagesList(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleListWedItemClick  = async()=>{
        await axios
          .get("/propertyOwner/packages/weddings")
          .then((response) => {
            console.log(response.data.result);
            setPackagesList([])
            setPackagesList(response.data.result);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  const handleListPartyItemClick  = async()=>{
        await axios
          .get("/propertyOwner/packages/party")
          .then((response) => {
            console.log(response.data.result);
            setPackagesList([])
            setPackagesList(response.data.result);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  const handleListConItemClick  = async()=>{
        await axios
          .get("/propertyOwner/packages/concert")
          .then((response) => {
            console.log(response.data.result);
            setPackagesList([])
            setPackagesList(response.data.result);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  const handleListOtherItemClick  = async()=>{
        await axios
          .get("/propertyOwner/packages/other")
          .then((response) => {
            console.log(response.data.result);
            setPackagesList([])
            setPackagesList(response.data.result);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
      };
  return (
    <div>
<div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Added Packages
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
        <ListItem 
        button 
        selected={selectedIndex === 1}
        onClick={(event)=>{
          handListAllItemClick()
          handleListItemClick(event, 1)}}>
            <ListItemIcon>
            <AllInboxIcon />
            </ListItemIcon>
              <ListItemText primary="All Packages"/>
            </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem 
        button 
        selected={selectedIndex === 2}
        onClick={(event)=>{
          handleListWedItemClick()
          handleListItemClick(event, 2)}}>
            <ListItemIcon>
            <LocalBarIcon />
            </ListItemIcon>
              <ListItemText primary="Wedding"/>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem 
            button
            selected={selectedIndex === 3}
            onClick={(event)=>{
              handleListPartyItemClick()
              handleListItemClick(event, 3)}}>
            <ListItemIcon>
            <CakeIcon />
            </ListItemIcon>
              <ListItemText primary="Party"/>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem 
            button
            selected={selectedIndex === 4}
            onClick={(event)=>{
                handleListConItemClick()
                handleListItemClick(event, 4)}}>
            <ListItemIcon>
            <AudiotrackIcon />
            </ListItemIcon>
              <ListItemText primary="Concert"/>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem 
            button
            selected={selectedIndex === 5}
            onClick={(event)=>{
              handleListOtherItemClick()
              handleListItemClick(event, 5)}}>
            <ListItemIcon>
              <BeachAccessIcon />
              </ListItemIcon>
              <ListItemText primary="Other"/>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
    <div className="grid grid-cols-4 gap-4 m-3 mt-10 content-center ">
      <div className="col-span-1  ml-6">
        {/* <div className="flex flex-col justify-evenly ">
          <button className="mt-10">Wedding</button>
          <button className="mt-10">Party</button>
          <button className="mt-10">Concert</button>
          <button className="mt-10">Other</button>
        </div> */}
      </div>
      <div className="col-span-3 border-4 border-black-900 mr-10 items-center">
        <div className="mt-12">
          {packagesList.length !== 0 && <SlideShow data={packagesList} />}
        </div>
      </div>
    </div>
    </div>
  );
}

export default ViewPackages;
