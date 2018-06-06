import React, { Component } from 'react';
import MyGenButton from './MyGenButton.js'



class NewCustomerButton extends Component {

  render() {
    return (
    	
    	<MyGenButton link="/newcustomer" caption="Add new customer" bstyle="primary" />
    );
  }
};


export default NewCustomerButton;

