import React,{Component} from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {connect} from 'react-redux';

import PublicNavigation  from '../components/public-navigation';
import AuthenticatedNavigation from './authenticated-navigation';

import {activeItem} from '../actions/header-action';

class Header extends Component {
	renderRight() {
		return this.props.user?<AuthenticatedNavigation />:<PublicNavigation />;
	}


	render() {
		return (
			<div className={`ui large top secondary pointing fixed menu stackable ${this.props.hidden?'transition hidden':''}`}>
			  <div className="ui container">
			    <div className='header item'>React-Guoku</div>
			    <Link className={`item ${this.props.active===1?'active':''}`}  to='/'>Home</Link>
			    <Link className={`item ${this.props.active===2?'active':''}`} to='/products'>Products</Link>
			  	{this.renderRight()}
			  </div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		user:state.user.id!==null,
		active:state.headerState.activeItem,
		hidden:state.headerState.hidden
	};
}

export default connect(mapStateToProps)(Header);
