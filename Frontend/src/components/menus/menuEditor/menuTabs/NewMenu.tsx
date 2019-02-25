import React, { Component, Fragment } from "react";
import NewMenuImg from "../../../../assets/images/new-menu-example.jpg";

interface IProps {
  onClick: () => void;
}
interface IState {}

class NewMenu extends Component<IProps, IState> {
  render() {
    const { onClick } = this.props;

    return (
      <div className={"card"} style={{ minHeight: 500 }}>
        <div style={{ background: "red" }} />
        <button
          onClick={onClick}
          className="btn btn-primary waves-effect waves-light"
        >
          Menu toevoegen
        </button>
      </div>
    );
  }
}

export default NewMenu;
