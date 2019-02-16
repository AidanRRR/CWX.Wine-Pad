import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import logo from "../assets/images/cwx.svg";

interface IState {}
interface IProps {} /* extends RouteComponentProps {} */

class Navbar extends Component<IProps, IState> {
  render() {
    return (
      <div className="navbar-custom">
        <div className="container-fluid">
          <div id="navigation">
            <div className={"row"}>
              <img src={logo} alt="" className="logo-large" />
            </div>
            <ul className="navigation-menu text-center">
              <li className="has-submenu">
                <Link to={"/wijnen"}>
                  <i className="mdi mdi-airplay" />
                  Wijnen
                </Link>
              </li>
              <li className="has-submenu">
                <Link to={"/kaarten"}>
                  <i className="mdi mdi-airplay" />
                  Kaarten
                </Link>
              </li>
              <li className="has-submenu">
                <Link to={"/designer"}>
                  <i className="mdi mdi-airplay" />
                  Designer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
