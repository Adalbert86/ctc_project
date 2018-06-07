import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class DeleteCustomerButton extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    fetch("/customer/" + this.props.customerid, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: []
    });

    event.preventDefault();
  }

  render() {
    return (
      <Button bsStyle="danger" onClick={this.handleSubmit}>
        Delete Customer
      </Button>
    );
  }
}

export default DeleteCustomerButton;
