import React, { Component, Fragment } from "react";
import CardAdd from "../../../../assets/images/NewMenu.svg";
import CardAddHightlight from "../../../../assets/images/NewMenuHighlighted.svg";

interface IProps {
  onClick: () => void;
}
interface IState {
  currentImg: string;
}

class NewMenu extends Component<IProps, IState> {
  state = {
    currentImg: CardAdd
  };

  render() {
    const { onClick } = this.props;
    const { currentImg } = this.state;

    return (
      <div className={"card pointer"}>
        <img
          title={"Nieuw menu toevoegen"}
          onClick={onClick}
          onMouseOver={() => {
            this.setState({ currentImg: CardAddHightlight });
          }}
          onMouseLeave={() => {
            this.setState({ currentImg: CardAdd });
          }}
          src={currentImg}
          alt="Nieuwe menu toevoegen"
          className="card-img-top img-fluid"
        />
      </div>
    );
  }
}

export default NewMenu;
