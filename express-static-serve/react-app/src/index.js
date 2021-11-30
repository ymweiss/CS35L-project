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
			user: '',
			password: '',
		};
		this.handleChange = this.handleChange.bind(this);
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
		//alert("login was submitted: ");
		Axios.post("http://localhost:3001/login", {
			username: this.state.user,
			password: this.state.password,
		}).then((response) => {
			if(response.data) {
				alert("added");
			}
		}, (error) => {
			console.log(error);
		});
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					user:
					<input 
						name="user"
						value={this.state.user} 
						onChange={this.handleChange} 
					/>
				</label>
				<label>
					password:
					<input 
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
				</label>
				<input type="Submit" value="Submit" />
			</form>
		);
	}
}

ReactDOM.render(<MainPage />, document.getElementById("root"));

