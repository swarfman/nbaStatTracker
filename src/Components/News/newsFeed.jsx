import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
        width: "400px",
        maxHeight: 460,
        textAlign: "center",
        justifyContent: "center",
        border: "2px solid #778899",
        boxShadow: "1px 1px 1px 1px",
        borderRadius: "5px",
        backgroundColor: "#F5F5F5"
      },
      title:{
          fontSize: "16px"
      },
      media: {
        height: 230,
        width: "100%",
        overflow: 'hidden'
       // paddingTop: '56.25%',
      },
      description:{
          fontSize: "14px"
      }
  }));

function NewsFeed (props){
    const classes = useStyles();
    const [newsData, setNewsData] = React.useState();

    const Item = (props) =>{
        return (
            <Paper>
                <h2>{props.item.name}</h2>
                <p>{props.item.description}</p>
            </Paper>
        )
    };

    const items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ];


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
                    className={classes.title}
                    title={newsData[i].title}
                    />
                <CardContent className={classes.description}>
                  <p>{newsData[i].description}</p>
                </CardContent>  
              </Card>
              </Grid>
            )
        }

        let firstSlide = [];
        let secondSlide =[];
        let thirdSlide = [];
        console.log(singleElements);
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

        finalElements.push(<Grid container spacing={0}>{firstSlide}</Grid>);
        finalElements.push(<Grid container spacing={0}>{secondSlide}</Grid>);
        finalElements.push(<Grid container spacing={0}>{thirdSlide}</Grid>);
        return finalElements;
        

    };

  useEffect(() =>{
    //Write function to execute on component render.
    console.log(props.id, props.teamName);

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




  return(
    <div>
        {/* <div>{newsData}</div> */}
        <div>
            <Carousel style={{height: "200"}}>
        {
            newsData ? 
            CreateCards():
            "Hello World"
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