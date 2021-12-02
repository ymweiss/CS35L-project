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
import Discounts from "./Discounts";
import { MainPage, handleLogin, handleRegister, LoginForm, RegisterForm } from "./Login";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			balance: 0,
			list: [],
			saleItem: null
		};
		this.changeUsername = this.changeUsername.bind(this);
		this.checkGiftCard = this.checkGiftCard.bind(this);
		this.addBalance = this.addBalance.bind(this);
		this.applySales = this.applySales.bind(this);
	}



	changeUsername(usernameIn, balanceIn) {
		this.setState({
			username: usernameIn,
			balance: balanceIn,
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

	applySales() { //check sale table for applicable discounts
		Axios.get("http://localhost:3001/cart")
			.then((response) => {
				this.setState({
					list: response.data
				});

				for (let i = 0; i < this.state.list.length; i++) {
					Axios.get("http://localhost:3001/checkSale", { params: { name: this.state.list[i].Name } })
						.then((response) => {
							this.setState({
								saleItem: response.data,
							});
							if (this.state.saleItem) {
								if (this.state.saleItem.length > 0) {
									let quantity = this.state.list[i].Quantity;
									let price = quantity * this.state.saleItem[0]["base_price"];
									let q = Math.floor(this.state.list[i].Quantity / this.state.saleItem[0]["quantity"]); // # of times to apply discount
									let temp_list = this.state.list;
									temp_list[i].Price = price - (q * this.state.saleItem[0]["base_price"]) + 
										(q * this.state.saleItem[0]["discount_price"]*this.state.saleItem[0]["base_price"]); //apply discount
									this.setState({
										list: temp_list
									});
								}
							}
						})
				}

			})
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
						<Route exact path="/applyDiscounts" element={
							<Discounts list={this.state.list} applySales={this.applySales} />}></Route >
						<Route exact path="/exit" element={<Exit />}></Route>
					</Routes>

				</Router>
			</div>
		);
	}
}

export default App;
