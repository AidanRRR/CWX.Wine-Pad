import React, { Component, Fragment } from "react";
import Splash from "../../components/menu-designer/0/Splash";

interface IProps {}
interface IState {}

class MenuDesigner extends Component<IProps, IState> {
  render() {
    return (
      <div className={"row"} style={{ marginTop: 50 }}>
        <div className={"col-md-4"}>
          <div className={"card"}>
            <div className="card-body">
              <h4 className="card-title font-20 mt-0">Designer</h4>
              <b>Achtergrond afbeelding</b>
              <ul>
                <li>Afbeelding</li>
                <li>Doorzichtigheid</li>
              </ul>
              <br />
              <b>Achtergrondkleur</b>
              <ul>
                <li>Kleur</li>
                <li>Doorzichtigheid</li>
              </ul>
              <br />
              <b>Logo</b>
              <ul>
                <li>Positionering</li>
                <li>Grootte</li>
              </ul>
              <br />
              <b>Titel</b>
              <ul>
                <li>Positionering</li>
                <li>Kleur</li>
                <li>Font</li>
                <li>Grootte</li>
              </ul>
              <br />
              <b>Welkomsttekst</b>
              <ul>
                <li>Positionering</li>
                <li>Kleur</li>
                <li>Font</li>
                <li>Grootte</li>
                <li>Border</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={"col-md-8"}>
          <div className={"card"}>
            <div className="card-body">
              <h4 className="card-title font-20 mt-0">Preview</h4>
              <Splash
                background={{
                  Opacity: 0.5,
                  Url: "http://www.rypens.be/upload/files/bg_only.png"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuDesigner;
