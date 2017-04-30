import React,{Component} from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {Link,browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';

import {activeItem,hideHeader} from '../actions/header-action';
import {getProducts} from '../actions/product-action';

import {ProductsData} from '../../collection';

import Header from './header';
import LinkImage from '../widgets/link-img';

const categories=[
		{name:'Health',imageUrl:37},
		{name:'Play',imageUrl:25},
		{name:'Tech',imageUrl:21},
		{name:'Dressing',imageUrl:14},
		{name:'Food',imageUrl:12},
		{name:'Homestyle',imageUrl:1},
	];

class Index extends Component {

	constructor(props){
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

	componentWillMount() {
		this.props.activeItem(1);
		this.props.hideHeader(true);
		this.props.getProducts('');
	}

	handleScroll(event) {
	    let scrollTop = event.srcElement.body.scrollTop;
	    if(500-scrollTop <=0){
	    	this.props.hideHeader(false);
	    }else{
	    	this.props.hideHeader(true);
	    }
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll',this.handleScroll);
		this.props.hideHeader(false);
	}

	renderProducts() {
		return this.props.recentProducts.map( (recentProduct) => {
			return (
				<Link key={recentProduct._id} className='column' to={`/products/${recentProduct._id}`}>
					<img className='ui image recommend-image' src={recentProduct.photo} />
					<h3>{recentProduct.name}</h3>
					<div>{`$ ${recentProduct.price}`}</div>
				</Link>
			);
		} );
	}

	renderCategoryIcon() {
		return categories.map((category) => {
			let url = `/products?category=${category.name.toLowerCase()}`;
			let image= `http://static.guoku.com/static/v4/7ce41099b4766ad0cd4e68866ee56d61502fffcf/images/category-icon/${category.imageUrl}.png`;
			return <LinkImage key={category.name} url={url} image={image} text={category.name}/>
		});
	}

	render() {
		return (
			<div className="pusher">
			    <div className="ui inverted vertical masthead center aligned segment" ref='masthead'>
				    <div className="ui container">
				      <div className="ui large secondary inverted pointing menu">
				        <div className='header item'>React-guoku</div>
					    <Link className={`item ${this.props.active===1?'active':''}`}  to='/'>Home</Link>
					    <Link className={`item ${this.props.active===2?'active':''}`} to='/products'>Products</Link>
					    <Link className={`item ${this.props.active===3?'active':''}`} to='/articles'>Articles</Link>
				      </div>
				    </div>
				    <div className="ui text container">
				      <h1 className="ui inverted header">
				        Imagine-a-Company
				      </h1>
				      <h2>Do whatever you want when you want to.</h2>
				      <Link className="ui huge primary button" to='/products'>Get Started <i className="right arrow icon"></i></Link>
				    </div>
			    </div>
			  
			    <div className="ui vertical stripe segment">
				    <div className="ui middle aligned stackable grid container">
				      <div className="row">
				        <div className="eight wide column">
				          <h3 className="ui header">We Help Companies and Companions</h3>
				          <p>We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs...through pure data analytics.</p>
				          <h3 className="ui header">We Make Bananas That Can Dance</h3>
				          <p>Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.</p>
				        </div>
				        <div className="six wide right floated column">
				          <img src="http://imgcdn.guoku.com/images/310/0c24d15141b74cc5ca7f7d8ac31afd84.jpg" className="ui large bordered rounded image" />
				        </div>
				      </div>
				      <div className="row">
				        <div className="center aligned column">
				          <Link className="ui huge button" to='/products'>Check Them Out</Link>
				        </div>
				      </div>
				    </div>
			    </div>

			    <div className="ui vertical stripe quote segment">
				    <div className="ui container six column grid">
				    	{this.renderCategoryIcon()}
				    </div>
			    </div>

			  <div className="ui vertical stripe segment">
			    <div className="ui container">
			    	<h2 className='header'>Recent Product</h2>
			    	<div className='ui six column grid'>
			    		{this.renderProducts()}
			    	</div>
			    </div>
			  </div>


			  <div className="ui inverted vertical footer segment">
			    <div className="ui container">
			      <div className="ui stackable inverted divided equal height stackable grid">
			        <div className="three wide column">
			          <h4 className="ui inverted header">About</h4>
			          <div className="ui inverted link list">
			            <a href="#" className="item">Sitemap</a>
			            <a href="#" className="item">Contact Us</a>
			          </div>
			        </div>
			        <div className="three wide column">
			          <h4 className="ui inverted header">Services</h4>
			          <div className="ui inverted link list">
			            <a href="#" className="item">Products</a>
			            <a href="#" className="item">Shopping cart</a>
			          </div>
			        </div>
			        <div className="seven wide column">
			          <h4 className="ui inverted header">Footer Header</h4>
			          <p>Made by Jianing He | UNC Charlotte | Aug 2016.</p>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}	

const IndexContainer = createContainer(() => {
	Meteor.subscribe('getProducts');
	return {
		recentProducts: ProductsData.find({},{sort:{createAt:-1},limit:18}).fetch()
	};
},Index);

function mapStateToProps(state){
	return {
		user:state.user!==null,
		active:state.headerState.activeItem,
		products:state.products
	};
}



export default connect(mapStateToProps,{activeItem,hideHeader,getProducts})(IndexContainer);