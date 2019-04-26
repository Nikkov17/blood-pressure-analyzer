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

		let form = e.target;
		let data = {
			age: form[0].value,
			gender: form[1].value,
			systolicBloodPressure: form[2].value,
			diastolicBloodPressure: form[3].value
		};

		fetch(constants.calculatePressureURL,{
			method: 'POST',
			headers:{'content-type': 'application/json'},
			body: JSON.stringify(data)
		})
			.then(resp => resp.json())
			.then(function(resp) {
				console.log(resp);
			})
	}

	render() {
		return (
			<div className="form-container">
				<p className="form-title">Please, enter some info about you:</p>
				<form className="form" onSubmit={this.formSubmit}>
					<input className="input" id="age-input" placeholder="Your age" type="text" />
					<select className="input" defaultValue={''} required>
						<option value="" disabled>select gender</option>
						<option value="male">male</option>
						<option value="female">female</option>
					</select>
					<input className="input" id="pressure-input" placeholder="Your systolic blood pressure" type="text" />
					<input className="input" id="pressure-input" placeholder="Your diastolic blood pressure" type="text" />
					<button className="submit-button" type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default Form;
