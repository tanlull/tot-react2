// Reducer
import {GET_PROFILE} from "../actions/actions"

const initState = {
   profile : null
}

const authReducer  = (state = initState,action ) => {
    switch(action.type){
        case GET_PROFILE:
            return {
                profile: action.payload.profile
            }
        default:
            return state;
    }    
}

export default authReducer;


