const INITIAL_STATE = {
	activeItem: 1,
	hidden:false
};

import {HEADER_ITEM,HEADER_HIDDEN} from '../actions/header-action';

export default function(state = INITIAL_STATE,action){
	switch(action.type){
		case HEADER_ITEM:
			return {...state,activeItem:action.payload};
		case HEADER_HIDDEN:
			return {...state,hidden:action.payload};
		default:
			return state;
	}
}