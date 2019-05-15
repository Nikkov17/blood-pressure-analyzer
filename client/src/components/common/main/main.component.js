import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import { createStore } from 'redux'
import { createBrowserHistory } from 'history';
import './main.css';
import Form from '../../base/form/form.component';
import SignIn from '../../base/signin/signin.component';
import SignUp from '../../base/signup/signup.component';
import Personalcab from '../../base/presonalcab/personalcab.component';

const store = createStore(() => {return {}},{});
const history = createBrowserHistory();

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.updateToken = this.updateToken.bind(this);
		this.getToken = this.getToken.bind(this);
	}

	getToken() {
		return this.state.token;
	}

	updateToken(value) {
		if (value) {
			this.setState({token: value});
			this.render();
		} else {
			this.setState({token: undefined});
			this.render();
		}
	}

	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<Route exact={true} path='/' render={() => <Form updateToken={this.updateToken} getToken={this.getToken} />} />
						<Route path='/signin' render={() => <SignIn updateToken={this.updateToken} getToken={this.getToken} />} />
						<Route path='/signup' render={() => <SignUp updateToken={this.updateToken} getToken={this.getToken} />} />
						<Route path='/personalcab' render={() => <Personalcab updateToken={this.updateToken} />} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default Main;
