import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import constants from '../../../constants/constants';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.formSubmit = this.formSubmit.bind(this);
	}

	formSubmit(e) {
		e.preventDefault();
		let form = e.target;

		if (form[1].value === form[2].value) {
			let data = {
				username: form[0].value,
				password: form[1].value
			};
	
			fetch(constants.register,{
				method: 'POST',
				headers:{'content-type': 'application/json'},
				body: JSON.stringify(data)
			})
				.then(function(resp) {
					return resp.json();
				})
				.then((resp) => {
					that.props.updateToken(resp.token);
					that.props.history.push('/personalcab');
				});
		} else {
			this.setState({error: 'entered passwords are different'});
		}
	}

	render() {
		return (
			<div className="form-container">
				<p className="form-title">Please, sign in:</p>
				<form className="form" onSubmit={this.formSubmit}>
					<input className="input" id="email-input" placeholder="enter your email" type="text" />
					<input className="input" id="password-input" placeholder="enter your password" type="password" />
					<input className="input" id="password-input" placeholder="repeat your password" type="password" />
					<button className="submit-button" type="submit">Submit</button>
				</form>
				<div className="account-links">
					<NavLink className="inactive" to="/"> Home </NavLink>
				</div>
				<p>{this.state.error}</p>
			</div>
		);
	}
}

export default withRouter(SignIn);
