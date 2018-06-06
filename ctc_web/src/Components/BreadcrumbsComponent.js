import React, { Component } from 'react';

import { Breadcrumbs, Breadcrumb } from 'react-bootstrap';


class BreadcrumbsComponent extends Component {

  
  render() {
    return (
      <div>
        
		<Breadcrumb>
  		<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  		<Breadcrumb.Item active>{this.props.pageName}</Breadcrumb.Item>
		</Breadcrumb>

		<p>&nbsp;</p>
      </div>
      
    );
  }
}

export default BreadcrumbsComponent;
