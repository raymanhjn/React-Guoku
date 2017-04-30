import React,{Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Link,browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';


import {ProductsData} from '../../collection';
import Comment from '../components/comment';
import LikeList from '../components/like-list';
import {addComment,toggleLike,buyProduct} from '../actions/product-action';
import LinkImage from '../widgets/link-img';



class ProductDetail extends Component {
	handleCommentSubmit(event) {
		event.preventDefault();
		const noUser = {
			name: 'Guest',
			avator: 'http://semantic-ui.com/images/avatar/small/steve.jpg',
		};
		const user = Meteor.user()?Meteor.user().profile:noUser;
		const content = findDOMNode(this.refs.content).value.trim();
		const {prodId} =this.props.params;
		const comment = {
			createUser:user,
			content:content,
			createAt:new Date()
		};
		this.props.addComment(prodId , comment);
		findDOMNode(this.refs.content).value='';
	}

	renderComment() {
		return this.props.product.comments.map((comment) =>{
			return <Comment comment={comment}/>;
		})
	}

	renderLikeList() {
		return this.props.userProfiles.map((userProfile) =>{
			return <LikeList key={userProfile._id} userProfile={userProfile}/>;
		})
	}

	renderHotProducts() {
		return this.props.hotProducts.map((hotProduct) =>{
			return (
				<LinkImage key={hotProduct._id} url={`/products/${hotProduct._id}`} image={hotProduct.photo} />
			);
		})
	}

	renderSimilarProducts() {
		return this.props.similarProducts.map((similarProduct) =>{
			return (
				<LinkImage url={`/products/${similarProduct._id}`} image={similarProduct.photo} />
			);
		})
	}

	toggleLike() {
		if( !Meteor.user() ){
			browserHistory.push('/user/login');
		}else{
			this.props.toggleLike(Meteor.userId() , this.props.params.prodId );
		}
	}

	handleBuy() {
		if(!this.props.userId){
			browserHistory.push('/user/login');
		}else{
			const prodId = this.props.product._id;
			const userId = this.props.userId;
			this.props.buyProduct(userId,prodId);
		}
	}

	render() {
		const {userProfiles,product:{name,brand,description,comments,likeBy,createAt,price,photo}} = this.props;
		const like = Meteor.user() && this.props.product.likeBy.indexOf(Meteor.userId()) >=0;
		return (
			<div className='ui stackable grid'>
				<div className="ten wide column">
					<div className='ui secondary segment grid'>
						<div className="eight wide column">
				      		<img className='detail-img ui bordered' src={photo} />
				        </div>
				        <div className="eight wide column">
				        	<h4><strong>{brand}</strong></h4>
					      	<h2>{name}</h2>
					      	<p>{description}</p>
					      	<ul className='likeAndComment'>
					      		<li>
					      			<i className='heart icon'></i>{likeBy.length}
					      		</li>
					      		<li className='seperator'>|</li>
					      		<li>
					      			<i className='comment icon'></i>{comments.length}
					      		</li>
					      	</ul>

					      	<div className={`ui ${like?'orange':'grey'} button`} onClick={this.toggleLike.bind(this)}>
					      		<i className={`${like?'heart':'empty heart'} icon`}></i> {like?'Dislike it':'Like it'}
							</div>

					      	<div className="ui animated primary button" onClick={this.handleBuy.bind(this)}>
							  <div className="visible content">Buy It</div>
							  <div className="hidden content">
							    $ {price}
							  </div>
							</div>
					    </div>
					</div>
				    <div className='ui comments secondary segment'>
						<h3 className="ui dividing header">Comments</h3>
						{this.renderComment()}
						<form className="ui reply form" onSubmit={this.handleCommentSubmit.bind(this)}>
						    <div className="field">
						      <textarea ref='content'></textarea>
						    </div>
						    <button className="ui blue button" type='submit'>
							  <i className="icon edit"></i> Add Reply
							</button>
						</form>
					</div>
					<div className='ui comments secondary segment'>
						<h3 className="ui dividing header">Recommended</h3>
						<div className='ui three column grid'>
							{this.renderSimilarProducts()}
						</div>
					</div>
				</div>
				
			    <div className="six wide column">
				    <div className='ui secondary segment'>
				    	<h3 className="ui dividing header">{likeBy.length} People Like It</h3>
				    	<div className='ui horizontal list'>
							{this.renderLikeList()}
						</div>
				    </div>
				    <div className='ui secondary segment'>
				    	<h3 className='ui dividing header'>Hot Products</h3>
				    	<div className='ui three column grid'>
				    		{this.renderHotProducts()}
				    	</div>
				    </div>
			    </div>
			</div>
		);
	}
}

const ProductDetailContainer = createContainer(({params}) => {
	const {prodId} = params;
	Meteor.subscribe('getOneProduct',prodId);
	Meteor.subscribe('getProducts');
	Meteor.subscribe('getUserProfile');
	let product = ProductsData.findOne({_id:prodId});
	let hotProducts = ProductsData.find({},{sort:{ likeLength: -1 },limit:9}).fetch();
	let similarProducts = ProductsData.find({brand:product.brand,_id:{$ne: prodId}},{sort:{ createAt: -1 },limit:6}).fetch();
	let userProfiles = Meteor.users.find({_id:{$in:product.likeBy}},{profile:1}).fetch();
	return {
		product,
		hotProducts,
		similarProducts,
		userProfiles,
	};
},ProductDetail);

function mapStateToProps(state) {
	return {
		userId : state.user.id
	}
}

export default connect(mapStateToProps,{addComment,toggleLike,buyProduct})(ProductDetailContainer);