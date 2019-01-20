import React, {Component} from 'react';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-custom">
                <div className="container-fluid">
                    <div id="navigation">
                        <ul className="navigation-menu text-center">
                            {/*<li className="has-submenu">*/}
                                {/*<a href="restaurants">*/}
                                    {/*<i className="mdi mdi-airplay"/>*/}
                                    {/*Restaurants*/}
                                {/*</a>*/}
                            {/*</li>*/}
                            <li className="has-submenu">
                                <a href="wines">
                                    <i className="mdi mdi-airplay"/>
                                    Wijnen
                                </a>
                            </li>
                            <li className="has-submenu">
                                <a href="cards">
                                    <i className="mdi mdi-airplay"/>
                                    Kaarten
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;