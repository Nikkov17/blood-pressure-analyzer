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
					<button className="submit-button" type="submit">Submit</button>
				</form>
				{result}
				{links}
			</div>
			<section className="section">
				<div className="text">
					<h2>What do your blood pressure numbers mean?</h2>
					The only way to know if you have high blood pressure (HBP, or hypertension) is to have your blood pressure tested. Understanding your results is key to controlling high blood pressure.
					<h2>Know your blood pressure (BP)? </h2>
					Select where your BP falls to understand more about your blood pressure and what you can do to improve it. (As a reminder systolic is the top number and diastolic is the bottom number of a BP reading.)

					<ul>
					<li>Systolic is less than 120 and my diastolic is less than 80</li>
					<li>Systolic is 120 – 129 and my diastolic is less than 80</li>
					<li>Systolic is 130 – 139 or my diastolic is 80 – 89</li>
					<li>Systolic is 140 or higher or my diastolic is 90 or higher</li>
					<li>Systolic is higher than 180 and/or my diastolic is higher than 120</li>
					</ul>


					Healthy and unhealthy blood pressure ranges
					Learn what’s considered normal, as recommended by the American Heart Association. See the chart below.

					Note: A diagnosis of high blood pressure must be confirmed with a medical professional. A doctor should also evaluate any unusually low blood pressure readings.

					BLOOD PRESSURE CATEGORY	SYSTOLIC mm Hg
					(upper number)	 	DIASTOLIC mm Hg
					(lower number)
					NORMAL	LESS THAN 120	and	LESS THAN 80
					ELEVATED	120 – 129	and	LESS THAN 80
					HIGH BLOOD PRESSURE
					(HYPERTENSION) STAGE 1	130 – 139	or	80 – 89
					HIGH BLOOD PRESSURE
					(HYPERTENSION) STAGE 2	140 OR HIGHER	or	90 OR HIGHER
					HYPERTENSIVE CRISIS 
					(consult your doctor immediately)	HIGHER THAN 180	and/or	HIGHER THAN 120
					Download this chart: English (PDF) | Spanish (PDF) | Traditional Chinese (PDF)

					<h2>Blood pressure categories</h2>
					The five blood pressure ranges as recognized by the American Heart Association are:

					Normal
					Blood pressure numbers of less than 120/80 mm Hg are considered within the normal range. If your results fall into this category, stick with heart-healthy habits like following a balanced diet and getting regular exercise.

					Elevated
					Elevated blood pressure is when readings consistently range from 120-129 systolic and less than 80 mm Hg diastolic. People with elevated blood pressure are likely to develop high blood pressure unless steps are taken to control the condition.

					Hypertension Stage 1
					Hypertension Stage 1 is when blood pressure consistently ranges from 130-139 systolic or 80-89 mm Hg diastolic. At this stage of high blood pressure, doctors are likely to prescribe lifestyle changes and may consider adding blood pressure medication based on your risk of atherosclerotic cardiovascular disease (ASCVD), such as heart attack or stroke.

					Learn more about your risk with our Check. Change. Control. Calculator™.

					Hypertension Stage 2
					Hypertension Stage 2 is when blood pressure consistently ranges at 140/90 mm Hg or higher. At this stage of high blood pressure, doctors are likely to prescribe a combination of blood pressure medications and lifestyle changes.

					Hypertensive crisis
					This stage of high blood pressure requires medical attention. If your blood pressure readings suddenly exceed 180/120 mm Hg, wait five minutes and then test your blood pressure again. If your readings are still unusually high, contact your doctor immediately. You could be experiencing a hypertensive crisis.

					If your blood pressure is higher than 180/120 mm Hg and you are experiencing signs of possible organ damage such as chest pain, shortness of breath, back pain, numbness/weakness, change in vision or difficulty speaking, do not wait to see if your pressure comes down on its own. Call 911.

					Your blood pressure numbers and what they mean
					Your blood pressure is recorded as two numbers:

					Systolic blood pressure (the first number) – indicates how much pressure your blood is exerting against your artery walls when the heart beats.
					Diastolic blood pressure (the second number) – indicates how much pressure your blood is exerting against your artery walls while the heart is resting between beats.
					Which number is more important?
					Typically, more attention is given to systolic blood pressure (the first number) as a major risk factor for cardiovascular disease for people over 50. In most people, systolic blood pressure rises steadily with age due to the increasing stiffness of large arteries, long-term buildup of plaque and an increased incidence of cardiac and vascular disease.

					However, either an elevated systolic or an elevated diastolic blood pressure reading may be used to make a diagnosis of high blood pressure. According to recent studies, the risk of death from ischemic heart disease and stroke doubles with every 20 mm Hg systolic or 10 mm Hg diastolic increase among people from age 40 to 89.

					<h2>Why blood pressure is measured in mm Hg</h2>
					The abbreviation mm Hg means millimeters of mercury. Mercury was used in the first accurate pressure gauges and is still used in medicine today as the standard unit of measurement for pressure.
				</div>
			</section>
			</React.Fragment>
		);
	}
}

export default Form;
