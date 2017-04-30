import React,{Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {connect} from 'react-redux';
import {Link} from 'react-router';

export default ({userProfile}) => {
	return (
		<Link className='item' to={`/user/${userProfile._id}`}>
 			<img className='ui avatar image' src={userProfile.profile.avator} />
 		</Link>
	);
}