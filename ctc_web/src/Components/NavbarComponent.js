import React, { Component } from "react";
import { Grid, Navbar, Jumbotron } from "react-bootstrap";

class NavbarComponent extends Component {
  render() {
    return (
      <Navbar inverse staticTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">CTC (Customers and their Certificates)</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Navbar>
    );
  }
}

export default NavbarComponent;
