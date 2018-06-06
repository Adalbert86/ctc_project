import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';


class CertificateDeleteButton extends Component {

  constructor(props) {
  	super(props);
  	this.handleSubmit = this.handleSubmit.bind(this);

  }
  
   handleSubmit(event) {

	fetch('/certificate/' + this.props.cert.id, {
    	method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: []
  	});

    event.preventDefault();
  }
  

  render() {
    return (
    	<Button bsStyle="danger" onClick={this.handleSubmit} >Delete</Button>
    );
  }

};


export default CertificateDeleteButton;

