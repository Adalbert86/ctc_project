import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';


class ToggleCertificateButton extends Component {

  constructor(props) {
  	super(props);
  	this.handleSubmit = this.handleSubmit.bind(this);

  }
  
   handleSubmit(event) {

	fetch('/certificateToggle/' + this.props.cert.id, {
    	method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: []
  	});

    event.preventDefault();
  }
  
  getOppositeTextVerb() {
  
  	return this.props.cert.status == 'active' ? 'deactivate' : 'activate';
  
  }
  

  render() {
    return (
    	<Button bsStyle="info" onClick={this.handleSubmit} >{this.getOppositeTextVerb()}</Button>
    );
  }

};


export default ToggleCertificateButton;

