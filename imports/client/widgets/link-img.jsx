import React from 'react';
import {Link} from 'react-router';

export default ({url,image,imageType,text}) => {
	return (
		<Link className='column' to={url}>
			<img className={`ui ${imageType?imageType:''} image`} src={image}/>
			<div className='linkImage-text'>{text}</div>
		</Link>
	);
}