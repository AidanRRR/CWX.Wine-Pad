import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import Footer from "./components/footer";
import Header from "./components/header";
import Wijnen from "./scenes/wijnen";
import Restaurants from "./scenes/restaurants";
import Kaarten from "./scenes/kaarten";

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
                                <Route path={"/kaarten"} exact component={Kaarten} />
                                <Route path={"/wijnen"} exact component={Wijnen} />
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
