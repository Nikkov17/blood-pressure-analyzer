import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          	<div className="main">
				<div className="wrapper">
					<form className="form">
						<input type="text" placeholder="enter your age" className="theme-input"></input>
						<input type="text" placeholder="enter your pressure" className="theme-input"></input>
						<button className="search-button" type="submit"></button>
					</form>
            	</div>
          	</div>
      </div>
    );
  }
}

export default App;
