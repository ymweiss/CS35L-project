import React, {createContext, useContext} from "react";
//import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Axios from "axios";
import "./Login.css";
import Home from "./Home";
import ReactDOM from "react-dom";
/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
*/

export class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showLogin: false,
			showRegister: false,
		};
		this.loginBtnClick = this.loginBtnClick.bind(this);
		this.registerBtnClick = this.registerBtnClick.bind(this);
	}

	loginBtnClick() {
		this.setState ({
			showLogin: true,
			showRegister: this.state.showRegister,
		});
	}

	registerBtnClick() {
		this.setState ({
			showLogin: this.state.showLogin,
			showRegister: true,
		});
	}

	render() {
		return (
			<div>
				{!this.state.showRegister && !this.state.showLogin ?
				<button onClick={this.loginBtnClick}>login</button> :
				null}
				{this.state.showLogin ? <LoginForm /> : null}

				{!this.state.showLogin && !this.state.showRegister ?
				<button onClick={this.registerBtnClick}>register</button> :
				null}
				{this.state.showRegister ? <RegisterForm /> : null}

				<Home />
			</div>
		);
	}
}

export const handleLogin = async values => {
	Axios.post("http://localhost:3001/login", {
		username: values.user,
		password: values.password,
	}).then((response) => {
		if (response.data.isLoggedIn) {
			alert("logged in");
		}
		else {
			alert("not a valid username or password");
		}
	});
}

export const handleRegister = async values => {
	Axios.post("http://localhost:3001/register", {
		username: values.user,
		password: values.password,
	}).then((response) => {
		if (!response.body) {
			alert("account added");
		}
		else {
			alert("user already exists");
		}
	});
}


export class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			password: "",
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

	render() {
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
				<button onClick={() => {
					const {user, password} = this.state;
					handleLogin({user, password});
				}}>
					Login
				</button>
			</div>
		);
	}
}

export class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			password: "",
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

	render() {
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
				<button onClick={() => {
					const {user, password} = this.state;
					handleRegister({user, password});
				}}>
					Register
				</button>
			</div>
		);
	}
}


