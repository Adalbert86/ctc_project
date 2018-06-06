import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron, Button, Glyphicon, ProgressBar, Row, Col, Table, Form, FormGroup, FormControl, ControlLabel, Checkbox  } from 'react-bootstrap';
import BreadcrumbsComponent from './BreadcrumbsComponent.js';
import NewCustomerButton from '../Buttons/NewCustomerButton.js';
// import DeleteCustomerButton from '../Buttons/DeleteCustomerButton.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class CustomersComponent extends Component {

	constructor() {
		super();
		this.state = {customers: []};
		
		this.handleBtnClick = this.handleBtnClick.bind(this);
	}

		
	handleBtnClick(event) {

		this.refreshTable();			
  	}
  	
  	refreshTable() {
  	
  	  fetch('/customer')
		.then(res => res.json())
		.then(customers => this.setState({ customers }));
  	}	

	componentDidMount() {
		
		this.refreshTable();			
	}

  render() {
    return (

<Grid>

<BreadcrumbsComponent pageName="Existing Users" />

<h2>Table of existing users</h2>


<Table responsive bordered>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  	    {this.state.customers.map(customer =>
              <tr>
      			<td>{customer.id}</td>
      			<td>{customer.name}</td>
      			<td>{customer.email}</td>

      			<td><Link to={"/customerdetail/"+customer.id} ><Button>edit</Button></Link>&nbsp; 
      				<Link to={"/addcertificate/"+customer.id} ><Button>add certificate</Button></Link>&nbsp;</td>
    		   </tr>
        )}
  
  </tbody>
</Table>

Total number of {this.state.customers.length} customers.<br />

<p>&nbsp;</p>

<NewCustomerButton />
</Grid>

    );
  }
}

export default CustomersComponent;
