import { GET_CAT, LOADING,  GET_ERROR } from '../actions/actions'

const initState = {
    category: [],
    loading: true,
    errorMessage: ''
}

const catReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ERROR: 
        return {
            ...state,
            errorMessage: action.errorMessage
        }
        case LOADING: 
        return {
            ...state,
            loading: action.loading
        }
        case GET_CAT:
            return {
                ...state,
                category: action.payload.category
        }
        default:
            return state;
    }
}

export default catReducer;