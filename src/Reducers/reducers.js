import {SET_ID} from "../action-types";

const intialState = {
    id: 1
};

function reducer (state = intialState, action){
    switch(action.type){
        case SET_ID:
            return{
                ...state,
                id: action.payload
            }
default:
    return state;
}
}
export default reducer;