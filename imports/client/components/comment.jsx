import React,{Component} from 'react';
import moment from 'moment';
import {findDOMNode} from 'react-dom';

import SubComment from './subComment';

export default class Comment extends Component {

	constructor(props) {
		super(props);
		this.state = {textarea: props.textarea};
	}

	renderSubComments() {
		return this.props.comment.subComments.map((subComment) => {
					return <SubComment subComment={subComment}/>;
				});
	}

	renderSubComment() {
		let {subComments} = this.props.comment;
		return subComments?
			<div className="comments">
				{this.renderSubComments()}
			</div>:<div></div>;

		<div className="comments">
			{this.renderSubComment()}
		</div>
	}

	handleTextarea() {
		this.setState({textarea: !this.state.textarea})
	}

	handleSubcommentSubmit() {
		//createUser,createAt,content
		const {prodId} =this.props.params;
		const noUser = {
			name: 'Guest',
			avator: 'http://semantic-ui.com/images/avatar/small/steve.jpg',
		};
		const user = Meteor.user()?Meteor.user().profile:noUser;
		const content = findDOMNode(this.refs.subcomment).value.trim();
		const subcomment = {
			createUser:user,
			content:content,
			createAt:new Date()
		}
		console.log(subcomment);
	}

	render () {
		const {content,createAt,createUser,subComments} = this.props.comment;
		return (
			<div className='comment'>
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
					<div className="actions">
						<a className="reply" onClick={this.handleTextarea.bind(this)}>Reply</a>
					</div>
					
					<form className={`ui reply form ${this.state.textarea?'visible':'hidden'}`}>
				        <div className="field">
				          <textarea ref='subcomment'></textarea>
				        </div>
				        <div className="mini ui primary submit labeled icon button" onClick={this.handleSubcommentSubmit.bind(this)}>
				          <i className="icon edit"></i> Add Reply
				        </div>
				    </form>
				</div>
			</div>
		);
	}
}

Comment.defaultProps = {textarea: false};