import React from 'react';
import './input.css';

class Input extends React.Component {
	render() {
		return (
			<div className="input-container">
				<input className="input" id="titleInput" placeholder={this.props.children} type="text" />
			</div>
		);
	}
}

export default Input;
