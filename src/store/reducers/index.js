import authReducer from './auth';
import eventReducer from './event';
import {reducer as toastrReducer} from 'react-redux-toastr';
import {combineReducers} from 'redux';

const rootReducer=combineReducers({
    auth:authReducer,
    event:eventReducer,
    toastr:toastrReducer
});


export  default rootReducer;