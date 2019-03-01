import React, { Component, Fragment } from "react";
import Menu from "../../components/menus/menuOverview/Menu";
import NewMenu from "../../components/menus/menuEditor/menuTabs/NewMenu";
import { drawerStyle } from "../../components/ui/drawer/Helper";
import Drawer from "react-motion-drawer";
import MenuForm from "../../components/menus/menuForm/MenuForm";

export interface IMenu {
  id: number;
  name: string;
  avatar?: string;
  items: number;
  activatedOn: number;
}

interface IProps {}
interface IState {
  menus: IMenu[];
  addingMenu: boolean;
}

class Menus extends Component<IProps, IState> {
  state = {
    menus: [
      {
        id: 0,
        name: "Butcher's Dining",
        items: 96,
        activatedOn: 2
      },
      {
        id: 1,
        name: "De Vettigen Os",
        items: 21,
        activatedOn: 1
      }
    ],
    addingMenu: false
  };

  render() {
    const { menus, addingMenu } = this.state;

    return (
      <div>
        <Drawer
          drawerStyle={drawerStyle}
          noTouchOpen={true}
          noTouchClose={true}
          width={"50%"}
          open={!!addingMenu}
          onChange={() => {}}
        >
          <div className={"row"}>
            <div className={"col-md-12"}>
              <MenuForm onComplete={() => {}} />
            </div>
          </div>
        </Drawer>

        <div className={"row"}>
          <div className={"col-md-2"}>
            <NewMenu onClick={this.handleToggleModal} />
          </div>
          {menus.map((menu, i) => {
            return (
              <div key={i} className={"col-md-2"}>
                <Menu menu={menu} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  handleToggleModal = () => {
    this.setState({ addingMenu: !this.state.addingMenu });
  };

  refresh = async () => {};
}

export default Menus;
