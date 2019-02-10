import React, { Component } from "react";
import WinesEditor from "../../components/wines/editor/WinesEditor";
import { IWine } from "../../models/Wine";
import WineForm from "../../components/wines/editor/wineForm/WineForm";
import ModalConfirm from "../../components/ui/modals/ModalConfirm";

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
        {editingWine && (
          <ModalConfirm
            toggle={this.handleToggleModal}
            onConfirm={() => {}}
            body={<WineForm wine={editingWine} />}
            title={"Onderdeel toevoegen"}
          />
        )}

        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box text-left">
              <h4 className="page-title">Overzicht wijnen</h4>
            </div>
          </div>
        </div>
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

  handleToggleModal = () => {
    this.setState({ editingWine: null });
  };
}

export default Wines;
