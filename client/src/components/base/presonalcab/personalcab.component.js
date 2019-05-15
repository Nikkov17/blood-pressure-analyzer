import React from 'react';
import { NavLink } from 'react-router-dom'

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="form-container">
				<div className="account-links">
					<NavLink className="inactive" to="/"> Home </NavLink>
				</div>
			</div>
		);
	}
}

export default Form;
