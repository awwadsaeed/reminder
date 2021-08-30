import { createStore,combineReducers } from "redux";
import dayReducer from "./days";
import taskReducer from "./tasks";
const reducers = combineReducers({day:dayReducer,tasks:taskReducer})
function store(){
    return createStore(reducers)
}

export default store();