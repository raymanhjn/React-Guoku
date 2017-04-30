export const HIDE_DIMMER = 'HIDE_DIMMER';
export const ACTIVE_DIMMER = 'ACTIVE_DIMMER';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_ALL_PRODUCT = 'DELETE_ALL_PRODUCT';

export function activeDimmer() {
	return {
		type:ACTIVE_DIMMER,
		payload:true
	}
}

export function hideDimmer() {
	return {
		type:HIDE_DIMMER,
		payload:false
	}
}

function deleteAction(prodId) {
	return {
		type:DELETE_PRODUCT,
		payload:prodId
	}
}

function deleteAllAction() {
	return {
		type:DELETE_ALL_PRODUCT,
		payload:[]
	}
}

export function deleteProduct(userId,prodId) {
	return dispatch => {
		Meteor.call('buyList.deleteProduct',userId,prodId);
		dispatch(deleteAction(prodId));
	}
}

export function deleteAllProduct(userId) {
	return dispatch => {
		Meteor.call('buyList.deleteAllProduct',userId);
		dispatch(deleteAllAction());
	}
}