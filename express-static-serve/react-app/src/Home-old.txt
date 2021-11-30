import React, {useState, useEffect} from "react";
import Axios from "axios";
//import BrowserRouter from "react-router-dom";
import "./Home.css";

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],
            isCatSelected: false
        }
        this.showFruitCat = this.getList.bind(this);
    }

    getList(props){
        
                Axios.post("http://localhost:3001/categories", 
            
                {category: props })
                
                .then((Response) => {
                    this.setState(
                        {
                            isCatSelected: !this.state.isCatSelected,
                            list: Response.data
                        }
                    );
                    
                });
        
        }

 
    render(){

        
        let rows  = [];
        for(let i = 0; i < this.state.list.length; i++){
            rows.push(<button className ="items" key="{i}" >{this.state.list[i].name}   {this.state.list[i].price}</button>);
        }
        return(
            <div className= "categories">
                
                <button className="button"
                    onClick={ () => {
                            this.getList("produce");
                        }
                    }
                    > 
                    Produce
                </button>
                <button className= "button" onClick={
                    () => {
                        this.getList("dairy")
                    }
                }>

                    Dairy & Egg
                </button>
                
                <button className= "button" onClick= {()=>
                    this.getList("meat")
                }>
                    Meat
                </button>

                <button className= "button" onClick = {
                    () => {
                        this.getList("pantry")
                    }
                }>
                    Pantry Essential
                </button>
                <button className= "button" onClick={() => {
                    this.getList("bakery")
                }}>
                    Bakery
                </button>
               
                <div>
                    {rows 
                        // this.state.list.map( (val) => {
                        //     return <a href="{val.id}">{val.name} {val.price}</a>
                        // })
                    }
                </div>
            </div>
        );
    }
}

export default Home;
