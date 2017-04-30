import React from 'react';
import moment from 'moment';

export default ({subComment}) => {
	const {content,createAt,createUser} = this.props.subComment;
	return (
		<div className="comment">
			<a className="avatar">
				<img src={createUser.avator} />
			</a>
			<div className="content">
				<a className="author">{createUser.name}</a>
				<div className="metadata">
				    <span className="date">{moment(createAt).fromNow()}</span>
				</div>
				<div className="text">
				    {content}
				</div>
			</div>
		</div>
	);
}