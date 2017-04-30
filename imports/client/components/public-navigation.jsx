import React from 'react';
import {Link} from 'react-router';

export default PublicNavigation = () => (
		<div className="right menu">
			<Link className="ui item" to='/user/signup'>Signup</Link>
			<Link className="ui item" to='/user/login'>Login</Link>
		</div>
);