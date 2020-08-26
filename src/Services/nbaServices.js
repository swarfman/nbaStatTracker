import axios from "axios";

var instance = axios.create({
    baseURL: "https://api-nba-v1.p.rapidapi.com/"
});

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
export default {
    getTeam: getTeam,
    getPlayerStats: getPlayerStats,
    getTeams: getTeams,
    getTeamLogo: getTeamLogo
}