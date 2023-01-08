import { combineReducers } from 'redux'
import user from '../components/Authenticate/reducer'

const rootReducer = combineReducers({
    user
})


export default rootReducer