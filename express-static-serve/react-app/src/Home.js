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
            paymentInformation: 0
        }
        this.getList = this.getList.bind(this);
        this.addToShoppingList = this.addToShoppingList.bind(this);
        this.displayCart = this.displayCart.bind(this);
        this.cleanCartHistory = this.cleanCartHistory.bind(this);
        this.increaseQuant = this.increaseQuant.bind(this);
        this.decreaseQuant = this.decreaseQuant.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.processPayment = this.processPayment.bind(this)
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

    processPayment(number) {

        //retrieve current balance from gift cards
        Axios.post("http://localhost:3001/getBalance",
            {
                //request the users gift card balance provided the user is logged in
            })




            .then((response) => { // treatig response as storing the value of the giftard balance
                //get current price to pay
                totalPrice = 0
                for (let i = 0; i < this.shopList.length; i++) {
                    totalPrice += this.shopList[i].Price;
                }

                if (totalPrice == 0) {

                    return 0; // no items to pay for
                }

                if (response >= totalPrice) {
                    response -= totalPrice;
                    //TODO: update the giftcard balance stored in the database
                }
                else {
                    totalPrice -= response;
                    //perform basic sanity checks on the number
                    isNumber = true;
                    for (let i = number.length - 1; i >= 0; i--) {
                        const d = s.charCodeAt(i);
                        if (d < 48 || d > 57) isNumber = false;
                    }

                }
                if (!Nnumber.toString().length != 16 || !isNumber) {
                    <p> credit card numbers must be 16 digit integers </p>
                    return 1; //credit card numbers must be 16 digit integers
                }

                <p> Thank you for shopping at QuickShop</p>
                cleanCartHistory();

            });
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

              
                <div class="payment">
                    <input type="text" //provide a textbox to type payment information into
                        value={this.state.paymentInformation} />
                    <p>Pay for Purchase</p> 
                    <button className="payPrompt" onClick={
                        () => {
                            this.setState({
                                isPaymentedSelected: true,
                            })
                            processPayment(this.state.paymentInformation)
                        }
                    }>
                      
                        Pay
                    </button>
                </div>
            </div>
           
        );
    }
}

export default Home;