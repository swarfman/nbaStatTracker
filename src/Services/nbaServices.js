import axios from "axios";

var instance = axios.create({
    baseURL: "https://api-nba-v1.p.rapidapi.com/"
});

var newsInstance = axios.create({
    baseURL: 'http://newsapi.org/v2'
});


////    return instance.get("/standings/standard/2019", {
const getTeams = (headerData) =>{
    return instance.get("/teams/league/standard", {
        headers: {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "2d726651f6mshdf6dc3621a99043p1e46e9jsnb86bebf3fd08",
            "useQueryString": true
        }
    })
}

const getTeam = (data) =>{
    return instance.get("/players/teamId/"+data, {
        headers: {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "2d726651f6mshdf6dc3621a99043p1e46e9jsnb86bebf3fd08",
            "useQueryString": true
        }
    })
}

const getTeamLogo = (data) =>{
    return instance.get("/teams/teamId/"+data, {
        headers: {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "2d726651f6mshdf6dc3621a99043p1e46e9jsnb86bebf3fd08",
            "useQueryString": true
        }
    })
}


const getPlayerStats = (data) =>{
    return instance.get("statistics/players/playerId/"+data, {
        headers: {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "2d726651f6mshdf6dc3621a99043p1e46e9jsnb86bebf3fd08",
            "useQueryString": true
        }
    })
}

const formatDate = () =>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}


const getTeamNews = (data) =>{
    return newsInstance.get("/everything?q="+data+"&from="+formatDate()+"&sortBy=popularity&apiKey=8b08d0e5e5d84a7b8a7ce2d6af5a9922", {
    })
};


export default {
    getTeam: getTeam,
    getPlayerStats: getPlayerStats,
    getTeams: getTeams,
    getTeamLogo: getTeamLogo,
    getTeamNews:getTeamNews
}