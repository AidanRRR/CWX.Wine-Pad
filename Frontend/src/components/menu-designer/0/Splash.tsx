import React, { Component } from "react";

export type Background = {
  Url: string;
  Opacity: number;
};

interface IProps {
  background: Background;
}
interface IState {}

class Splash extends Component<IProps, IState> {
  render() {
    const { background } = this.props;

    return (
      <div>
        <div
          style={{
            width: "100%",
            height: 600,
            backgroundImage: `url(${background.Url})`,
            backgroundSize: "cover",
            opacity: background.Opacity
          }}
        />
      </div>
    );
  }
}

export default Splash;
