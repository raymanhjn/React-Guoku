import React,{Component} from 'react';
import {connect} from 'react-redux';
import {createContainer} from 'meteor/react-meteor-data';
import {activeDimmer} from '../actions/cart-action';

class BuyCart extends Component {
	handleClick() {
		this.props.activeDimmer();
	}

	render() {
		return (
			<div className={`cart ${this.props.buyCart.length===0? 'hidden':''}`}>
				<div className='cart-trigger' onClick={this.handleClick.bind(this)}>
					<ul className='count'>
						<li>{this.props.buyCart.length}</li>
					</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps({buyCart,dimmer}) {
	return {
		buyCart,
		dimmer
	}
}

export default connect(mapStateToProps,{activeDimmer})(BuyCart);
