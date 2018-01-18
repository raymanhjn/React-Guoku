import React,{Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';


import {signup,drop_image,clean_drop_image} from '../actions/account-action';
import {hideHeader} from '../actions/header-action';

import FormInput from '../widgets/form-input';


const fields = ['firstName','lastName','email','password','repassword'];

class Signup extends Component{

	componentWillMount() {
		this.props.hideHeader(true);
	}

	componentWillUnmount() {
		this.props.hideHeader(false);
		this.props.clean_drop_image();
	}

	onFormSubmit(userProps) {
		let {dropImage}=this.props;
		console.log(userProps);
		if(dropImage==''){
			let url = 'http://semantic-ui.com/images/avatar/small/elliot.jpg';
			this.props.signup(userProps,url);
		}else{
			this.props.signup(userProps,dropImage);
		}
	}

	renderInput(inputProps) {
		return	inputProps.map((inputProp) => {
			return <FormInput inputProp={inputProp} />;
		});
	}

	onDrop(file) {
		this.props.drop_image(file[0]);
	}
	renderInDropzone() {
		let {dropImage}=this.props;
		return dropImage==''?<div></div>:<img src={dropImage}/>;
	}

	render() {
		const {fields:{firstName,lastName,email,password,repassword},handleSubmit,avator} = this.props;
		const inputProps=[{
				type:'email',
				title:'Email',
				placeholder:'Email Address',
				inputValid:email
			},{
				type:'password',
				title:'Password',
				placeholder:'Password',
				inputValid:password
			},{
				type:'password',
				title:'Retype Password',
				placeholder:'Retype Password',
				inputValid:repassword
			},
		];
		const nameInputProps =[{
				type:'text',
				title:'',
				placeholder:'First Name',
				inputValid:firstName
			},{
				type:'text',
				title:'',
				placeholder:'Last Name',
				inputValid:lastName
			}
		];
		return (
			<form className="ui form" onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
			  <h2 className="ui dividing header">Signup</h2>
			  <div className="field">
			    <label>Name</label>
			    <div className='two fields'>
			    	{this.renderInput(nameInputProps)}
			    </div>
			    {this.renderInput(inputProps)}
			  </div>
			  <p>Drop an image or click to select a file to be the avator.</p>
			  <Dropzone className='dropzone'
			      multiple={false}
			      accept="image/*"
			      onDrop={this.onDrop.bind(this)}>
			      {this.renderInDropzone()}
			  </Dropzone>
			  <div className='divider'></div>
			  <div className={`${this.props.signup_error?'ui visible error message':''}`}>{this.props.signup_error}</div>
			  <p>Already have an account? <Link to="/user/login">  Log In</Link>.</p>
			  <button className="ui button primary" type="submit">Submit</button>
			</form>
		);
	}
}

function validate(values) {
  const errors = {};
  	if(!values.firstName){
		errors.firstName='Enter a first name';
	}
	if(!values.lastName){
		errors.lastName='Enter a last name';
	}

	  if(!values.email){
	    errors.email = "Please Enter a Username";
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

	  if(!values.repassword){
	  	errors.repassword = "Please Enter a password";
	  }else if(values.repassword !== values.password){
	  	errors.repassword = "Please Enter the same password";
	  }
	  return errors;
}

function mapStateToProps(state) {
	return {
		signup_error:state.usersignup,
		dropImage:state.createProps.imageURL
	}
}

export default reduxForm({
	form:'userForm',
	fields:fields
},mapStateToProps,{signup,hideHeader,drop_image,clean_drop_image})(Signup);
