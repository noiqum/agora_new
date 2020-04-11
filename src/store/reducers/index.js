import authReducer from './auth';
import eventReducer from './event';

import {combineReducers} from 'redux';

const rootReducer=combineReducers({
    auth:authReducer,
    event:eventReducer,

});


export  default rootReducer;