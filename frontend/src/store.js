import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import {productListReducer, productDetailsReducer} from './reducers/productReducer';
import thunk from "redux-thunk";
import Cookie from 'js-cookie';
import { cartReducer } from "./reducers/cartReducer";
import { userSigninReducer, userRegisterReducer } from "./reducers/userReducer";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {cart: {cartItems}, userSignin: {userInfo}};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer
})
const composeEnhancers = (window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ )|| compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)))
export default store;