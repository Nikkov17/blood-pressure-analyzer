import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './modules/form/App';
import constants from './constants/constants';

ReactDOM.render(<App />, document.getElementById('root'));

sendFetch();

function sendFetch() {
	let form = document.querySelector('.form');

	form.onsubmit = (e) => {
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
}