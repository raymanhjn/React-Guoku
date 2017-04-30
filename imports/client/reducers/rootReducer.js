import {combineReducers} from 'redux';
import AccountReducer from './reducer_account';
import AccountSignupReducer from './reducer_account_signup';
import HeaderReducer from './reducer_header';
import CartReducer from './reducer_buyCart';
import ProductReducer from './reducer_products';
import DimmerReducer from './reducer_dimmer';
import createPropsReducer from './reducer_createProps';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	user:AccountReducer,
	usersignup:AccountSignupReducer,
	headerState:HeaderReducer,
	form: formReducer,
	buyCart:CartReducer,
	products:ProductReducer,
	dimmer:DimmerReducer,
	createProps:createPropsReducer,
});

export default rootReducer;