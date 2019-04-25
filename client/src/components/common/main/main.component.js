import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import { createStore } from 'redux'
import { createBrowserHistory } from 'history';
import './main.css';
import Form from '../../base/form/form.component';

const store = createStore(() => {return {}},{});
const history = createBrowserHistory();

class Main extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<Route exact={true} path='/' component={Form} />
						{/* <Route path='/signin' component={LoginForm} /> */}
						{/* <Route path='/signup' component={RegisterForm} /> */}
						{/* <Route path='/userInfo' component={UserInformation}/> */}
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default Main;
