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
		};
		this.changeUsername = this.changeUsername.bind(this);
		this.checkGiftCard = this.checkGiftCard.bind(this);
		this.addBalance = this.addBalance.bind(this);
	}

	changeUsername(usernameIn) {
		this.setState({
			username: usernameIn,
		});
		console.log("username: " + this.state.username);
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
			}
		});
	}

	addBalance(balance) {
		Axios.post("http://localhost:3001/balance", {
			username: this.state.username,
			balance: balance,
		}).then(() => {
		});
	}


	render() {
		return (
			<div>
				<Router>
					<Routes>
						{/*<Route exact path="/main" element={<MainPage/>}></Route>*/}
						<Route exact path="/" element={
							<div>
								<MainPage username={this.state.username} changeUsername={this.changeUsername} />
								<Home />
							</div>
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
