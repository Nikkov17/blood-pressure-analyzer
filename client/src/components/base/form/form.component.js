import React from 'react';
import './form.css';
import constants from '../../../constants/constants';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	formSubmit(e) {
		e.preventDefault();

		fetch(constants.calculatePressureURL,{
			method: 'POST',
			body: JSON.stringify({a: 1, b: 'Textual content'})
		})
			.then(function(resp) {
				debugger;
			});
	}

	render() {
		return (
			<div className="form-container">
				<p className="form-title">Please, enter some info about you:</p>
				<form className="form" onSubmit={this.formSubmit}>
					<input className="input" id="age-input" placeholder="Your age" type="text" />
					<input className="input" id="pressure-input" placeholder="Your blood pressure" type="text" />
					<button className="submit-button" type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default Form;
