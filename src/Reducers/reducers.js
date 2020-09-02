import {SET_ID} from "../action-types";

const intialState = {
    id: 1,
    teamName: ""
};

function reducer (state = intialState, action){
    switch(action.type){
        case SET_ID:
            return{
                ...state,
                id: action.payload,
                teamName: action.teamName
            }
default:
    return state;
}
}
export default reducer;