import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { move, reorder } from "../../components/ui/dragndrop/dragndrop-helper";
import { Grid } from "@devexpress/dx-react-grid-bootstrap4";
import Wines from "../../models/Wines.json";
import WineListDraggable from "../../components/menus/menuEditor/cards/wine/list/WineListDraggable";
import { IWine } from "../../models/Wine";
import { RouterProps } from "react-router";
import { IMenuTab } from "./IMenuTab";
import MenuTabs from "../../components/menus/menuEditor/menuTabs/MenuTabs";
import MenuCardDroppable from "../../components/menus/menuEditor/cards/MenuCardDroppable";

interface IState {
  tabs: IMenuTab[];
  activeTabId: number;
  allWines: IWine[] | any;
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
    allWines: Wines.Wines
  };

  ids = {
    allWines: "allWines",
    addedWines: "addedWines"
  };

  getList = id => {
    if (id === "allWines") {
      // console.log(this.state.allWines);
      return this.state.allWines;
    } else {
      // console.log(this.state.tabs[this.state.activeTabId].wines);
      return this.state.tabs[this.state.activeTabId].wines;
    }
  };

  onDragEnd = result => {
    const { activeTabId } = this.state;
    let { allWines, tabs } = this.state;
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

      if (source.droppableId === this.ids.addedWines) {
        tabs[activeTabId].wines = items;
      }

      if (source.droppableId === this.ids.allWines) {
        allWines = items;
      }

      this.setState({ allWines, tabs });
    } else {
      // Move to another list
      const result = move(sourceList, destinationList, source, destination);

      tabs[activeTabId].wines = result.addedWines;

      this.setState({
        allWines: result.allWines,
        tabs
      });
    }
  };

  render() {
    const { tabs, allWines, activeTabId } = this.state;
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
                  {currentTab !== undefined && (
                    <MenuCardDroppable
                      id={this.ids.addedWines}
                      wines={currentTab.wines}
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
