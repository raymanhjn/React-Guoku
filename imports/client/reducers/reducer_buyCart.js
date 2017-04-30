const INITIAL_STATE = [];

import {LOGIN_SUCCESS,LOG_OUT} from '../actions/account-action';
import {BUY_PRODUCT} from '../actions/product-action';
import {DELETE_PRODUCT,DELETE_ALL_PRODUCT} from '../actions/cart-action';

export default function(state = INITIAL_STATE,action){
	switch(action.type){
		case LOGIN_SUCCESS:
			const list=Array.from( action.payload.profile.buyList,x => x.id );
			return list;
		case LOG_OUT:
			return [];
		case BUY_PRODUCT:
			if(state.indexOf(action.payload) == -1){
				return [...state,action.payload];
			}else{
				return state;
			}
		case DELETE_PRODUCT:
			const index=state.indexOf(action.payload);
			state.splice(index,1);
			return state;
		case DELETE_ALL_PRODUCT:
			return [];
		default:
			return state;
	}
}