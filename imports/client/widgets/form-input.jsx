import React from 'react';

export default ({inputProp:{title,type,placeholder,inputValid}}) => {
	return (
		<div className='field'>
			<label>{title}</label>
			<input type={type} placeholder={placeholder} {...inputValid}/>
			<div className={`${inputValid.touched&&inputValid.invalid?'ui pointing red basic label':''}`}>
				{inputValid.touched?inputValid.error:''}
			</div>
		</div>
	);
}
