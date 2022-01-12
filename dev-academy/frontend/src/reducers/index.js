import { combineReducers } from "redux"


import authReducer from "./login"
import userReducer from "./user"

const allReducers = combineReducers({authReducer, userReducer })

export default allReducers

