import Axios from "axios";
import React from "react";
import App from "./App";
import Home from "./Home";
import { Link } from "react-router-dom";
import { useState, updateState } from "react";

export default class Discounts extends React.Component {
    constructor(props) {
        super(props);
        this.props.applySales();
    }



    render() {
        let header = <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>

        let cartRows = [];
        let Total = 0;
        if (this.props.list) {
            for (let i = 0; i < this.props.list.length; i++) {
                Total += this.props.list[i].Price;
                cartRows.push(
                    <tr key="{i}">
                        <td key="{i}">{this.props.list[i].Name}</td>
                        <td key="{i}">{this.props.list[i].Quantity}</td>
                        <td key="{i}">${this.props.list[i].Price}</td>
                    </tr>
                );
            }
        }
        return (
            <div>
                <table className="table">
                    {header}
                    {cartRows}
                </table>
                <Link to="/exit">
                    Checkout and Exit
                </Link>
            </div>
        );
    }
}
