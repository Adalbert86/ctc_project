import React, { Component } from "react";
import {
  HelpBlock,
  Grid,
  Navbar,
  Jumbotron,
  Button,
  Glyphicon,
  ProgressBar,
  Row,
  Col,
  Table,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox
} from "react-bootstrap";
import BackHomeButton from "../Buttons/BackHomeButton.js";
import BreadcrumbsComponent from "./BreadcrumbsComponent.js";
import { Redirect } from "react-router-dom";

class NewCustomerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      email: "",
      submitDisabled: true,
      redirectToNewPage: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
    this.unlockSubmitButton();
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    this.unlockSubmitButton();
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
    this.unlockSubmitButton();
  }

  submitFormData(jsonPayload) {
    // 	(async () => {
    //   const rawResponse = await fetch('https://httpbin.org/post', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({a: 1, b: 'Textual content'})
    //   });
    //   const content = await rawResponse.json();
    //
    //   console.log(content);
    // })();

    fetch("/customer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: jsonPayload
    });
  }

  handleSubmit(event) {
    if (this.isFormValidReadyToSend()) {
      // submit
      var jsonPayload = JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      });
      this.submitFormData(jsonPayload);
      this.setState({ redirectToNewPage: true });
    } else {
      alert("Make sure the form is filled out!");
    }

    event.preventDefault();
  }

  unlockSubmitButton() {
    if (this.isFormValidReadyToSend()) {
      this.setState({ submitDisabled: false });
    } else {
      this.setState({ submitDisabled: true });
    }
  }

  getValidationState() {
    const length = this.state.password.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }

  isFormValidReadyToSend() {
    return (
      this.getValidationState() == "success" &&
      this.state.name.length > 0 &&
      this.state.email.length > 0
    );
  }

  render() {
    if (this.state.redirectToNewPage) {
      return <Redirect to="/" />;
    }

    return (
      <Grid>
        <BreadcrumbsComponent pageName="New Customer" />

        <h2>Add new customer</h2>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="First name and last name"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </Col>
          </FormGroup>

          <FormGroup
            controlId="formHorizontalPassword"
            validationState={this.getValidationState()}
          >
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Password must be longer than 10 characters.</HelpBlock>
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

export default NewCustomerComponent;
