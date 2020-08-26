import React, { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NBAServices from "../../Services/nbaServices";
import "./navbar.css";
import { SET_ID } from '../../action-types';

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



export default function Navbar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [teamName, setTeamName] = React.useState();
  const [logo, setLogo] = React.useState();
  const [allTeams, setAllTeams] = React.useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    let indexOfSliceCharacter = event.target.innerHTML.indexOf("<");
    let finalString = event.target.innerHTML.substring(0, indexOfSliceCharacter);
    dispatch({type: SET_ID, payload: event.target.id});
    updateTeam(event.target.id);
  };

 const updateTeam = async (id) =>{
     try{
      let result = await NBAServices.getTeamLogo(id).then(result =>{
        let logoURL = result.data.api.teams[0].logo;
        setLogo(<div style={{height: "20"}}><img style={{height: "20%", width: "20%"}} alt="team-logo" src={logoURL} /></div>);
      });
    }
    catch{
     // console.log("error");
    }
 }

 const createMenuItems = (teamObject) =>{
    return <MenuItem onClick={handleClose} id={teamObject.teamId} value={teamObject.fullName}>{teamObject.fullName}</MenuItem>
 }

  useEffect(() => {
    // Will need to make a call to the api here that updates 
    //the logo and team. And then I need to update a global variable 
    //with the newly selected team, which will work with a useEffect in the
    //the table component to update the table and then update the news module

    async function getTeams(){
      let displayedTeamNames = [];
      try{
        let result = await NBAServices.getTeams().then(result =>{
          let teams = result.data.api.teams;
          for (let i=0;i<=teams.length-1; i++){
            let menuItem = createMenuItems(teams[i]);
            displayedTeamNames.push(menuItem);
          }
          setAllTeams(displayedTeamNames);
        })
      }
      catch{
       // console.log("error");
      }
    }
    getTeams();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#4B0082', marginBottom: "10px" }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon onClick={handleClick} />
              <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              >
              {allTeams}
              </Menu>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          {logo ? logo: "Your Team's "} News and Stats
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}