import {Meteor} from 'meteor/meteor';
import {ProductsData} from '../imports/collection';



Meteor.methods({
	'account.toggleLike' (userId, prodId) {
		const likeList = Meteor.user().profile.favorite;
		if(likeList.indexOf(prodId) >= 0){
			likeList.splice(likeList.indexOf(prodId),1);
		}else{
			likeList.splice(0,0,prodId);
		}
		return Meteor.users.update(userId, {$set: {"profile.favorite": likeList}});
	},

	'product.create'(product){
		const products = ProductsData.insert(product);
		return products;
	},

	'product.toggleLike'(userId, prodId) {
		const {likeBy,likeLength} = ProductsData.findOne({_id:prodId});
		if(likeBy.indexOf(userId) >= 0){
			likeBy.splice(likeBy.indexOf(userId),1);
			length = likeLength-1;
		}else{
			likeBy.splice(0,0,userId);
			length = likeLength+1;
		}
		return ProductsData.update(prodId, {$set: {likeBy: likeBy,likeLength:length}});
	},

	'product.addComment'(prodId,comment) {
		return ProductsData.update({
			_id:prodId
		},{
			$push:{
				"comments":comment
			}
		});
	},
	
	'product.buyProduct'(userId,prodId) {
		const buyList = Meteor.user().profile.buyList;
		const obj = buyList.filter( function(product) {
			return product.id==prodId;
		});
		if(obj.length==0){
			buyList.splice(0,0,{id:prodId,count:1});
		}else{
			obj[0].count++;
		}
		
		return Meteor.users.update(userId, {$set: {"profile.buyList": buyList}});
	},

	'buyList.deleteProduct'(userId,prodId) {
		const buyList = Meteor.user().profile.buyList;
		const newBuyList = buyList.filter((obj) => {
			return obj.id!=prodId;
		});
		return Meteor.users.update(userId, {$set: {"profile.buyList": newBuyList}});
	},

	'buyList.deleteAllProduct'(userId) {
		return Meteor.users.update(userId, {$set: {"profile.buyList": []}});
	},
});