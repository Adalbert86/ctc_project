import React, { Component } from "react";
import MyGenButton from "./MyGenButton.js";

class BackHomeButton extends Component {
  render() {
    return <MyGenButton link="/" caption="Back" bstyle="link" />;
  }
}

export default BackHomeButton;
