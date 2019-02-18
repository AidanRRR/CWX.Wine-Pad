import React, { Component } from "react";
import Topnav from "./Topnav";
import Navbar from "./Navbar";

class Header extends Component {
  render() {
    return (
      <header id="topnav">
        <Topnav />
        <Navbar />
      </header>
    );
  }
}

export default Header;
