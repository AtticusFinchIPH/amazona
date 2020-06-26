import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import {productListReducer, productDetailsReducer} from './reducers/productReducer';
import thunk from "redux-thunk";

const initialState = {};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
})
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
export default store;