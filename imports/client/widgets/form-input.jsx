import React from 'react';

export default ({inputProp:{title,type,placeholder,inputValid}}) => {
	return (
		<div className='field'>
			<label>{title}</label>
			<input type={type} placeholder={placeholder} {...inputValid}/>
		</div>
	);
}
