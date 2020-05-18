import authReducer from './auth';
import eventReducer from './event';
import {reducer as toastrReducer} from 'react-redux-toastr';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer=combineReducers({
    auth:authReducer,
    event:eventReducer,
    toastr:toastrReducer
});
const persistConfig={
    key:'root',
    storage,
    whitelist:['event','auth','toastr']
}

export  default persistReducer(persistConfig,rootReducer);