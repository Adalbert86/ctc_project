import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class CertificateDeleteButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button bsStyle="danger" onClick={this.props.onClick}>
        Delete
      </Button>
    );
  }
}

export default CertificateDeleteButton;
