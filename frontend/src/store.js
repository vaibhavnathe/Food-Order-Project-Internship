
import {legacy_createStore as createStore, 
    combineReducers, 
    applyMiddleware, 
    compose 
} from 'redux';

import thunk from 'redux-thunk';        // helps to run the data fetching (delayed work)
import { restaurantReducer } from './reducer/restaurantReducer';
import { menuReducer } from './reducer/menuReducer';
import { authReducer, forgotPasswordReducer, userReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';
import { myOrderReducer, newOrderReducer, orderDetailsReducer } from './reducer/orderReducer';

// create store -> just like array or object
// combineReducers -> to group the reducer
// applyMiddleware -> it is used to use any middleware
// compose -> to read the function from right to left

const reducer = combineReducers({
    restaurants : restaurantReducer,
    menus : menuReducer,
    auth : authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailsReducer
});

// helps us to connect the reactDevTools 
const composeenhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const store = createStore(reducer, 
    composeenhancers(applyMiddleware(...middleware))
);

export default store;