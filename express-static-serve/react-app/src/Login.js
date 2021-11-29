import React, {useState, useEffect} from "react";
//import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Axios from "axios";
import "./Login.css";
import Home from "./Home";
import ReactDOM from "react-dom";


function Login(){

  const [searchUser, setSearchUser] = useState("");
  const [searchPass, setSearchPass] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  

  const submitInfo = () =>{
      Axios.post("http://localhost:3001/login/", {
      username : searchUser,     
      })
      .then((response) => {
        
          if(response){
            setIsLoggedIn(true);

            setUsername(response.data.username);
            setPassword(response.data.password);
            
          }
        
      });
      

  };

  return(
    <div className="login">
        <h1><i>QuickShop</i></h1>
        <div className="form">
            <label for="username" >Username: </label> 
            <input 
              type="text"
              name="username"
              onChange={(v) => {
                setSearchUser(v.target.value);
              }}
              />

            <label for="password" > Password (8 characters or more):</label> 
            <input 
              type="password"
              name="password"
              minLength="8"
              required
              onChange={(v)=>{
                  setSearchPass(v.target.value);
              }
            }
              />
            
            <button onClick={submitInfo} type="submit">Login</button>
            
        </div>
      </div>
  );
}


export default Login;

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
            </div>
        );
    }
}

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

ReactDOM.render(<MainPage />, document.getElementById("root"));
