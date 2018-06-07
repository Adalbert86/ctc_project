import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
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
import BreadcrumbsComponent from "./BreadcrumbsComponent.js";
import ToggleCertificateButton from "../Buttons/ToggleCertificateButton.js";
import CertificateDeleteButton from "../Buttons/CertificateDeleteButton.js";
import DeleteCustomerButton from "../Buttons/DeleteCustomerButton.js";
import { Redirect } from "react-router-dom";

class CustomerDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { customer: "", certificates: [], redirectToNewPage: false };
  }

  async handleToggleBtnClick(id) {
    await fetch("/certificateToggle/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: []
    }).catch(function() {
      console.log("Error, I will catch them here TODO");
    });

    this.refreshCertificateData();
  }

  async handleCertDeleteBtnClick(id) {
    await fetch("/certificate/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: []
    }).catch(function() {
      console.log("Error, I will catch them here TODO");
    });

    this.refreshCertificateData();
  }

  async handleDeleteeBtnClick(customerid) {
    await fetch("/customer/" + customerid, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: []
    }).catch(function() {
      console.log("Error, I will catch them here TODO");
    });

    this.setState({ redirectToNewPage: true });
  }

  refreshCertificateData() {
    fetch("/certificateByCustomer/" + this.props.match.params.id)
      .then(res => res.json())
      .then(certificates => this.setState({ certificates }))
      .catch(function() {
        console.log("Error, I will catch them here TODO");
      });
  }

  componentDidMount() {
    fetch("/customer/" + this.props.match.params.id)
      .then(res => res.json())
      .then(customer => this.setState({ customer }))
      .catch(function() {
        console.log("Error, I will catch them here TODO");
      });

    this.refreshCertificateData();
  }

  render() {
    if (this.state.redirectToNewPage) {
      return <Redirect to="/" />;
    }

    return (
      <Grid>
        <BreadcrumbsComponent pageName="Customer detail" />
        <h2>Customer {this.state.customer.name} detail</h2>
        Name: {this.state.customer.name}
        <br />
        Email: {this.state.customer.email}
        <br />
        <h3>Table of issued certificated to the customer:</h3>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>privatekey</th>
              <th>body</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.certificates.map(c => (
              <tr>
                <td>{c.id}</td>
                <td>{c.privatekey}</td>
                <td>{c.body}</td>
                <td>{c.status}</td>
                <td>
                  <span>
                    <ToggleCertificateButton
                      cert={c}
                      onClick={this.handleToggleBtnClick.bind(this, c.id)}
                    />
                  </span>
                  &nbsp;
                  <span>
                    <CertificateDeleteButton
                      cert={c}
                      onClick={this.handleCertDeleteBtnClick.bind(this, c.id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        Total number of {this.state.certificates.length} certificates.<br />
        <p>&nbsp;</p>
        <Link to={"/addcertificate/" + this.props.match.params.id}>
          <Button bsStyle="primary">Add new certificate</Button>
        </Link>
        <DeleteCustomerButton
          customerid={this.props.match.params.id}
          onClick={this.handleDeleteeBtnClick.bind(
            this,
            this.props.match.params.id
          )}
        />
      </Grid>
    );
  }
}

export default CustomerDetailComponent;
