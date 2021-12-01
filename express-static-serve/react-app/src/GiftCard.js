import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class GiftCard extends Component {
    render() {
        return (
            <div className="Page">
                <form>
                    <Link to='/'>Go back</Link>
                </form>
            </div>
        );
    }
}