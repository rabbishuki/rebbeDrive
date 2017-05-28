import React, { Component } from 'react';

export default class Folder extends Component {
	render() {
		let { id, name } = this.props.data;
		return (
			<div className="folder">
				<div className="circle">
					<span className="icon icon-homeowner-ins">
					</span>
				</div>
				<p className="folder_name">{name}</p>
				<span className="folder_desc">דניאל דניאל דניאל דניאל דניאל</span>
			</div>
		);
	}
}