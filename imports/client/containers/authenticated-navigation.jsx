import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';

import {logout} from '../actions/account-action';

class AuthenticatedNavigation extends Component {
	handleLogout() {
		this.props.logout();
	}

	render() {
		return (
				<div className="right menu">
				  <Link className="ui item" to='/products/create'>
				  	<i className='plus icon'></i>
				  </Link>
				  <div className="ui simple dropdown item">
					  	<img className="ui avatar image" src={this.props.userProfile.avator} />
					 	{this.props.userProfile.name}
					    <div className="menu">
					      <Link className="item" to={`/user/${this.props.userId}`}>Profile</Link>
					      <div className="item">Favorite</div>
					      <div className="divider"></div>
					      <div className="item" onClick={this.handleLogout.bind(this)}>Logout</div>
					    </div>
				  </div>
				</div>
		);
	}
}

function mapStateToProps(state){
	return {
		userId:state.user.id,
		userProfile: state.user.profile
	};
}

export default connect(mapStateToProps,{logout})(AuthenticatedNavigation);
