import React, { useState, useEffect } from "react";
//import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Axios from "axios";
import "./Login.css";
import Home from "./Home";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Routes,
	Link,
	useRouteMatch,
	useParams
} from "react-router-dom";




export class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showLogin: false,
			showRegister: false,
			username: "",
			balance: 0,
		};
		this.loginBtnClick = this.loginBtnClick.bind(this);
		this.registerBtnClick = this.registerBtnClick.bind(this);
		this.setUserData = this.setUserData.bind(this);

	}

	componentDidMount() {
		if (this.props.username != "") {
			this.setState({
				username: this.props.username,
				showLogin: true,
				showRegister: true,
				balance: this.props.balance,
			});
			this.setUserData(this.props.username, this.props.balance);
		}
	}


	setUserData(usernameIn, balance) {
		this.props.changeUsername(usernameIn, balance);
		this.setState({
			showLogin: this.state.showLogin,
			showRegister: this.state.showRegister,
			username: usernameIn,
			balance: balance
		});
	}

	loginBtnClick() {
		this.setState({
			showLogin: true,
			showRegister: this.state.showRegister,
			username: this.state.username,
			balance: this.state.balance,
		});
	}

	registerBtnClick() {
		this.setState({
			showLogin: this.state.showLogin,
			showRegister: true,
			username: this.state.username,
			balance: this.state.balance,
		});
	}


	render() {
		const isLoggedIn = (this.state.username != "");
		return (
			<div>
				{!this.state.showRegister && !this.state.showLogin && !isLoggedIn ?
					<button onClick={this.loginBtnClick}>login</button> :
					null}
				{this.state.showLogin && !isLoggedIn ? 
					<LoginForm username={this.state.username} setUserData={this.setUserData} /> :
				null}

				{!this.state.showLogin && !this.state.showRegister && !isLoggedIn?
					<button onClick={this.registerBtnClick}>register</button> :
					null}
				{this.state.showRegister && !isLoggedIn ?
					<RegisterForm setUserData={this.setUserData} /> :
					null}
				{isLoggedIn ? <Link to='/home'>Go to homepage</Link > : null}
			</div>
		);
	}
}

export class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			password: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	componentDidMount() {
		if (this.props.username != "") {
			this.setState({
				user: this.props.username,
				password: "",
			});

			Axios.post("http://localhost:3001/restorelogin", {
				username: this.props.username,
			}).then((response) => {
				console.log("balance: " + response.data.balance);
				this.props.setUserData(this.props.username, response.data.balance);
			})
		}
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

	handleLogin() {
		Axios.post("http://localhost:3001/login", {
			username: this.state.user,
			password: this.state.password,
		}).then((response) => {
			if (response.data.isLoggedIn) {
				alert("logged in");
				this.props.setUserData(this.state.user, response.data.balance);
			}
			else {
				alert("not a valid username or password");
			}
		});
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
					const { user, password } = this.state;
					this.handleLogin();
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
		this.handleRegister = this.handleRegister.bind(this);
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

	handleRegister() {
		Axios.post("http://localhost:3001/register", {
			username: this.state.user,
			password: this.state.password,
		}).then((response) => {
			if (!response.body) {
				alert("account added");
				this.props.setUserData(this.state.user, 0);
			}
			else {
				alert("user already exists");
			}
		});
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
					const { user, password } = this.state;
					this.handleRegister();
				}}>
					Register
				</button>
			</div>
		);
	}
}
