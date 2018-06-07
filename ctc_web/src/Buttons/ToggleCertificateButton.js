import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class ToggleCertificateButton extends Component {
  constructor(props) {
    super(props);
  }

  getOppositeTextVerb() {
    return this.props.cert.status == "active" ? "deactivate" : "activate";
  }

  render() {
    return (
      <Button bsStyle="info" onClick={this.props.onClick}>
        {this.getOppositeTextVerb()}
      </Button>
    );
  }
}

export default ToggleCertificateButton;
