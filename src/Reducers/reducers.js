import {SET_ID, SET_BG_COLOR} from "../action-types";

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
            case SET_BG_COLOR:
                return{
                    ...state,
                    bgColor: action.payload
                }
default:
    return state;
}
}
export default reducer;