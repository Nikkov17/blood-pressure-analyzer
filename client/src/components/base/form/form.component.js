import React from 'react';
import './form.css';
import constants from '../../../constants/constants';
import Input from '../../base/input/input.component';

class Form extends React.Component {
	formSubmit(e) {
		debugger;
		e.preventDefault();
		fetch(constants.URL, {
			method: 'GET', 
			headers: {
				"Content-Type": "text/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type"
			}
		});
	}

	render() {
		return (
			<div className="form-container">
				<p className="form-title">Please, enter some info about you:</p>
				<form className="form" onSubmit={this.formSubmit}>
					<Input>Your age</Input>
					<Input>Your blood pressure</Input>
					<button className="submit-button" type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default Form;
