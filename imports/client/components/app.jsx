import React,{Component} from 'react';
import Header from '../containers/header';
import {createContainer} from 'meteor/react-meteor-data';
import {connect} from 'react-redux';

import BuyCart from '../containers/buy-cart';
import Item from '../containers/buycart-item';

import {hideDimmer,deleteAllProduct} from '../actions/cart-action';
class App extends Component {
	componentWillUpdate (){
		if(this.props.buyCart.length==0){
			this.props.hideDimmer();
		}
	}

	handleClose() {
		this.props.hideDimmer();
	}

	renderItems() {
		const {buyList}=this.props;
		return buyList.length==0?<tr></tr>:buyList.map((product) => {
			return <Item key={product.id} product={product} />;
		});
	}

	handleDeleteAll() {
		this.props.deleteAllProduct(Meteor.userId());
	}

	render() {
		return (
		    <div>
		    	<Header />
			    <div className='app'>
			    	{this.props.children}
			    	<BuyCart />
			    </div>

			    <div className={`ui ${this.props.dimmer?'active':''} dimmer`}>
				    <table className='ui single line table'>
				    	<thead>
				    		<tr>
				    			<th>
							     BUY LIST
								</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
				    	<tbody>
				    		{this.renderItems()}
				    	</tbody>
				    	<tfoot>
						    <tr>
						    	<th>
						     		<button className="negative ui small button" onClick={this.handleDeleteAll.bind(this)}>
							          <i className="remove icon"></i>Delete All
							        </button>
							        <button className="positive ui small button" onClick={this.handleDeleteAll.bind(this)}>
							          <i className="shop icon"></i>Buy
							        </button>
						    	</th>
						    	<th></th>
						    	<th className='right aligned'>
						    		<button className="ui small labeled icon button" onClick={this.handleClose.bind(this)}>
							          <i className="radio icon"></i> Close
							        </button>
						    	</th>
						    </tr>
						</tfoot>
				    </table>
				</div>
			</div>
		);
	}
}

const AppContainer = createContainer(() => {
	Meteor.subscribe('getUserProfile');
	const userInfo = Meteor.user()?Meteor.users.findOne({_id:Meteor.userId()},{fields:{profile:1}}):undefined;
	const buyList = userInfo===undefined?[]:userInfo.profile.buyList;
	return {
		buyList,
	}
},App);


function mapStateToProps({buyCart,dimmer}) {
	return {
		buyCart,
		dimmer
	}
}

export default connect(mapStateToProps,{hideDimmer,deleteAllProduct})(AppContainer);