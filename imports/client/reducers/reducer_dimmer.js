import {ACTIVE_DIMMER,HIDE_DIMMER}　from '../actions/cart-action';

const INITIAL_STATE = false;

export default function(state=INITIAL_STATE , action) {
	switch(action.type) {
		case ACTIVE_DIMMER:
			return action.payload;
		case HIDE_DIMMER:
			return action.payload;
		default:
			return state;
	}
}