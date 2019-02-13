import React, { Component, Fragment } from "react";
import Splash, {
  Background,
  TextAlignment,
  TextElement
} from "../../components/menu-designer/0/Splash";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

interface IProps {}
interface IState {
  background: Background;
  title: TextElement;
  subTitle: TextElement;
}

enum Sliders {
  BackgroundInput,
  BackgroundImageOpacity,
  TitleLeft,
  TitleTop,
  SubTitleLeft,
  SubTitleTop
}

class MenuDesigner extends Component<IProps, IState> {
  state: IState = {
    background: {
      Opacity: 0.5,
      Url: "http://www.rypens.be/upload/files/bg_only.png"
    },
    title: {
      Value: "Butcher's Dining",
      Left: 0,
      Top: 0
    },
    subTitle: {
      Value: "Welkom",
      Left: 0,
      Top: 0
    }
  };

  handleSliderChange = (slider: Sliders, newValue) => {
    switch (slider) {
      case Sliders.BackgroundInput:
        break;
      case Sliders.BackgroundImageOpacity:
        this.setState({
          background: {
            Url: this.state.background.Url,
            Opacity: newValue
          }
        });
        break;
      case Sliders.TitleLeft:
        this.setState({
          title: {
            Top: this.state.title.Top,
            Left: newValue,
            Value: this.state.title.Value
          }
        });
        break;
      case Sliders.TitleTop:
        this.setState({
          title: {
            Top: newValue,
            Left: this.state.title.Left,
            Value: this.state.title.Value
          }
        });
        break;
      case Sliders.SubTitleLeft:
        this.setState({
          subTitle: {
            Top: this.state.subTitle.Top,
            Left: newValue,
            Value: this.state.subTitle.Value
          }
        });
        break;
      case Sliders.SubTitleTop:
        this.setState({
          subTitle: {
            Top: newValue,
            Left: this.state.subTitle.Left,
            Value: this.state.subTitle.Value
          }
        });
        break;
    }
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
    const { title, subTitle, background } = this.state;

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
                  onChange={value => {
                    this.handleSliderChange(
                      Sliders.BackgroundImageOpacity,
                      value
                    );
                  }}
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
                <li>Links</li>
                <Slider
                  onChange={value => {
                    this.handleSliderChange(Sliders.TitleLeft, value);
                  }}
                  value={title.Left}
                  min={0}
                  max={100}
                  step={1}
                />
                <li>Top</li>
                <Slider
                  onChange={value => {
                    this.handleSliderChange(Sliders.TitleTop, value);
                  }}
                  value={title.Top}
                  min={0}
                  max={100}
                  step={1}
                />
                <li>Kleur</li>
                <li>Font</li>
                <li>Grootte</li>
              </ul>
              <br />
              <b>Welkomsttekst</b>
              <ul>
                <li>Links</li>
                <Slider
                  onChange={value => {
                    this.handleSliderChange(Sliders.SubTitleLeft, value);
                  }}
                  value={subTitle.Left}
                  min={0}
                  max={100}
                  step={1}
                />
                <li>Top</li>
                <Slider
                  onChange={value => {
                    this.handleSliderChange(Sliders.SubTitleTop, value);
                  }}
                  value={subTitle.Top}
                  min={0}
                  max={100}
                  step={1}
                />
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
                title={title}
                subTitle={subTitle}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuDesigner;
