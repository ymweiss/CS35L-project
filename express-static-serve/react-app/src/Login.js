import React, {useState, useEffect} from "react";
//import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Axios from "axios";
import "./Login.css";
import Home from "./Home";


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
