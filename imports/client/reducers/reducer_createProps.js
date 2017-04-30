import {DROP_IMAGE,CLEAN_DROP_IMAGE} from '../actions/account-action';
import {SET_BRAND,CLEAN_BRAND} from '../actions/product-action';

const INITIAL_STATE = {imageURL:'',brand:'Health'};

export default function(state=INITIAL_STATE , action) {
	switch(action.type){
		case DROP_IMAGE:
			return {...state,imageURL:action.payload};
		case CLEAN_DROP_IMAGE:
			return {...state,imageURL:action.payload};
		case SET_BRAND:
			return {...state,brand:action.payload};
		case CLEAN_BRAND:
			return {...state,brand:action.payload};
		default:
			return state;
	}
}