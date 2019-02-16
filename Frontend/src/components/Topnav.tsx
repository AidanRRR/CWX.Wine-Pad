import React, { Component } from "react";
import logo from "../assets/images/cwx.svg";

class Topnav extends Component {
  render() {
    return (
      <div className="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            <div className={"row"}>
              <div className={"col-md-4"}>
                <div className="logo">
                  <a className="logo">
                    <img src={logo} alt="" className="logo-large" />
                  </a>
                </div>
              </div>
              <div className={"col-md-4 text-center"}>
                <h1>Winepad</h1>
              </div>
              <div className={"col-md-4"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Topnav;
