import React, { Component } from "react";
import WinesEditor from "../../components/wines/editor/WinesEditor";
import { IWine } from "../../models/Wine";
import WineForm from "../../components/wines/wineForm/WineForm";
import ModalConfirm from "../../components/ui/modals/ModalConfirm";
import { drawerStyle } from "../../components/ui/drawer/Helper";
import Drawer from "react-motion-drawer";

export interface IProps {}
export interface IState {
  editingWine: IWine | null;
}

class Wines extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      editingWine: null
    };
  }

  render() {
    const { editingWine } = this.state;

    return (
      <div>
        <Drawer
          drawerStyle={drawerStyle}
          noTouchOpen={true}
          noTouchClose={true}
          width={"50%"}
          open={!!editingWine}
          onChange={() => {
            if (editingWine !== null) {
              this.setState({ editingWine: null });
            }
          }}
        >
          <div className={"row"}>
            <div className={"col-md-12"}>
              {editingWine && (
                <WineForm
                  onCancel={() => {
                    this.setState({ editingWine: null });
                  }}
                  wine={editingWine}
                />
              )}
            </div>
          </div>
        </Drawer>

        <div className="row">
          <div className="card">
            <div className="card-body">
              <WinesEditor
                onEditWine={(wine: IWine) => {
                  this.setState({ editingWine: wine });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Wines;
