import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import {productListReducer, productDetailsReducer} from './reducers/productReducer';
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";

const initialState = {};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})
const composeEnhancers = (window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ )|| compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)))
export default store;