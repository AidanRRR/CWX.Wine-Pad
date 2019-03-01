import React, { Component, Fragment } from "react";
import { IMenu } from "../../../scenes/menu/Menus";
import { Link } from "react-router-dom";
import CardAddPlaceholder from "../../../assets/images/NewMenuPlaceholder.svg";

interface IProps {
  menu: IMenu;
}
interface IState {}

class Menu extends Component<IProps, IState> {
  render() {
    const { menu } = this.props;

    return (
      <Fragment>
        <div className={"card"}>
          <img
            src={menu.avatar ? menu.avatar : CardAddPlaceholder}
            alt=""
            className="card-img-top img-fluid"
          />
          <div className="card-body">
            <h4 className="card-title font-20 mt-0">{menu.name}</h4>
            <p className="card-text">
              Bevat <b>{menu.items}</b> dranken.
              <br />
              Geactiveerd op <b>{menu.activatedOn}</b> tablets.
            </p>
            <Link to={"kaart/1"}>
              <button className="btn btn-primary waves-effect waves-light">
                Kaart aanpassen
              </button>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Menu;
