import React,{Component} from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import {reduxForm} from 'redux-form';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import 'react-select/dist/react-select.css';

import moment from 'moment';

import {createProduct,set_brand,clean_brand} from '../actions/product-action';
import {drop_image,clean_drop_image} from '../actions/account-action';
import FormInput from '../widgets/form-input';

const fields =['name','description','price'];
const brands = [
	{ label: 'Health', value: 'health' },
	{ label: 'Play', value: 'play' },
	{ label: 'Tech', value: 'tech' },
	{ label: 'Dressing', value: 'dressing' },
	{ label: 'Food', value: 'food' },
	{ label: 'Homestyle', value: 'homestyle' },
];

class AddProduct extends Component {
	componentWillUnmount() {
		this.props.clean_drop_image();
		this.props.clean_brand();
	}

	onFormSubmit(product) {
		let {createUser,productProps:{brand,imageURL}}=this.props;
		product.createBy = createUser;
		product.photo = imageURL==''?'http://res.cloudinary.com/dn4jaaimd/image/upload/v1472587353/Product-Image-Coming-Soon_g8agag.jpg':imageURL;
		product.brand = brand;
		this.props.createProduct(product);
		browserHistory.push('/products');
	}

	rendeInput(inputProps) {
		return inputProps.map((inputProp) => {
			return <FormInput inputProp={inputProp}/>;
		})
	}

	onDrop(file) {
		this.props.drop_image(file[0]);
	}

	renderInDropzone() {
		let {imageURL}=this.props.productProps;
		return imageURL==''?<div></div>:<img src={imageURL}/>;
	}

	renderOptions() {
		return brands.map( (brand)=>{
			return <option value={brand.value}>{brand.label}</option>;
		});
	}

	logChange(event) {
		let brand = event.target.value;
		this.props.set_brand(brand);
	}

	render() {
		const {fields:{name,description,price},handleSubmit} = this.props;
		const inputProps =[{
				type:'text',
				title:'Name',
				placeholder:'Product Name',
				inputValid:name,
			},{
				type:'text',
				title:'Price',
				placeholder:'Price',
				inputValid:price,
			}
		];
		return (
			<form className="ui form" onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
			  <h2 className="ui dividing header">Create Product</h2>
			  {this.rendeInput(inputProps)}
				<div className="field">
					<label>brand</label>
					<select onChange={this.logChange.bind(this)}>
					  {this.renderOptions()}
					</select>
				</div>
			  <div className="field">
			    <label>Description</label>
			    <textarea type="text" placeholder="Description" {...description}/>
			  </div>
			  <p>Drop an image or click to select a file to be the product picture.</p>
			  <Dropzone className='dropzone'
			      multiple={false}
			      accept="image/*"
			      onDrop={this.onDrop.bind(this)}>
			      {this.renderInDropzone()}
			  </Dropzone>
			  <div className='divider'> </div>
			  <button className="ui button primary" type="submit">Submit</button>
			</form>
		);
	}
}

function mapStateToProps(state){
	return {
		createUser: state.user,
		productProps:state.createProps
	};
}

export default reduxForm({
	form:'productForm',
	fields:fields,
},mapStateToProps,{createProduct,drop_image,clean_drop_image,set_brand,clean_brand})(AddProduct);