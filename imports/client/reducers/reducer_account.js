const INITIAL_STATE = {
	id:null,
	profile:null,
	error_message:null
};

import {LOGIN_SUCCESS,LOGIN_ERROR,LOG_OUT} from '../actions/account-action';

export default function(state = INITIAL_STATE,action){
	switch(action.type){
		case LOGIN_SUCCESS:
			return action.payload;
		case LOGIN_ERROR:
			return action.payload;
		case LOG_OUT:
			return action.payload;
		default:
			return state;
	}
}