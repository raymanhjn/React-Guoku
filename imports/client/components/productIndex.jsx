import React,{Component} from 'react';
import {connect} from 'react-redux';

import {activeItem,hideHeader} from '../actions/header-action';
import {getProducts} from '../actions/product-action';

class ProductIndex extends Component {
	componentWillMount() {
		this.props.activeItem(2);
	}

	render() {
		return (
			<div className='ui main container'>
				{this.props.children}
			</div>
		);
	}
}


export default connect(null,{activeItem,hideHeader})(ProductIndex);