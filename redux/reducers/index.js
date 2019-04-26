
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer';
import catReducer from './catReducer'

const rootReducer = combineReducers({
    authReducer,
    catReducer,
    form: formReducer
});

export default rootReducer