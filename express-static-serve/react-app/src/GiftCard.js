import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class GiftCard extends Component {
    render() {
        return (
            <div className="Page">
                <form>
                    <label>
                        Enter Gift Card Code:
                        <input type="text" name="giftCardCode" />
                    </label>
                    <input type="submit" value="Submit" />
                    <Link to='/'>Go back</Link>
                </form>
            </div>
        );
    }
}