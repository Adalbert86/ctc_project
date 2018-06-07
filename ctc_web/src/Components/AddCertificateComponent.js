import React, { Component } from "react";
import {
  Grid,
  Button,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox
} from "react-bootstrap";
import BreadcrumbsComponent from "./BreadcrumbsComponent.js";
import NewCustomerButton from "../Buttons/NewCustomerButton.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BackHomeButton from "../Buttons/BackHomeButton.js";
import { Redirect } from "react-router-dom";

class CustomersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: "",
      privatekey: "",
      body: "",
      submitDisabled: false,
      redirectToNewPage: false
    };

    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handlePKChange = this.handlePKChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isFormValidReadyToSend() {
    return (
      this.state.privatekey.trim() != "" &&
      this.state.body.trim() != "" &&
      this.state.privatekey.length > 0 &&
      this.state.body.length > 0
    );
  }

  handlePKChange(event) {
    this.setState({ privatekey: event.target.value });
  }

  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  handleSubmit(event) {
    if (this.isFormValidReadyToSend()) {
      // submit
      var jsonPayload = JSON.stringify({
        customer_id: this.state.customer.id,
        privatekey: this.state.privatekey,
        body: this.state.body,
        status: "active"
      });

      fetch("/certificate", {method: "POST", headers: {Accept: "application/json",
          "Content-Type": "application/json"}, body: jsonPayload })
          .then( function() { console.log("ok"); }).catch( function() { console.log("Error while fetching data ... TODO"); });
          


    

      this.setState({ redirectToNewPage: true });
    } else {
      alert("Make sure the form is filled out!");
    }

    event.preventDefault();
  }

  componentDidMount() {
    fetch("/customer/" + this.props.match.params.customerid)
      .then(res => res.json())
      .then(customer => this.setState({ customer }));
  }

  render() {
    if (this.state.redirectToNewPage) {
      return <Redirect to={"/customerdetail/" + this.state.customer.id} />;
    }

    return (
      <Grid>
        <BreadcrumbsComponent pageName="New Certificate" />

        <h2>Add new certificate for {this.state.customer.name}</h2>

        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              Private Key
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Private key"
                value={this.state.privatekey}
                onChange={this.handlePKChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Body
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Body"
                value={this.state.body}
                onChange={this.handleBodyChange}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox checked disabled>
                active
              </Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button
                bsStyle="success"
                type="submit"
                disabled={this.state.submitDisabled}
              >
                Create
              </Button>
            </Col>
          </FormGroup>
        </Form>

        <BackHomeButton />
      </Grid>
    );
  }
}

export default CustomersComponent;
