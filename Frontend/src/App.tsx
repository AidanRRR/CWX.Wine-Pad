import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import Wines from "./scenes/wines/Wines";
import Menus from "./scenes/menu/Menus";
import Menu from "./scenes/menu/Menu";
import MenuDesigner from "./scenes/menu-designer/MenuDesigner";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import {
  createTheme,
  AtlaskitThemeProvider,
  themed,
  colors
} from "@atlaskit/theme";
import Header from "./components/Header";

const Routes = () => {
  return (
    <Fragment>
      <Route path={"/kaart/:id"} exact component={Menu} />
      <Route path={"/kaarten"} exact component={Menus} />
      <Route path={"/wijnen"} exact component={Wines} />
      <Route path={"/designer"} exact component={MenuDesigner} />
    </Fragment>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <AtlaskitThemeProvider mode={"dark"}>
          <Router>
            <div>
              <Header />
              <Routes />
            </div>
          </Router>
        </AtlaskitThemeProvider>
      </div>
    );
  }
}

export default App;
