import React, {useState, useEffect} from "react";
import Axios from "axios";
import {BrowserRouter as Router,
    Routes,
    Route,
    Link} from "react-router-dom";
import "./Home.css";
import Exit from "./Exit";

function Search(){
    const [searchStr, setSearchStr] = useState("");
    const [items, setItems] = useState([]);

    const searchItem = () => {
        
            Axios.post("http://localhost:3001/search", 
            {search: searchStr})
            .then( (response) => {
                    setItems(response.data);
            });
    }

    let searchRows = [];
        for(let i =0; i < this.state.searchedList.length; i++){
            searchRows.push(
                <ul key="{i}">
                    <li key="{i}"> 
                        {this.state.searchedList[i].name} <br/>
                        {this.state.searchedList[i].price} <br/>
                        <button key = "{i}">Add</button>
                    </li>
                </ul>
            );
        }
    return(
        <div>
            <div class="search">
                <form>
                    <input type="text" 
                        onChange= {(v) => {
                            setSearchStr(v.target.value);
                            if( v.target.value.length <= 0){
                                setItems([]);
                            }
                            else{
                                searchItem();
                            }
                            
                        }} 
                    placeholder="Search"/>
                    {/* <input type="submit" 
                        value="Search"
                    /> */}
                </form>
                {

                }

            </div>
        </div>
        
    );

}


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
            itemList:[],
            searchString:"",
            searchedList: [],
            isSearched: false,
            shopList: [],
            isCatSelected: false,
            saleList: [],
            saleItem: null
        }

        this.getList = this.getList.bind(this);
        this.addToShoppingList = this.addToShoppingList.bind(this);
        this.displayCart = this.displayCart.bind(this);
        this.cleanCartHistory = this.cleanCartHistory.bind(this);
        this.increaseQuant = this.increaseQuant.bind(this);
        this.decreaseQuant = this.decreaseQuant.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.applySales = this.applySales.bind(this);
    }


    applySales() {
        for (let i = 0; i < this.state.shopList.length; i++) {
            Axios.get("http://localhost:3001/checkSale", { params: { name: this.state.shopList[i].Name } })
                .then((response) => {
                    this.setState({
                        saleItem: response.data,
                    });

            if (this.state.saleItem) {
                //alert(i + JSON.stringify(this.state.saleItem));
                if (this.state.saleItem.length > 0) {
                    let quantity = this.state.shopList[i].Quantity;
                    let price = quantity * this.state.saleItem[0]["base_price"];
                    let q = Math.floor(this.state.shopList[i].Quantity / this.state.saleItem[0]["quantity"]); // # of times to apply discount
                    let temp_list = this.state.shopList;
                    temp_list[i].Price = price - (q * this.state.saleItem[0]["base_price"]) + (q * this.state.saleItem[0]["discount_price"]); //apply discount
                    this.setState({
                        shopList: temp_list
                    });
                }
                    }
                })
        }
    }

 
   
    componentDidMount(){
        Axios.get("http://localhost:3001/cart")
        .then((response) => {
            this.setState({
                
                shopList: response.data,
            });
        })
    }

    increaseQuant(props){
        Axios.post("http://localhost:3001/increase", 
            {props})
        .then((response) => {
            if(response){
                this.displayCart();
            }
        });
    }

    decreaseQuant(props){
        Axios.post("http://localhost:3001/decrease", 
            {props})
        .then((response) => {
            if(response){
                this.displayCart();
            }
        });
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
        Axios.post("http://localhost:3001/shopping", 
            {props}
        ).then((response) => {
            if(response.data){
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

                Axios.post("http://localhost:3001/categories", 
            
                {category: props })

                .then((Response) => {
                    this.setState(
                        {
                            isCatSelected: true,
                            itemList: Response.data
                        }
                    );
                    
                });
        }    

    updateSearchList(){
        if(!this.state.searchString.length){
            this.setState({
                searchedList: [],
            });
        }
    }

    searchItem(){
        let sList = [];
        let cat = ["produce", "meat" , "pantry", "dairy", "bakery"];

        for(let i = 0; i < cat.length; i++){
            Axios.post("http://localhost:3001/search", 
                {
                    search: this.state.searchString,
                    category: cat[i]
                })
                .then( (response) => {
                    if(response){
                        sList.push(response.data);
                        this.setState({
                            searchedList: sList,
                        });
                    }
                    
                
            });
        }
        
    }

    

    render(){
        let header = <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Update Quantity</th>
                    </tr>;

        let searchRows = [];
        for(let i =0; i < this.state.searchedList.length; i++){
            for(let j = 0; j < this.state.searchedList[i].length; j++){
                searchRows.push(
                    <ul key="{i}">
                        <li key="{i}"> 
                            {this.state.searchedList[i][j].name}&ensp; 
                            ${this.state.searchedList[i][j].price}&ensp;
                            <button key="{i}" onClick={ () => {
                                this.addToShoppingList(this.state.searchedList[i][j]);
                            }}>
                                Add
                            </button>
                        </li>
                    </ul>
                );
            }
            
        }

        let rows  = [];
        for(let i = 0; i < this.state.itemList.length; i++){
            rows.push(
            <button className ="items" 
                key="{i}" 
                onClick={() => 
                    {this.addToShoppingList(this.state.itemList[i])}
                }>
                {this.state.itemList[i].name}&ensp;${this.state.itemList[i].price}
            </button>);
        }

        let cartRows = [];
        let Total = 0;
        for(let i = 0; i < this.state.shopList.length; i++){
            Total += this.state.shopList[i].Price;
            cartRows.push(
                <tr key="{i}">
                    <td key="{i}">{this.state.shopList[i].Name}</td>
                    <td key="{i}">{this.state.shopList[i].Quantity}</td>
                    <td key="{i}">${this.state.shopList[i].Price}</td>
                    <td key="{i}"> 
                    <button key="{i}" onClick={
                        () => {this.increaseQuant(this.state.shopList[i])}
                    }>
                        &#8593;</button> 
                        
                        <button key="{i}" onClick={
                            () => {this.decreaseQuant(this.state.shopList[i])}
                        }>
                            &#8595;</button>
                    </td>
                </tr>
            );
        }

        return(
            <div >
                <div class="div-1">
                    Let's QuickShop
                    <p>
                        <Link to="/exit">Logout</Link>
                    </p>
                </div>
                
                    <div class="search">
                            <input type="text" 
                                onChange= {(v) => {
                                    this.setState({
                                        searchString: v.target.value,
                                        searchedList: []
                                    });
                             }}
                            placeholder="Search"/>
                        <span>
                            <button type="submit" 
                                value="Search"
                                onClick = {() => {
                                    this.searchItem();
                                    this.setState({isSearched: true})}}
                            > Search </button>
                        </span>

                        {this.state.isSearched? searchRows: null}
                    </div>
                
                    <div class="cart">
                        <p>Shopping Cart</p>
                    {this.state.shopList.length > 0? 
                        <div>
                            <table className="table">
                                {header}
                                {cartRows}
                            </table>
                            
                            <br/>
                                Total: ${Total.toFixed(2)}
                            <br/>
                            <button className="clear" onClick={ () =>
                                {this.cleanCartHistory()}}>
                                Remove All 
                            </button>

                            <button className="sales" onClick={ () =>
                                {this.applySales()}}>
                                Apply Discounts
                                </button>
                                 
                            <button className="checkout" onClick={ ()=>{
                                this.cleanCartHistory();}
                            }>
                                Checkout
                            </button> 
                        </div>
                    : null}
                    </div>

                <div class="categories">
                    <p>Browse Category</p>
                    <div class="buttons">
                        <button class="button"
                            onClick={ () => {
                                    this.getList("produce");
                                }
                            }
                            > 
                            Produce
                        </button>

                        <button class= "button" 
                            onClick={() => {
                                    this.getList("dairy")
                                }
                            }>
                            Dairy & Egg
                        </button>

                        <button class= "button" onClick= {()=>
                            this.getList("meat")
                        }>
                            Meat
                        </button>

                        <button class= "button" onClick = {
                            () => {
                                this.getList("pantry")
                            }
                        }>
                            Pantry Essential
                        </button>

                        <button class= "button" onClick={() => {
                            this.getList("bakery")
                        }}>
                            Bakery
                        </button>


                    </div>
                        
                </div>

                <div class="div-3">
                    {this.state.isCatSelected? rows: null}

                    {!this.state.isCatSelected? null:
                            <button className="back-button" onClick={
                                () => {this.setState({
                                    isCatSelected: false,
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