import userops from './user.reducer'
import { combineReducers } from "redux";

const reducers = combineReducers({
    user: userops
})

export default reducers;