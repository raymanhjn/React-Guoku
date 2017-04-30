import React,{Component} from 'react';
import {connect} from 'react-redux';
import {createContainer} from 'meteor/react-meteor-data';
import {ProductsData} from '../../collection';

import {deleteProduct} from '../actions/cart-action';

class Item extends Component {
	handleDelete() {
		this.props.deleteProduct(Meteor.userId(),this.props.productInfo._id);
	}

	render() {
		const {product:{count},productInfo} = this.props;
		return (
			<tr>
				<td>
					<h4 className="ui image header">
						<img className='ui avatar image' src={productInfo?productInfo.photo:''} />
						<a className="content">
							{productInfo?productInfo.name:''}
						</a>
					</h4>
				</td>
				<td>{count}</td>
				<td className='right aligned'>
					<button className="ui button" onClick={this.handleDelete.bind(this)} >
						<i className="trash icon"></i>
					</button>
				</td>
			</tr>
		);
	}
}

const ItemContainer = createContainer(({product}) => {
	Meteor.subscribe('getOneProduct',product.id);
	let productInfo = ProductsData.findOne({_id:product.id});
	return {
		productInfo,
	};
},Item);

export default connect(null,{deleteProduct})(ItemContainer);