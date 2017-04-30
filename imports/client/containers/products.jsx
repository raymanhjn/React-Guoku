import React,{Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {connect} from 'react-redux';

import {ProductsData} from '../../collection';
import ProductCard from './product-card';
import {activeItem,hideHeader} from '../actions/header-action';
import {getProducts} from '../actions/product-action';


class Products extends Component{
	// componentWillMount() {
	// 	const {query} =this.props.location;
	// 	const category = (query&&query.category)?query.category:'';
	// 	this.props.getProducts(category);
	// }

	renderCard() {
		return this.props.products.map((product) => {
			return <ProductCard key={product._id} product={product}/>
		});
	}
	renderBreadcrumb(){
		let category = this.props.location.query.category;
		return category?(
			<div className="ui small breadcrumb">
				  <Link className="section" to='/products'>Products</Link>
				  <i className="right chevron icon divider"></i>
				  <div className="active section">{category}</div>
			</div>):'';
	}
	render() {
		return (
			<div>
				{this.renderBreadcrumb()}
				<div className='ui grid'>
					{this.renderCard()}
				</div>
			</div>
			
		);
	}
}
// function mapStateToProps({products}) {
// 	return {
// 		products
// 	}
// }
// export default connect(mapStateToProps,{getProducts})(Products);


export default createContainer( ({location:{query}})=>{
	const category = query&&query.category?query.category:''
	Meteor.subscribe('getProducts');
	const products = category?ProductsData.find({brand:category},{sort:{ createAt: -1 }}).fetch() : ProductsData.find({},{sort:{ createAt: -1 }}).fetch()
	return {		
		products: products
	};
},Products);
