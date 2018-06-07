import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class MyGenButton extends Component {
  render() {
    return (
      <Link to={this.props.link}>
        <Button bsStyle={this.props.bstyle}>{this.props.caption}</Button>
      </Link>
    );
  }
}

export default MyGenButton;
