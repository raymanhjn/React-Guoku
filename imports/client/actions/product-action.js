import {Meteor} from 'meteor/meteor';
import {ProductsData} from '../../collection';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const BUY_PRODUCT = 'BUY_PRODUCT';

export const GET_PRODUCT = 'GET_PRODUCT';
export const SET_BRAND = 'SET_BRAND';
export const CLEAN_BRAND = 'CLEAN_BRAND';


export function createProduct(product) {
	product.likeBy=[];
	product.likeLength=0;
	product.comments=[];
	product.createAt=new Date();
	return () => {
		Meteor.call('product.create',product);
	}
}

export function toggleLike(userId,prodId) {
	return () => {
		Meteor.call('product.toggleLike',userId,prodId);
		Meteor.call('account.toggleLike',userId,prodId);
	}
}

export function addComment(prodId,comment) {
	return () => {
		Meteor.call('product.addComment',prodId,comment);
	}
}

function buyAction(prodId) {
	return {
		type:BUY_PRODUCT,
		payload:prodId
	};
}

export function buyProduct(userId,prodId) {
	return dispatch => {
		Meteor.call('product.buyProduct',userId,prodId);
		dispatch(buyAction(prodId));
	}
}

export function getProducts(category) {
	Meteor.subscribe('getProducts');
	const products = category!==''?
		ProductsData.find({brand:category},{sort:{ createAt: -1 }}).fetch():
		ProductsData.find({},{sort:{ createAt: -1 }}).fetch();
	return {
		type:GET_PRODUCT,
		payload:products
	};
}

export function set_brand(brand) {
	return {
		type:SET_BRAND,
		payload:brand
	};
}

export function clean_brand() {
	return {
		type:CLEAN_BRAND,
		payload:'health'
	};
}
