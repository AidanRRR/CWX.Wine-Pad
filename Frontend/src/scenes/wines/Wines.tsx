import React, { Component } from "react";
import WinesEditor from "../../components/wines/editor/WinesEditor";
import { IWine } from "../../models/Wine";
import WineForm from "../../components/wines/wineForm/WineForm";
import { drawerStyle } from "../../components/ui/drawer/Helper";
import Drawer from "react-motion-drawer";
import { ICountry, ICountrySuggestion } from "../../models/Country";
import api from "../../api/api";

export interface IProps {}
export interface IState {
  isLoading: boolean;
  editingWine: IWine | null;
  countrySuggestions: ICountrySuggestion[];
}

class Wines extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      editingWine: null,
      countrySuggestions: []
    };
  }

  componentDidMount(): void {
    this.refresh();
  }

  render() {
    const { editingWine, isLoading, countrySuggestions } = this.state;

    return (
      <div className={"mt-5"}>
        {!isLoading && (
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
                      countrySuggestions={countrySuggestions}
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
        )}
      </div>
    );
  }

  refresh = async () => {
    this.setState({ isLoading: true });

    await api.get(`countries`).then((response: any) => {
      const countrySuggestions = response.countries.map(country => {
        return {
          value: country.id,
          label: country.name
        };
      });

      this.setState({
        countrySuggestions,
        isLoading: false
      });
    });
  };
}

export default Wines;
