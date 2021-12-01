import React, { useState, useEffect } from "react";
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
	}

	changeUsername(usernameIn) {
		this.setState({
			username: usernameIn,
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
								<MainPage changeUsername={this.changeUsername} />
								<Home />
							</div>
						}></Route>
						<Route exact path="/GiftCard" element={<GiftCard />}></Route>
						<Route exact path="/exit" element={<Exit />}></Route>
					</Routes>

				</Router>
			</div>
		);
	}

}
export default App;
