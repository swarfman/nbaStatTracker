import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { connect } from "react-redux";
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    container: {
        spacing: 3
    },
    root: {
        width: "300px",
        maxHeight: 450,
        textAlign: "center",
        justifyContent: "center",
        border: "2px solid #778899",
        // boxShadow: "1px 1px 1px 1px",
       // borderRadius: "5px",
        backgroundColor: "#F5F5F5"
      },
      title:{
          fontSize: "14px",
          overflow: 'hidden',
          textOverflow: "ellipsis"
      },
      media: {
        height: 250,
        width: "100%"
      },
      description:{
          fontSize: "10px",
          overflow: 'hidden',
          textOverflow: "ellipsis"
      }
  }));

function NewsFeed (props){
    const classes = useStyles();
    const [newsData, setNewsData] = React.useState();
    const [navButton, setNavButton] = React.useState(false);
    var uniqid = require('uniqid');

    const CreateCards = () =>{
        let singleElements = [];
        let finalElements = [];

        for (let i=0; i<=newsData.length-1;i++){
            singleElements.push(<Grid item xs ={4}>
                 <Card className={classes.root}>
                    <a href={newsData[i].url} target="_blank"  rel="noopener noreferrer">
                    <CardMedia
                        className={classes.media}
                        image={newsData[i].image}
                        title="google-news"
                    />
                    </a>
                    <CardHeader
                    classes={{title: classes.title}}
                    title={newsData[i].title}
                    />
                <CardContent className={classes.description}>
                  <Typography noWrap >{newsData[i].description}</Typography>
                </CardContent>  
              </Card>
              </Grid>
            )
        }

        let firstSlide = [];
        let secondSlide =[];
        let thirdSlide = [];

        for (let k=0;k<=singleElements.length-1;k++){
            if (k<3){
                firstSlide.push(singleElements[k]);
            }
            if (k<6 && k>2){
                secondSlide.push(singleElements[k]);

            }
            if (k<9 && k>5){
                thirdSlide.push(singleElements[k]);
            }
        }

        finalElements.push(<Grid container spacing={1}>{firstSlide}</Grid>);
        finalElements.push(<Grid container spacing={1}>{secondSlide}</Grid>);
        finalElements.push(<Grid container spacing={1}>{thirdSlide}</Grid>);
        console.log(finalElements);
        return finalElements;

        

    };

  useEffect(() =>{
    //Write function to execute on component render.
    console.log(props.id, props.teamName);
    setNavButton(false);
    async function getNews(){
        try{
           return await fetch("https://gnews.io/api/v3/search?q="+props.teamName+"&token=8713a511b4dbd0bb09c6db7e5605f356").then(result =>{
            let googleNews = result.json();
            return googleNews;
           }).then (result =>{
               console.log(result.articles);
               setNewsData(result.articles);
           })

          }
          catch{
            // console.log("error");
          }
    }
    getNews();
  }, [props.id]);


  const checkItems = (nextItem, activeItem) =>{
    //  console.log(nextItem);
      if (nextItem===2){
          setNavButton(true);
          console.log("Nothing Left!")
      }
  }



  return(
    <div>
        <div>
            <Carousel
            key={uniqid()}
            next={(next, active) => checkItems(next, active)}             
            autoPlay= {false}
            animation= "fade"
            indicators= {false}
            timeout= {500}
            navButtonsAlwaysVisible= {false}
            navButtonsAlwaysInvisible= {navButton}
            style={{height: "320"}}>
        {
            newsData ? 
            CreateCards():
            "Please select team to view news."
        }
            </Carousel>
        </div>
    </div>
)
}
const mapStateToProps = state =>{
    return{
      id: state.id,
      teamName: state.teamName
    }
  }
const wrapperFunction = connect(mapStateToProps);
export default wrapperFunction(NewsFeed);