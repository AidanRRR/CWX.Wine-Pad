import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import Footer from "./components/Footer";
import Header from "./components/Header";
import Wines from "./scenes/Wines";
import Card from "./scenes/Card";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="wrapper">
                    <div className="container-fluid">
                        <Router>
                            <div>
                                {/*<Route path={"/restaurants"} exact component={Restaurants} />*/}
                                <Route path={"/cards"} exact component={Card} />
                                <Route path={"/wines"} exact component={Wines} />
                            </div>
                        </Router>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
