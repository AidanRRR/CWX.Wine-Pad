import React, { Component } from "react";
import logo from "../assets/images/cwx.svg";
import Page, { Grid, GridColumn } from "@atlaskit/page";

class Topnav extends Component {
  render() {
    return (
      <Page>
        <Grid>
          <GridColumn medium={6}>
            <img src={logo} alt="" className="logo-large" />
            Winepad.
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}

export default Topnav;
