import React, { Component, Fragment } from "react";
import Splash, {
  Background,
  BackgroundColor,
  TextElement
} from "../../components/menu-designer/0/Splash";
import Slider, { Range } from "rc-slider";
import { SketchPicker } from "react-color";
import "rc-slider/assets/index.css";

interface IProps {}
interface IState {
  background: Background;
  backgroundColor: BackgroundColor;
  title: TextElement;
  subTitle: TextElement;
}

enum Sliders {
  BackgroundInput,
  BackgroundImageOpacity,
  BackgroundColorOpacity,
  TitleLeft,
  TitleTop,
  SubTitleLeft,
  SubTitleTop
}
enum ColorPickers {
  Background = 0,
  Title = 1,
  WelcomeText = 2
}

class MenuDesigner extends Component<IProps, IState> {
  state: IState = {
    background: {
      Opacity: 0.5,
      Url: "http://www.rypens.be/upload/files/bg_only.png"
    },
    backgroundColor: {
      ColorCode: "#212529",
      Opacity: 0
    },
    title: {
      Value: "Butcher's Dining",
      Left: 0,
      Top: 0,
      Color: "#212529"
    },
    subTitle: {
      Value: "Welkom",
      Left: 0,
      Top: 0,
      Color: "#212529"
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
            Value: this.state.title.Value,
            Color: this.state.title.Color
          }
        });
        break;
      case Sliders.TitleTop:
        this.setState({
          title: {
            Top: newValue,
            Left: this.state.title.Left,
            Value: this.state.title.Value,
            Color: this.state.title.Color
          }
        });
        break;
      case Sliders.SubTitleLeft:
        this.setState({
          subTitle: {
            Top: this.state.subTitle.Top,
            Left: newValue,
            Value: this.state.subTitle.Value,
            Color: this.state.title.Color
          }
        });
        break;
      case Sliders.SubTitleTop:
        this.setState({
          subTitle: {
            Top: newValue,
            Left: this.state.subTitle.Left,
            Value: this.state.subTitle.Value,
            Color: this.state.title.Color
          }
        });
        break;
      case Sliders.BackgroundColorOpacity:
        this.setState({
          backgroundColor: {
            ColorCode: this.state.backgroundColor.ColorCode,
            Opacity: newValue
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

  handleColorPickerChange = (colorPicker: ColorPickers, color) => {
    console.log(colorPicker);
    switch (colorPicker) {
      case ColorPickers.Background:
        this.setState({
          backgroundColor: {
            ColorCode: color.hex,
            Opacity: this.state.backgroundColor.Opacity
          }
        });
        break;
      case ColorPickers.Title: {
        this.setState({
          title: {
            Left: this.state.title.Left,
            Top: this.state.title.Top,
            Value: this.state.title.Value,
            Color: color.hex
          }
        });
        break;
      }
      case ColorPickers.WelcomeText: {
        this.setState({
          subTitle: {
            Left: this.state.title.Left,
            Top: this.state.title.Top,
            Value: this.state.title.Value,
            Color: color.hex
          }
        });
        break;
      }
    }
  };

  render() {
    const { title, subTitle, background, backgroundColor } = this.state;

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
                <SketchPicker
                  color={backgroundColor.ColorCode}
                  onChangeComplete={color => {
                    this.handleColorPickerChange(
                      ColorPickers.Background,
                      color
                    );
                  }}
                />
                <li>Doorzichtigheid</li>
                <Slider
                  onChange={value => {
                    this.handleSliderChange(
                      Sliders.BackgroundColorOpacity,
                      value
                    );
                  }}
                  value={backgroundColor.Opacity}
                  min={0}
                  max={1}
                  step={0.01}
                />
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
                <SketchPicker
                  color={title.Color}
                  onChangeComplete={color => {
                    this.handleColorPickerChange(ColorPickers.Title, color);
                  }}
                />
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
                <SketchPicker
                  color={subTitle.Color}
                  onChangeComplete={color => {
                    this.handleColorPickerChange(
                      ColorPickers.WelcomeText,
                      color
                    );
                  }}
                />
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
                background={background}
                backgroundColor={backgroundColor}
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
