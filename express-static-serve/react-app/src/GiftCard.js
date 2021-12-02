import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class GiftCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState(state => ({ code: event.target.value }));
    }

    handleSubmit(event) {
        this.props.checkGiftCard(this.state.code);
    }


    render() {
        const { username } = this.props;
        return (
            <div className="Page">
                <label>
                    Hello, {username}! Enter Gift Card Code:
                    <br />
                    <input type="text" value={this.state.code} onChange={this.handleChange} />
                </label>
                <Button onClick={this.handleSubmit} >
                    Submit
                </Button>
                <Link to='/home'>Go back</Link>
            </div>
        );
    }
}
