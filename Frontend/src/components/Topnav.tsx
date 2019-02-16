import React, { Component } from "react";
import logo from "../assets/images/logo.png";

class Topnav extends Component {
  render() {
    return (
      <div className="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            <div className="logo">
              <a className="logo">
                <img src={logo} alt="" className="logo-large" />
              </a>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    );
  }
}

export default Topnav;
