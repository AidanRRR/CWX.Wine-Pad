import React, { Component } from "react";
import Topnav from "./Topnav";
import Navbar from "./Navbar";

interface IProps {}
interface IState {}

class Header extends Component<IProps, IState> {
  render() {
    return (
      <header>
        <Topnav />
        <Navbar />
      </header>
    );
  }
}

export default Header;
