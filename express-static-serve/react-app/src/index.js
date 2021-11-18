import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const targetName = event.target.name
		if (targetName === "email") {
			this.setState({
				email: event.target.value,
				password: this.state.password,
			});
		}
		else if (targetName === "email") {
			this.setState({
				email: this.state.email,
				password: event.target.value,
			});
		}
	}

	handleSubmit(event) {
		alert("login was submitted: ");
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					email:
					<input 
						name="email"
						value={this.state.email} 
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

ReactDOM.render(<LoginForm />, document.getElementById("root"));

