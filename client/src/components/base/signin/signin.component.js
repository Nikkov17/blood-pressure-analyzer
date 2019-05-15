import React from 'react';
import constants from '../../../constants/constants';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.formSubmit = this.formSubmit.bind(this);
	}

	formSubmit(e) {
		e.preventDefault();

		let form = e.target;
		let data = {
			email: form[0].value,
			password: form[1].value
		};

		fetch(constants.login,{
			method: 'POST',
			headers:{'content-type': 'application/json'},
			body: JSON.stringify(data)
		});
	}

	render() {
		return (
			<div className="form-container">
				<p className="form-title">Please, sign in:</p>
				<form className="form" onSubmit={this.formSubmit}>
					<input className="input" id="email-input" placeholder="enter your email" type="text" />
					<input className="input" id="password-input" placeholder="enter your password" type="password" />
					<button className="submit-button" type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default SignIn;
