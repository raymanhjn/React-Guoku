import React,{Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {activeItem} from '../actions/header-action';

class Articles extends Component{
	componentWillMount() {
		this.props.activeItem(3);
	}

	render() {
		return <div className='ui main container'>articles</div>;
	}
}


export default connect(null,{activeItem})(Articles);