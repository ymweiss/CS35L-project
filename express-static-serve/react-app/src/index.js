import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import App from "./App";
import Login from "./Login";
import Home from "./Home";


class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showLogin: false,
		};
		this.loginBtnClick = this.loginBtnClick.bind(this);
	}

	loginBtnClick() {
		this.setState ({
			showLogin: true,
		});
	}

	render() {
		return (
			<div>
				<button onClick={this.loginBtnClick}>login</button>
				{this.state.showLogin ? <LoginForm /> : null}
				<Home />
			</div>
		);
	}
}

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			user: "",
			password: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const targetName = event.target.name
		if (targetName === "user") {
			this.setState({
				user: event.target.value,
				password: this.state.password,
			});
		}
		else if (targetName === "password") {
			this.setState({
				user: this.state.user,
				password: event.target.value,
			});
		}
	}

	handleSubmit(event) {
		Axios.post("http://localhost:3001/login", {
			id: 4,
			username: this.state.user,
			password: this.state.password,
		}).then(() => {
			alert("added");
		});
		event.preventDefault();
	}

	render() {
		/*
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					user:
					<input 
						name="user"
						onChange={this.handleChange} 
						value={this.state.user}
					/>
				</label>
				<label>
					password:
					<input 
						name="password"
						onChange={this.handleChange}
						value={this.state.password}
					/>
				</label>
				<input type="Submit" value="Submit" />
			</form>
		);
		*/
		return (
			<div>
				<label>
					user:
					<input 
						name="user"
						onChange={this.handleChange} 
						value={this.state.user}
					/>
				</label>
				<label>
					password:
					<input 
						name="password"
						onChange={this.handleChange}
						value={this.state.password}
					/>
				</label>
				<button onClick={this.handleSubmit}>Submit</button>
			</div>
		);
	}
}

ReactDOM.render(<MainPage />, document.getElementById("root"));

