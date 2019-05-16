import React from 'react';
import {Line} from 'react-chartjs-2';
import constants from '../../../constants/constants';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: this.props.getToken()
		};
		this.getUserHistory();

		this.formSubmit = this.formSubmit.bind(this);
		this.getUserHistory = this.getUserHistory.bind(this);
		this.prepareDataForSchedule = this.prepareDataForSchedule.bind(this);
	}

	getUserHistory() {
		let that = this;

		fetch(constants.gethistory + '/' + this.state.token,{
			method: 'GET',
			headers:{'content-type': 'application/json'}
		})
			.then(function(resp) {
				return resp.json();
			})
			.then(function(resp) {
				that.setState({history: resp});
			})
	}

	formSubmit(e) {
		e.preventDefault();

		let that = this;
		let form = e.target;
		let value = form[2].value + '/' + form[3].value;

		let data = {
			token: this.state.token,
			age: form[0].value,
			gender: form[1].value,
			value: value,
			date: +new Date()
		};

		let xhr = new XMLHttpRequest();
		xhr.open('PUT', constants.addvalue);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				that.getUserHistory();
			}
		};
		xhr.send(JSON.stringify(data));
	}

	prepareDataForSchedule() {
		let labelsArray = [];
		let systolicPressureValues = [];
		let dyastolicPressureValues = [];
		let systolicNormalPressureValues = [];
		let dyastolicNormalPressureValues = [];

		this.state.history.forEach(function(item) {
			labelsArray.push(item.date);
			systolicPressureValues.push(item.value.split('/')[0]);
			dyastolicPressureValues.push(item.value.split('/')[1]);
			systolicNormalPressureValues.push(item.normalValue.split('/')[0]);
			dyastolicNormalPressureValues.push(item.normalValue.split('/')[1]);
		});

		return {
			labels: labelsArray,
			datasets: [
			{
				label: 'systolic blood pressure',
				fill: false,
				lineTension: 0.1,
				backgroundColor: '#bbe5e5',
				borderColor: '#bbe5e5',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#bbe5e5',
				pointHoverBorderColor: '#fbfbfb',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: systolicPressureValues
			},{
				label: 'diastolic blood pressure',
				fill: false,
				lineTension: 0.1,
				backgroundColor: '#aff0b4',
				borderColor: '#aff0b4',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#aff0b4',
				pointHoverBorderColor: '#fbfbfb',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: dyastolicPressureValues
			},{
				label: 'systolic normal blood pressure',
				fill: false,
				lineTension: 0.1,
				backgroundColor: '#00d4d4',
				borderColor: '#00d4d4',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#00d4d4',
				pointHoverBorderColor: '#fbfbfb',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: systolicNormalPressureValues
			},{
				label: 'diastolic normal blood pressure',
				fill: false,
				lineTension: 0.1,
				backgroundColor: '#00f213',
				borderColor: '#00f213',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#00f213',
				pointHoverBorderColor: '#fbfbfb',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: dyastolicNormalPressureValues
			}
			]
		};
	}

	render() {
		let items;
		let data;

		if (this.state.history) {
			data = this.prepareDataForSchedule();
			items = this.state.history.map(item => <li>{item.value} (Normal value:{item.normalValue})</li>);
		}

		return (
			<div className="form-container">
				<div className="history">
					Your previous pressure values:
					<ol>
						{items}
					</ol>
					<Line data={data} />;
				</div>
				<form className="form" onSubmit={this.formSubmit}>
					<input className="input" id="age-input" placeholder="Your age" type="text" />
					<select className="input select" defaultValue={''} required>
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
