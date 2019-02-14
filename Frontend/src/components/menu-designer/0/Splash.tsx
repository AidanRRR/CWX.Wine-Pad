import React, { Component } from "react";

export type Background = {
  Url: string;
  Opacity: number;
};

export type TextElement = {
  Value: string;
  Top: number;
  Left: number;
};

export enum TextAlignment {
  TopLeft,
  TopCenter,
  TopRight,
  MiddleLeft,
  MiddleCenter,
  MiddleRight,
  BottomLeft,
  BottomCenter,
  BottomRight
}

interface IProps {
  background: Background;
  title: TextElement;
  subTitle: TextElement;
}
interface IState {}

class Splash extends Component<IProps, IState> {
  getTextStyle = (position: TextAlignment) => {
    let style = "";

    switch (position) {
      case TextAlignment.TopLeft:
        break;
      case TextAlignment.TopCenter:
        break;
      case TextAlignment.TopRight:
        break;
      case TextAlignment.MiddleLeft:
        break;
      case TextAlignment.MiddleCenter:
        break;
      case TextAlignment.MiddleRight:
        break;
      case TextAlignment.BottomLeft:
        break;
      case TextAlignment.BottomCenter:
        break;
      case TextAlignment.BottomRight:
        break;
    }
  };

  render() {
    const { background, subTitle, title } = this.props;

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
              left: `${title.Left}%`,
              top: `${title.Top}%`
            }}
          >
            <h1>{title.Value}</h1>
          </div>
          <div
            style={{
              position: "absolute",
              left: `${subTitle.Left}%`,
              top: `${subTitle.Top}%`
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
