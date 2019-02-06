import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { move, reorder } from "../../components/ui/dragndrop/dragndrop-helper";
import { Grid } from "@devexpress/dx-react-grid-bootstrap4";
import Wines from "../../components/wines/Wines.json";
import WineListDraggable from "../../components/wines/WineListDraggable";
import { IWine } from "../../components/wines/Wine";
import { RouterProps } from "react-router";
import { IMenuTab } from "./IMenuTab";
import MenuTabs from "../../components/menus/MenuTabs";
import MenuCardDroppable from "../../components/menus/MenuCardDroppable";

interface IState {
  tabs: IMenuTab[];
  activeTabId: number;
  allWines: IWine[];
  addedWines: IWine[];
}

interface IProps extends RouterProps {}

class Menu extends Component<IProps, IState> {
  state = {
    tabs: [
      {
        id: 0,
        name: "By the glass",
        wines: []
      },
      {
        id: 1,
        name: "Bottles",
        wines: []
      },
      {
        id: 2,
        name: "Specials",
        wines: []
      }
    ],
    activeTabId: 0,
    allWines: Wines.Wines,
    addedWines: []
  };

  ids = {
    allWines: "allWines",
    addedWines: "addedWines"
  };
  getList = id => this.state[this.ids[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // Cancel drag to another list
    if (!destination) {
      return;
    }

    const sourceList = this.getList(source.droppableId);
    const destinationList = this.getList(destination.droppableId);

    // Re-order items
    if (source.droppableId === destination.droppableId) {
      let items: any = reorder(sourceList, source.index, destination.index);

      let state = this.state;

      if (source.droppableId === this.ids.addedWines) {
        state.addedWines = items;
      }

      if (source.droppableId === this.ids.allWines) {
        state.allWines = items;
      }

      this.setState(state);
    } else {
      // Move to another list
      const result = move(sourceList, destinationList, source, destination);

      this.setState({
        allWines: result.allWines,
        addedWines: result.addedWines
      });
    }
  };

  render() {
    const { tabs, allWines, addedWines, activeTabId } = this.state;
    const currentTab: IMenuTab = tabs.filter(
      (tab: IMenuTab) => tab.id === activeTabId
    )[0];

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box text-left">
              <h4 className="page-title">Kaart aanpassen</h4>
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <Grid
                    rows={allWines}
                    columns={[
                      {
                        name: "title",
                        title: "title"
                      }
                    ]}
                  >
                    <WineListDraggable
                      id={this.ids.allWines}
                      wines={allWines}
                    />
                  </Grid>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <MenuTabs
                    activeTabId={activeTabId}
                    tabs={tabs}
                    onRefresh={this.refresh}
                    setActiveTab={this.setActiveTabId}
                  />
                  <br />
                  {currentTab !== undefined &&
                    currentTab.wines.length === 0 && (
                      <MenuCardDroppable
                        id={this.ids.addedWines}
                        wines={addedWines}
                      />
                    )}
                </div>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    );
  }

  refresh = async () => {};

  setActiveTabId = id => {
    this.setState({ activeTabId: id });
  };
}

export default Menu;
