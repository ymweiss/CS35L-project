import React, {useState, useEffect} from "react";
import {BrowserRouter as Router,
    Routes,
    Route,
    Link} from "react-router-dom";
import Exit from "./Exit";
import Home from "./Home";

class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Router>
                <Routes>
                    <Route exact path ="/" element={<Home/>}></Route>
                    <Route exact path="/exit" element={<Exit/>}></Route>
                </Routes>
                
            </Router>
            
        );
    }
    
}
export default App;