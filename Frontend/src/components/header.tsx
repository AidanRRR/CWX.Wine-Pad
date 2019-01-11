import React, {Component} from 'react';
import logo from './../assets/images/logo.png';
import Topnav from "./topnav";
import Navbar from "./navbar";

class Header extends Component {
    render() {
        return (
            <header id="topnav">
                <Topnav />
                <Navbar/>
            </header>
        );
    }
}

export default Header;