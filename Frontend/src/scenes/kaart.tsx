import React, {Component} from "react";
import KaartenTabs from "../components/kaarten/kaarten-tabs";
import WijnenListDraggable from "../components/wijnen/wijnen-list-draggable";
import wines from "./../components/wijnen/wijnen.json";
import KaartDroppable from "../components/kaarten/kaart-droppable";
import {DragDropContext} from "react-beautiful-dnd";
import {move, reorder} from "../components/ui/dragndrop/dragndrop-helper";
import {IWijn} from "../components/wijnen/wijn";
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';

interface IState {
    tabs: any,
    activeTabId: number,
    allWines: IWijn[],
    addedWines: IWijn[]
}
interface IProps {}

class Kaart extends Component<IProps, IState> {
    state = {
        tabs: [{
            id: 0,
            name: 'BY THE GLASS',
            wines: []
        }, {
            id: 1,
            name: 'BOTTLES',
            wines: []
        }, {
            id: 2,
            name: 'THE BUTCHER\'S BASEMENT',
            wines: []
        }],
        activeTabId: 0,
        allWines: wines.Wines,
        addedWines: []
    };

    ids = {
        allWines: 'allWines',
        addedWines: 'addedWines'
    };
    getList = id => this.state[this.ids[id]];

    onDragEnd = result => {
        const {source, destination} = result;

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

            this.setState({allWines: result.allWines, addedWines: result.addedWines});
        }
    };

    render() {
        const {tabs, allWines, addedWines, activeTabId} = this.state;
        const currentTab = tabs.filter(x => x.id === activeTabId)[0];

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
                                    <Grid rows={allWines} columns={[{
                                        name: 'title',
                                        title: 'title'
                                    }]}>
                                        <WijnenListDraggable id={this.ids.allWines} wines={allWines}/>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5>Kaart aanpassen</h5>
                                    <KaartenTabs activeTabId={activeTabId} tabs={tabs}
                                                 setActiveTab={this.setActiveTabId}/>
                                    <br/>
                                    {currentTab.wines.length === 0 && (
                                        <p>Sleep wijnen naar hier om ze toe te voegen aan de kaart!</p>
                                    )}
                                    <KaartDroppable id={this.ids.addedWines} wines={addedWines}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </DragDropContext>
            </div>
        );
    }

    setActiveTabId = (id) => {
        this.setState({activeTabId: id});
    }
}


export default Kaart;