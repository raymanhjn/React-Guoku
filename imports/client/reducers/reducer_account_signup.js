const INITIAL_STATE = null;

import {SIGNUP_SUCCESS,SIGNUP_ERROR} from '../actions/account-action';

export default function(state = INITIAL_STATE,action){
	switch(action.type){
		case SIGNUP_SUCCESS:
			return action.payload;
		case SIGNUP_ERROR:
			return action.payload;
		default:
			return state;
	}
}