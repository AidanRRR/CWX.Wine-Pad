import React, { Component, Fragment } from "react";
import Menu from "../../components/menus/menuOverview/Menu";
import NewMenu from "../../components/menus/menuEditor/menuTabs/NewMenu";
import NewMenuForm from "../../components/menus/menuForm/NewMenuForm";
import ModalConfirm from "../../components/ui/modals/ModalConfirm";

export interface IMenu {
  id: number;
  name: string;
  avatar: string;
  items: number;
  activatedOn: number;
}

interface IProps {}
interface IState {
  menus: IMenu[];
  showAddMenu: boolean;
}

class Menus extends Component<IProps, IState> {
  state = {
    menus: [
      {
        id: 0,
        name: "Butcher's Dining",
        avatar: "http://www.rypens.be/upload/files/Path_9.png",
        items: 96,
        activatedOn: 2
      },
      {
        id: 1,
        name: "De Vettigen Os",
        avatar: "http://www.rypens.be/upload/files/Template.png",
        items: 21,
        activatedOn: 1
      }
    ],
    showAddMenu: false
  };

  render() {
    const { menus, showAddMenu } = this.state;

    return (
      <div className={"mt-5"}>
        {/*{showAddMenu && (*/}
        {/*<ModalConfirm*/}
        {/*toggle={this.handleToggleModal}*/}
        {/*body={<NewMenuForm onComplete={this.refresh} />}*/}
        {/*title={"Nieuwe wijnkaart"}*/}
        {/*/>*/}
        {/*)}*/}
        <div className="row">
          {menus.map((menu, i) => {
            return (
              <div key={i} className={"col-sm-3"}>
                <Menu menu={menu} />
              </div>
            );
          })}
          <div className={"col-sm-3"}>
            <NewMenu onClick={this.handleToggleModal} />
          </div>
        </div>
      </div>
    );
  }

  handleToggleModal = () => {
    this.setState({ showAddMenu: !this.state.showAddMenu });
  };

  refresh = async () => {};
}

export default Menus;
