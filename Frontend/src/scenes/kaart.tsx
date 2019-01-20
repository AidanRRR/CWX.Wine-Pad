import React, {Component} from "react";
import KaartenTabs from "../components/kaarten/kaarten-tabs";
import WijnenListDraggable from "../components/wijnen/wijnen-list-draggable";
import wines from "./../components/wijnen/wijnen.json";
import KaartDroppable from "../components/kaarten/kaart-droppable";
import {DragDropContext} from "react-beautiful-dnd";
import {move} from "../components/ui/dragndrop/dragndrop-helper";

class Kaart extends Component {
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

        // dropped outside the list
        if (!destination) {
            return;
        }

        // re-order items, because it is dragged in the same list
        if (source.droppableId === destination.droppableId) {
        } else {
            const sourceList = this.getList(source.droppableId);
            const destinationList = this.getList(destination.droppableId);

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
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <WijnenListDraggable id={this.ids.allWines} wines={allWines}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
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