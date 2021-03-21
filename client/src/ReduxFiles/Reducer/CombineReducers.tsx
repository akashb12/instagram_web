import { combineReducers } from 'redux';
import mainReducer from './UserReducer';

const rootReducer = combineReducers({
    mainReducer
});

export default rootReducer;