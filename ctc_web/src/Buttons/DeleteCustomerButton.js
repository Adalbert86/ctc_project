import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class DeleteCustomerButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button bsStyle="danger" onClick={this.props.onClick}>
        Delete Customer
      </Button>
    );
  }
}

export default DeleteCustomerButton;
