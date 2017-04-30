import {Meteor} from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOG_OUT = 'LOG_OUT';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const DROP_IMAGE = 'DROP_IMAGE';
export const CLEAN_DROP_IMAGE = 'CLEAN_DROP_IMAGE';

function Login_Success_Dispatch(){
	return {
		type:LOGIN_SUCCESS,
		payload:{ id:Meteor.userId(),
				  profile:Meteor.user().profile,
				  error_message:null
				}
	}
}

function Login_Error_Dispatch(error){
		return {
			type:LOGIN_ERROR,
			payload:{ id:null,
				      profile:null,
				      error_message:error.reason
				    }
		}
}

function Logout_Dispatch() {
	return {
		type:LOG_OUT,
		payload:{ id:null,
				  profile:null,
				  error_message:null
				}
	}
}

function Signup_Success_Dispatch(){
	return {
		type:SIGNUP_SUCCESS,
		payload:null
	}
}

function Signup_Error_Dispatch(error){
		return {
			type:SIGNUP_ERROR,
			payload: error.reason
		}
}

export function login(props) {
	return dispatch => {
		Meteor.loginWithPassword(props.email,props.password,(error) => {
			if(error){
				dispatch(Login_Error_Dispatch(error));
			}else{
				dispatch(Login_Success_Dispatch());
				browserHistory.push('/');
			}
		});
	}
} 

export function signup(props,url) {
	let user = {
		email:props.email,
		password:props.password,
		profile:{
			name:props.firstName+' '+props.lastName,
			favorite:[],
			avator:url,
			buyList:[]
		}
	};
	return dispatch => {
		Accounts.createUser(user,(error) => {
			if(error){
				dispatch(Signup_Error_Dispatch(error));
			}else{
				dispatch(Signup_Success_Dispatch());
				dispatch(Login_Success_Dispatch());
				browserHistory.push('/');
			}
		})
	};
} 

export function logout() {
	return dispatch => {
		Meteor.logout( () => {
			dispatch(Logout_Dispatch());
			browserHistory.push('/user/login');
		} )
	}
} 

export function drop_image(image) {
	const CLOUDINARY_UPLOAD_PRESET = 'l1zsstcz';
	const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dn4jaaimd/image/upload';
	const API_KEY = '979867596815784';

	const data = new FormData();
	  data.append('file', image);
	  data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
	  data.append('api_key', API_KEY);

	  const xhr = new XMLHttpRequest();
	  xhr.open('POST', CLOUDINARY_UPLOAD_URL, false);
	  xhr.send(data);
	  const imageResponse = JSON.parse(xhr.responseText);

	return {
		type:DROP_IMAGE,
		payload:imageResponse.url
	}
} 

export function clean_drop_image() {

	return {
		type:CLEAN_DROP_IMAGE,
		payload:''
	}
} 