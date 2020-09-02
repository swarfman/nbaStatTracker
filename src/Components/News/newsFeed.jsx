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

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 945,
        padding: 3,
        marginBottom: 10,
        textAlign: "center",
        border: "2px solid #778899",
        boxShadow: "1px 1px 1px 1px",
        borderRadius: "5px"
      },
      media: {
        height: 0,
        width: "100%",
        paddingTop: '46.25%'
      }
  }));

function NewsFeed (props){
    const classes = useStyles();
    const [newsData, setNewsData] = React.useState("Select Team to View Team News");

    const createCards = (articles) =>{
        let articleArray = articles.articles;
        let finalElements = [];

        for (let i=0; i<=5;i++){
         //   console.log(articleArray[i]);

            finalElements.push(
                <Card className={classes.root}>
                    <CardHeader
                    title={articleArray[i].title}
                    />
                    <a href={articleArray[i].url} target="_blank"  rel="noopener noreferrer">
                    <CardMedia
                        className={classes.media}
                        image={articleArray[i].image} />
                    </a>
                <CardContent>
                  <p>{articleArray[i].description}</p>
                </CardContent>  
              </Card>
            )
        }
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
               setNewsData(createCards(result));
           })

          }
          catch{
            // console.log("error");
          }
    }
    getNews();
  }, [props.id]);


  return(
    <div>{newsData}</div>
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