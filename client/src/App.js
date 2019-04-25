import React from 'react';
import './App.css';
import Header from './components/common/header/header.component';
import Main from './components/common/main/main.component';

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<header className="header">
					<Header />
				</header>
				<main className="main">
					<Main />
				</main>
			</React.Fragment>
		);
	}
}

export default App;
