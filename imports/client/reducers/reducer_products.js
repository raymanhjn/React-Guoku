import {GET_PRODUCT} from '../actions/product-action';

const INITIAL_STATE = [];

export default function(state=INITIAL_STATE , action) {
	switch(action.type){
		case GET_PRODUCT:
			return action.payload;
		default:
			return state;
	}
}