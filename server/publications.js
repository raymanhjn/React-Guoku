import {ProductsData} from '../imports/collection';

Meteor.publish('getProducts', function() {
	return ProductsData.find({});    
});

Meteor.publish('getOneProduct', function(prodId) {
	return ProductsData.find({_id:prodId});    
});

Meteor.publish('getUserProfile',function() {
	return Meteor.users.find({},{fields:{profile:1,buyList:1}});
});