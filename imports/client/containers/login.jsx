import React,{Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import {login} from '../actions/account-action';
import {hideHeader} from '../actions/header-action';

const fields =['email','password'];
class Login extends Component{
	componentWillMount() {
		this.props.hideHeader(true);
	}

	componentWillUnmount() {
		this.props.hideHeader(false);
	}

	onFormSubmit(props) {
		this.props.login(props);
	}
	render() {
		const { fields: { email, password }, handleSubmit,login_error } = this.props;
		return (
			<div className='ui middle aligned center aligned grid loginPage'>
				<div className='column'>
					<h2 className='ui teal image header'>
						<img className='image' src='' alt='logo'/>
						<div className="content">
					        Log-in to your account
					    </div>
					</h2>
					<form className="ui large form" onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
						<div className="ui stacked segment">
					        <div className="field">
					          <div className='ui icon input'>
					            <input type="email" ref='emailAddress' placeholder="Email Address" {...email}/>
					            <i className="user icon"></i>
					          </div>
					          <div className={`${email.touched && email.invalid?'ui pointing red basic label':''}` }>
						        {email.touched?email.error:""}
						      </div>
					        </div>
					        <div className="field">
					          <div className='ui icon input'>
					            <input type="password" ref='password' placeholder="Password" {...password}/>
					            <i className="lock icon"></i>
					          </div>
					          <div className={`${password.touched && password.invalid?'ui pointing red basic label':''}`}>
						        {password.touched?password.error:""}
						      </div>
					        </div>
					        <div className='divider'></div>
					        <div className={`field ui error message ${login_error?'visible':'hidden'}`}>{this.props.login_error}</div>
				        	<button className="ui primary fluid button" type="submit">Log In</button>
				        </div>
				        
					</form>

					<div className="ui message">
				      New to us? <Link to="/user/signup">Sign Up</Link>
				    </div>
				</div>
			</div>
		);
	}
}

function validate(values) {
  const errors = {};
  if(!values.email){
    errors.email = "Please Enter an Email";
  }else{
    let regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    errors.email = regx.test(values.email)?"":"Please Enter Valid Email Address";
  }

  if(!values.password){
    errors.password = "Please Enter a password";
  }else {
    let regx = /^\d{6}$/;
    errors.password = regx.test(values.password)?"":"Please Enter 6-digit Number";
  }
  return errors;
}


function mapStateToProps(state) {
	return {
		login_error: state.user.error_message
	};
}

export default reduxForm({
	form:'login',
	fields:fields,
	validate
},mapStateToProps,{login,hideHeader})(Login);