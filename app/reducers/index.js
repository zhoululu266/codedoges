import {combineReducers} from 'redux'
import userinfo from './userinfo'
import movies from './movie'

const rootReducer = combineReducers({userinfo, movies})

export default rootReducer
