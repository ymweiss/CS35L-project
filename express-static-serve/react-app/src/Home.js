import React, {useState, useEffect} from "react";
import Axios from "axios";
//import BrowserRouter from "react-router-dom";
import "./Home.css";

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
            itemList:[],
            
            shopList: [],
            isCartUpdated: false,
            isCartSelected: false
        }
        this.getList = this.getList.bind(this);
        this.addToShoppingList = this.addToShoppingList.bind(this);
        this.displayCart = this.displayCart.bind(this);
        this.cleanCartHistory = this.cleanCartHistory.bind(this);
    }

    componentDidMount(){
        Axios.get("http://localhost:3001/cart")
        .then((response) => {
            this.setState({
                
                shopList: response.data,
            });
        })
    }

    displayCart(){
        Axios.get("http://localhost:3001/cart")
        .then((response) => {
            this.setState({
                
                shopList: response.data,
            });
        })
    }

    addToShoppingList(props){
        //this.setState({shopList: props});
        Axios.post("http://localhost:3001/shopping", 
            {props}
        ).then((response) => {
            if(response.data){
                this.setState({
                    isCartUpdated: true,
                });
                this.displayCart();
            }
        })
        

    }

    cleanCartHistory(){
        Axios.get("http://localhost:3001/deletecart")
        .then((response) => {
            if(response){
                this.setState({
                    shopList: [],
                });
            }
        });
        

    }

    getList(props){

            if(this.state.isCartSelected){
                this.setState({
                    isCartSelected: !this.state.isCartSelected,
                    itemList: []
                })
            }
            
            else{
                Axios.post("http://localhost:3001/categories", 
            
                {category: props })

                .then((Response) => {
                    this.setState(
                        {
                            isCartSelected: !this.state.isCartSelected,
                            itemList: Response.data
                        }
                    );
                    
                });
            }
                
        }

    

    render(){
        let rows  = [];
        for(let i = 0; i < this.state.itemList.length; i++){
            rows.push(
            <button className ="items" 
                key="{i}" 
                onClick={() => 
                    {this.addToShoppingList(this.state.itemList[i])}
                }>
                {this.state.itemList[i].name}   {this.state.itemList[i].price}
            </button>);
        }

        let cartRows = []
        let Total = 0;
        
        for(let i = 0; i < this.state.shopList.length; i++){
            Total += this.state.shopList[i].Price;
            cartRows.push(
                <tr key="{i}">
                    <td key="{i}">{this.state.shopList[i].Name}</td>
                    <td key="{i}">{this.state.shopList[i].Quantity}</td>
                    <td key="{i}">${this.state.shopList[i].Price}</td>
                </tr>
            );
        }

        return(
            <div >
                <div class="div-1">
                    Let's QuickShop
                </div>

                <div class="cart">
                    <h3>
                        Shopping Cart
                    </h3>
                    <table className="table">
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                        {cartRows}
                        
                    </table>
                
                    <p>Total: ${Total.toFixed(2)}</p>
                    <button className="clear" onClick={this.cleanCartHistory}>Remove All</button>

                </div>
                
                <div className="categories">
                    Shopping Categories
                    {this.state.isCartSelected? null: 
                        <button className="button"
                            onClick={ () => {
                                    this.getList("produce");
                                }
                            }
                            > 
                            Produce
                        </button>}

                    {this.state.isCartSelected? null: 
                        <button className= "button" 
                            onClick={() => {
                                    this.getList("dairy")
                                }
                            }>
                            Dairy & Egg
                        </button>
                    }
                    {this.state.isCartSelected? null: 
                        <button className= "button" onClick= {()=>
                            this.getList("meat")
                        }>
                            Meat
                        </button>
                    }
                    
                    {this.state.isCartSelected? null: 
                        <button className= "button" onClick = {
                            () => {
                                this.getList("pantry")
                            }
                        }>
                            Pantry Essential
                        </button>
                    }
                    {this.state.isCartSelected? null: 
                        <button className= "button" onClick={() => {
                            this.getList("bakery")
                        }}>
                            Bakery
                        </button>
                    }
                    <div>
                        {this.state.isCartSelected? rows: null}
                    </div>
                    
                    
                    {!this.state.isCartSelected? null:
                            <button className="back-button" onClick={
                                () => {this.setState({
                                    isCartSelected: false,
                                    isCartUpdated: false,
                                })}
                            }>
                                Back
                            </button>
                        }
                        
                </div>
               
            </div>
           
        );
    }
}
export default Home;
