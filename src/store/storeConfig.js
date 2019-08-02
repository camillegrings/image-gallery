import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/user'
import postReducer from './reducers/posts'
import messageReducer from './reducers/message'

const reducers = combineReducers({
    user: userReducer,
    posts: postReducer,
    message: messageReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig