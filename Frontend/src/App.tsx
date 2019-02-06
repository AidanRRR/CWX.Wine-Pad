import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import './App.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import Footer from "./components/Footer";
import Header from "./components/Header";
import Wines from "./scenes/wines/Wines";
import Menus from "./scenes/menu/Menus";
import Menu from "./scenes/menu/Menu";

const Routes = () => {
    return (
        <Fragment>
            <Route path={"/kaart/:id"} exact component={Menu}/>
            <Route path={"/kaarten"} exact component={Menus}/>
            <Route path={"/wijnen"} exact component={Wines}/>
        </Fragment>
    )
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <div className="wrapper">
                            <div className="container-fluid">
                                <Header/>
                                <Routes/>
                                <Footer/>
                            </div>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
