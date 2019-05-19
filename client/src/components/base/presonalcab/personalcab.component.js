import React from 'react';
import {Line} from 'react-chartjs-2';
import { NavLink } from 'react-router-dom'
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
			date: +new Date(),
			height: form[4].value,
			weight: form[5].value,
			physicalActivity: form[6].value,
			alcohol: form[7].value,
			smoke: form[8].value
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
		let reasons;
		let items;
		let data;
		let rejectionReasons;

		if (this.state.history) {
			reasons = this.state.history[this.state.history.length-1].rejectionReasons;
			data = this.prepareDataForSchedule();
			items = this.state.history.map(item => <li>{item.value} (Normal value:{item.normalValue})</li>);
			rejectionReasons = <ul>{reasons.map(item => <li>{item}</li>)}</ul>
		}

		return (
			<div className="form-container">
				<div className="history">
					Your previous pressure values:
					<ol>
						{items}
					</ol>
					<p>
						If you have chronically elevated or low blood pressure, you should consult a doctor.
					</p>
					<Line data={data} />;
					Some recomendations according to you characteristics:
					{rejectionReasons}
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
					<input className="input" id="pressure-input" placeholder="Your height" type="number" />
					<input className="input" id="pressure-input" placeholder="Your weight" type="number" />
					<select className="input select" defaultValue={''} required>
						<option value="" disabled>select your physical activity</option>
						<option value="active">active/sportsmen</option>
						<option value="normal">several times a week for an hour</option>
						<option value="notactive">less often</option>
					</select>
					<select className="input select" defaultValue={''} required>
						<option value="" disabled>alcohol consumption</option>
						<option value="normal">1-2 drinks per day</option>
						<option value="active">more often</option>
						<option value="notactive">less often</option>
					</select>
					<select className="input select" defaultValue={''} required>
						<option value="" disabled>do you smoke</option>
						<option value="true">yes</option>
						<option value="false">no</option>
					</select>
					<button className="submit-button" type="submit">Submit</button>
				</form>
				<div className="account-links">
					<NavLink className="inactive" to="/"> Home </NavLink>
				</div>
			</div>
		);
	}
}

export default Form;
