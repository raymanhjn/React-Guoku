import React from 'react';
import {Route,IndexRoute} from 'react-router';

import App from './client/components/app';
import Index from './client/containers/index';
// user containers
import UserIndex from './client/components/userIndex';
import Login from './client/containers/login';
import Signup from './client/containers/signup';
import UserProfile from './client/containers/profile';
//product containers
import ProductIndex from './client/components/productIndex';
import Products from './client/containers/products';
import ProductDetail from './client/containers/product-detail';
import AddProduct from './client/containers/product-create';
//article containers
import Articles from './client/containers/articles';
// 404 error
import NotFound from './client/components/not-found';

export default (

	<Route path='/' component={App} >
		<IndexRoute component={Index} />
		<Route path='user' component={UserIndex}>
			<Route path='login' component={Login} />
			<Route path='signup' component={Signup} />
			<Route path=':userId' component={UserProfile} />
		</Route>
		<Route path='products' component={ProductIndex}>
			<IndexRoute component={Products} />
			<Route path='create' component={AddProduct} />
			<Route path=':prodId' component={ProductDetail} />
		</Route>
		<Route path='articles' component={Articles} />
		<Route path="*" component={ NotFound } />
	</Route>

);
