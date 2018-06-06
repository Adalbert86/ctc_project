import React, { Component } from 'react';
import './App.css';

import NavbarComponent from './Components/NavbarComponent.js';
import BreadcrumbsComponent from './Components/BreadcrumbsComponent.js';
import CustomersComponent from './Components/CustomersComponent.js';
import NewCustomerComponent from './Components/NewCustomerComponent.js';
import CustomerDetailComponent from './Components/CustomerDetailComponent.js';
import NewCustomerButton from './Buttons/NewCustomerButton.js';
import AddCertificateComponent from './Components/AddCertificateComponent.js';


import { BrowserRouter, Route, Switch } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div>
        
        <NavbarComponent />

  	<Switch>
  		<Route exact path='/' component={CustomersComponent}/>
  		<Route path='/newcustomer' component={NewCustomerComponent}/>
  		<Route path='/customerdetail/:id' component={CustomerDetailComponent}/>
  		<Route path='/addcertificate/:customerid' component={AddCertificateComponent}/>
	</Switch>
	
		
	<p />
  
    <footer class="footer">
      <div class="container">
        <span class="text-muted">By Vojtech novak</span>
      </div>
    </footer>



      </div>
    );
  }
}

export default App;
