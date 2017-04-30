import React,{Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import moment from 'moment';

import {toggleLike} from '../actions/product-action';

class ProductCard extends Component {
	handleLike(prodId) {
		if(!Meteor.user()){
			browserHistory.push('/user/login');
		}else{
			this.props.toggleLike(Meteor.userId(),prodId);
		}
	}

	renderLikeIcon() {
		return (Meteor.user() && this.props.product.likeBy.indexOf(Meteor.userId()) >=0)?<i className="heart icon"></i>:<i className="empty heart icon"></i>
	}

	render() {
		const {_id,name,brand,price,likeBy,comments,photo,createAt} = this.props.product;
		return (
			<div className='four wide column'>
				<div className="ui card">
				  <Link className="image" to={`/products/${_id}`}>
				    <img src={photo} alt='290*290'/>
				  </Link>
				  <div className="content">
				    <div className="header">{name}</div>
				    <div className="meta">
				      <span className="date">{brand}</span>
				    </div>
				    <div className="description">
				      $ {price}
				    </div>
				  </div>
				  <div className="extra content">
				      <span className="right floated">
				        Post {moment(createAt).fromNow()}
				      </span>
				      <span>
				        <a className='left floated' onClick={this.handleLike.bind(this,_id)}>
					      {this.renderLikeIcon()}{likeBy.length}
					    </a>
					    <span className='left floated'>
					      <i className="comment outline icon"></i>{comments.length}
					    </span>
				      </span>
				    </div>
				</div>
			</div>
		);
	}
}

export default connect(null,{toggleLike})(ProductCard);