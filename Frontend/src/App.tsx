import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import './App.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import Footer from "./components/Footer";
import Header from "./components/Header";
import Wines from "./scenes/Wines";
import Card from "./scenes/Card";

const Routes = () => {
    return (
        <Fragment>
            <Route path={"/wijnen"} exact component={Wines}/>
            <Route path={"/kaarten"} exact component={Card}/>
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
