import React,{Component} from 'react';
import {connect} from 'react-redux';
import {createContainer} from 'meteor/react-meteor-data';
import {Link} from 'react-router';

import {ProductsData} from '../../collection';
import LinkImage from '../widgets/link-img';


class UserProfile extends Component {
	renderFavorite() {
		return this.props.favortiteProducts.map((product) => {
			return (
				<div className='ui fluid image column'>
					<LinkImage url={`products/${product._id}`} image={product.photo} />					
				</div>
				);
		})
	}
	
	render() {
		const {avator,name}=this.props.user.profile;
		return (
			<div>
				<div className='ui grid'>
					<div className='four wide column'>
						<img className='profileAvator' src={avator}/>
					</div>
					<div className='twelve wide column'>
						<h2>{name}</h2>
					</div>
				</div>
				<div className='ui grid'>
					<div className='fourteen wide column secondary segment'>
						<div className='ui blue ribbon label'>
							<i className='heart icon'></i> Favorite Item
						</div>
						<div className='ui four column grid'>
							{this.renderFavorite()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default  createContainer( ({params}) => {
	Meteor.subscribe('getUserProfile');
	Meteor.subscribe('getProducts');
	const user = Meteor.users.findOne({_id:params.userId},{fields:{profile:1}});
	const favortiteProducts = ProductsData.find({_id:{$in:user.profile.favorite}});
	return {
		user: user,
		favortiteProducts: favortiteProducts.fetch()
	};
},UserProfile);