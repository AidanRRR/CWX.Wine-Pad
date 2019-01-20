import React, {Component} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import {move, reorder} from "../components/ui/dragndrop/dragndrop-helper";
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import {IWine} from "../components/wines/Wine";
import Wines from "../components/wines/Wines.json";
import WineListDraggable from "../components/wines/WineListDraggable";
import CardTabs from "../components/cards/CardTabs";
import CardDroppable from "../components/cards/CardDroppable";

interface IState {
    tabs: any,
    activeTabId: number,
    allWines: any[],
    addedWines: any[]
}
interface IProps {}

class Card extends Component<IProps, IState> {
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
        allWines: Wines.Wines,
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
                                        {/*<WineListDraggable id={this.ids.allWines} wines={allWines}/>*/}
                                    </Grid>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5>Kaart aanpassen</h5>
                                    <CardTabs activeTabId={activeTabId} tabs={tabs}
                                              setActiveTab={this.setActiveTabId}/>
                                    <br/>
                                    {currentTab.wines.length === 0 && (
                                        <p>Sleep wijnen naar hier om ze toe te voegen aan de kaart!</p>
                                    )}
                                    <CardDroppable id={this.ids.addedWines} wines={addedWines}/>
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


export default Card;