import React,{Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { Meteor } from 'meteor/meteor';
import {Router,browserHistory} from 'react-router';
import Store from '../imports/client/store/store';
import routes from '../imports/routes';

const AppRoot = () => {
	return (
		<div>
			<Provider store={Store}>
				<Router history={browserHistory} routes={routes} />
			</Provider>
		</div>
	);
}

Meteor.startup(()=>{
	render(<AppRoot />,document.getElementById('app'));
});