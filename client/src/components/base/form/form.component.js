import React from 'react';
import { NavLink } from 'react-router-dom'
import './form.css';
import constants from '../../../constants/constants';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pressureValue: null
		};
		this.formSubmit = this.formSubmit.bind(this);
		this.logout = this.logout.bind(this);
	}

	formSubmit(e) {
		e.preventDefault();

		let that = this;
		let form = e.target;
		let data = {
			age: form[0].value,
			gender: form[1].value
		};

		fetch(constants.calculatePressureURL,{
			method: 'POST',
			headers:{'content-type': 'application/json'},
			body: JSON.stringify(data)
		})
			.then(function(resp) {
				return resp.json();
			})
			.then(function(resp) {
				that.setState({
					pressureValue: resp.normalValue
				});
			})
	}

	logout() {
		let that = this;

		fetch(constants.logout,{
			method: 'GET',
			headers:{'content-type': 'application/json'},
		})
			.then(function() {
				that.props.updateToken();
			})
	}

	render() {
		let result;
		let links;

		if(!this.props.getToken()) {
			links = <div className="account-links">
				<NavLink className="inactive" to="/signin"> Sign in </NavLink>
				<NavLink className="inactive" to="/signup"> Sign up </NavLink>
			</div>
		} else {
			links = <div className="account-links">
				<NavLink className="inactive" to="/personalcab"> personal cabinet </NavLink>
				<a className="inactive" onClick={this.logout}> log out </a>
			</div>
		}
		if(this.state.pressureValue) {
			result = <h2>Normal value: {this.state.pressureValue}</h2>
		}
		return (
			<React.Fragment>
			<div className="form-container">
				<p className="form-title">Please, enter some info about you:</p>
				<form className="form" onSubmit={this.formSubmit}>
					<input className="input" id="age-input" placeholder="Your age" type="text" />
					<select className="input select" defaultValue={''} required>
						<option value="" disabled>select gender</option>
						<option value="male">male</option>
						<option value="female">female</option>
					</select>
					{/* <input className="input" id="pressure-input" placeholder="Your systolic blood pressure" type="text" /> */}
					{/* <input className="input" id="pressure-input" placeholder="Your diastolic blood pressure" type="text" /> */}
					<button className="submit-button" type="submit">Submit</button>
				</form>
				{result}
				{links}
			</div>
			</React.Fragment>
		);
	}
}

export default Form;
