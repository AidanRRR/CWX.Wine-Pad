import React, { Component } from "react";
import { RouteComponentProps, RouterProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import wine from "../assets/images/wine-icon.svg";

interface IState {}
interface IProps extends RouteComponentProps {}

class Navbar extends Component<IProps, IState> {
  render() {
    const { location } = this.props;
    const activeLink = location.pathname;

    const linkClass = "col-sm-4 text-center menu-choose";
    const activeLinkClass = "col-sm-4 text-center menu-choose-active";

    return (
      <div className={"row menu-container mb-5 mt-5 justify-content-md-center"}>
        <div className={activeLink === "/wijnen" ? activeLinkClass : linkClass}>
          <Link to={"wijnen"}>
            <div className={"menu-choose-item"}>Wijnen</div>
          </Link>
        </div>
        <div
          className={activeLink === "/kaarten" ? activeLinkClass : linkClass}
        >
          <Link to={"kaarten"}>
            <div className={"menu-choose-item"}>Kaarten</div>
          </Link>
        </div>
        <div
          className={activeLink === "/designer" ? activeLinkClass : linkClass}
        >
          <Link to={"designer"}>
            <div className={"menu-choose-item"}>Designer</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter<IProps>(Navbar);
