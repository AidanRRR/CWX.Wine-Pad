import React, { Component } from "react";

export type Background = {
  Url: string;
  Opacity: number;
};

export type BackgroundColor = {
  ColorCode: string;
  Opacity: number;
};

export type TextElement = {
  Value: string;
  Top: number;
  Left: number;
  Color: string;
};

interface IProps {
  background: Background;
  backgroundColor: BackgroundColor;
  title: TextElement;
  subTitle: TextElement;
}
interface IState {}

class Splash extends Component<IProps, IState> {
  render() {
    const { background, backgroundColor, subTitle, title } = this.props;

    return (
      <div>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 600
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: background.Opacity,
              backgroundImage: `url(${background.Url})`,
              backgroundSize: "cover"
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: backgroundColor.Opacity,
              backgroundColor: backgroundColor.ColorCode
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${title.Left}%`,
              top: `${title.Top}%`,
              color: `${title.Color}`
            }}
          >
            <h1>{title.Value}</h1>
          </div>
          <div
            style={{
              position: "absolute",
              left: `${subTitle.Left}%`,
              top: `${subTitle.Top}%`,
              color: `${subTitle.Color}`
            }}
          >
            <p>{subTitle.Value}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
