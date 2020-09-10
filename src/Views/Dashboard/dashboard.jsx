import React, {useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Table from '../../Components/Table/table.jsx';
import NewsFeed from '../../Components/News/newsFeed';
import NBAServices from "../../Services/nbaServices";
import { connect } from "react-redux";
import './dashboard.css'


const useStyles = makeStyles((theme) => ({
  root: {
      marginLeft: 10,
    },
    newsfeedContainer:{
     // height: "320px"
    }
}));

function Dashboard(props) {
  const [teamData, setTeamData] = React.useState();
  const classes = useStyles();

  const getPlayer = async (result) =>{
    let playerArray = [];
    let providedArray = result.data.api.players;
    console.log(providedArray);
    for (let i=0;i<=providedArray.length-1;i++){
      if (!providedArray[i].leagues.standard){
        i++;
      }
        else if (providedArray[i].leagues.standard.active == "1"){
          let playerObject = {};
          playerObject.name = providedArray[i].firstName+" "+providedArray[i].lastName;
          let playerId = providedArray[i].playerId;
          let player = await NBAServices.getPlayerStats(playerId);
    
          let totalPoints = 0;
          let totalRebounds = 0;
          let totalAssists = 0;
          let totalGames=0;
          let totalSteals=0;
          let totalBlocks = 0;
          let totalFouls = 0;
          let totalFieldGoals = 0
          let totalMadeFieldGoals = 0;
          let totalThreePointAttempts = 0;
          let totalMadeThreePointers = 0;
          
    
          let statsArray = player.data.api.statistics;
    
          for (let k=0; k<=statsArray.length-1; k++){
            if (statsArray[k].points){
              totalGames += 1
              totalPoints += parseInt(statsArray[k].points);
            }
            if (statsArray[k].totReb){
              totalRebounds += parseInt(statsArray[k].totReb);
            }
            if (statsArray[k].assists){
              totalAssists += parseInt(statsArray[k].assists);
            }
            if (statsArray[k].steals){
              totalSteals += parseInt(statsArray[k].steals);
            }
            if (statsArray[k].blocks){
              totalBlocks += parseInt(statsArray[k].blocks);
            }
            if (statsArray[k].pFouls){
              totalFouls += parseInt(statsArray[k].pFouls);
            }
            if (statsArray[k].fga){
              totalFieldGoals += parseInt(statsArray[k].fga);
            }
            if (statsArray[k].fgm){
              totalMadeFieldGoals += parseInt(statsArray[k].fgm);
            }
            if (statsArray[k].tpa){
              totalThreePointAttempts += parseInt(statsArray[k].tpa);
            }
            if (statsArray[k].tpm){
              totalMadeThreePointers += parseInt(statsArray[k].tpm);
            }
          }
          let pointsPerGame = totalPoints/totalGames;
          playerObject.points = pointsPerGame.toFixed(2);
    
          let rebsPerGame = totalRebounds/totalGames;
          playerObject.rebounds = rebsPerGame.toFixed(2);
    
          let assistsPerGame = totalAssists/totalGames;
          playerObject.assists = assistsPerGame.toFixed(2);
    
          let stealsPerGame = totalSteals/totalGames;
          playerObject.steals = stealsPerGame.toFixed(2);
    
          let blocksPerGame = totalBlocks/totalGames;
          playerObject.blocks = blocksPerGame.toFixed(2);
    
          let foulsPerGame = totalFouls/totalGames;
          playerObject.fouls = foulsPerGame.toFixed(2);
    
          let fieldGoalPercentage = totalMadeFieldGoals/totalFieldGoals * 100;
          playerObject.fieldGoalPercentage = fieldGoalPercentage.toFixed(2);
    
          let threePointPercentage = totalMadeThreePointers/totalThreePointAttempts * 100;
          playerObject.threePointPercentage = threePointPercentage.toFixed(2);
          playerArray.push(playerObject);
  
        }  
        else{
          i++;
        }

  }
      setTeamData(playerArray);
}

  useEffect(() => {
    async function getTeamData(){
      try{
        let result = await NBAServices.getTeam(props.id).then(result =>{
         // console.log(result);
          getPlayer(result);
        })
      }
      catch{
       // console.log("error");
      }
    }
    getTeamData();
    

  }, [props.id]);

  return (
    <Grid spacing={2} className={classes.root}>
      <Grid item xs={12}>
      <h1 style={{color: "white", paddingLeft: "10"}}>Stats</h1>
      </Grid>
    <Grid item xs={12} className='container'>
      <Card>
        <CardContent>
          <Table data={teamData} />
        </CardContent>  
      </Card>
      </Grid>
      <Grid item xs={12}>
      <h1 style={{color: "white", paddingLeft: "10"}}>News</h1>
      </Grid>
      <Grid item xs={12} className="container">
      <Card className = {classes.newsfeedContainer}>
        <CardContent>
          <NewsFeed  />
        </CardContent>  
      </Card>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state =>{
  return{
    id: state.id
  }
}

const wrapperFunction = connect(mapStateToProps);

export default wrapperFunction(Dashboard);
