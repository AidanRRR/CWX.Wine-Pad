import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {Link} from "react-router-dom";

interface IState {}
interface IProps {} /* extends RouteComponentProps {} */

class Navbar extends Component<IProps, IState> {
    render() {
        return (
            <div className="navbar-custom">
                <div className="container-fluid">
                    <div id="navigation">
                        <ul className="navigation-menu text-center">
                            <li className="has-submenu">
                                <Link to={'/wijnen'}>
                                    <i className="mdi mdi-airplay"/>
                                    Wijnen
                                </Link>
                            </li>
                            <li className="has-submenu">
                                <Link to={'/kaarten'}>
                                    <i className="mdi mdi-airplay"/>
                                    Kaarten
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