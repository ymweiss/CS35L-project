import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from "react-router-dom";
import Exit from "./Exit";
import GiftCard from "./GiftCard";
import Home from "./Home";
import { MainPage, handleLogin, handleRegister, LoginForm, RegisterForm } from "./Login";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			balance: 0,
		};
		this.changeUsername = this.changeUsername.bind(this);
		this.checkGiftCard = this.checkGiftCard.bind(this);
		this.addBalance = this.addBalance.bind(this);
	}

	changeUsername(usernameIn, balanceIn) {
		this.setState({
			username: usernameIn,
			balance: balanceIn,
		});
		console.log("username: " + this.state.username);
		//window.location.href = "http://localhost:3000/home";
	}

	checkGiftCard(code) {
		Axios.post("http://localhost:3001/giftcard", {
			giftcode: code,
		}).then((response) => {
			if (response.data.isValid) {
				alert("valid code, $" + response.data.balance + " added");
				this.addBalance(response.data.balance);
			}
			else {
				alert("invalid code");
				this.addBalance(0);
			}
		});
	}

	addBalance(balance) {
		Axios.post("http://localhost:3001/balance", {
			username: this.state.username,
			balance: balance,
		}).then((response) => {
			this.setState({
				username: this.state.username,
				balance: response.data.balance,
			});
		});
	}


	render() {
		const isLoggedIn = this.state.username != "";
		return (
			<div>
				<Router>
					<Routes>
						<Route exact path="/home" element={
						<div>
							{isLoggedIn ?
								<div>
									<label>{this.state.username}</label>
									<Link to='/GiftCard'> Enter Gift Card</Link >
									<label> Balance: ${this.state.balance}</label>
									<Home />
								</div> :
								<Link to='/'>login/register</Link >
							}
						</div>
						}></Route>
						<Route exact path="/" element={
							<MainPage username={this.state.username} 
								balance={this.state.balance} changeUsername={this.changeUsername} 
							/>
						}></Route>
						<Route exact path="/GiftCard" element={
							<GiftCard username={this.state.username}
								checkGiftCard={this.checkGiftCard} />
						}></Route>
						<Route exact path="/exit" element={<Exit />}></Route>
					</Routes>

				</Router>
			</div>
		);
	}
}

export default App;
