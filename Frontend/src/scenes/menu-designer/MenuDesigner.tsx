import React, { Component, Fragment } from "react";
import Splash, { Background } from "../../components/menu-designer/0/Splash";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

interface IProps {}
interface IState {
  background: Background;
}

class MenuDesigner extends Component<IProps, IState> {
  state: IState = {
    background: {
      Opacity: 0.5,
      Url: "http://www.rypens.be/upload/files/bg_only.png"
    }
  };

  handleSliderChange = newValue => {
    this.setState({
      background: {
        Url: this.state.background.Url,
        Opacity: newValue
      }
    });
  };

  handleInputBackgroundImageChange = event => {
    this.setState({
      background: {
        Url: event.target.value,
        Opacity: this.state.background.Opacity
      }
    });
  };

  render() {
    const { background } = this.state;

    return (
      <div className={"row"} style={{ marginTop: 50 }}>
        <div className={"col-md-4"}>
          <div className={"card"}>
            <div className="card-body">
              <h4 className="card-title font-20 mt-0">Designer</h4>
              <b>Achtergrond afbeelding</b>
              <ul>
                <li>Afbeelding</li>
                <input
                  onChange={this.handleInputBackgroundImageChange}
                  value={background.Url}
                />
                <li>Doorzichtigheid</li>
                <Slider
                  onChange={this.handleSliderChange}
                  value={background.Opacity}
                  min={0}
                  max={1}
                  step={0.01}
                />
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
                  Opacity: background.Opacity,
                  Url: background.Url
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
