import React, { Component } from "react";
import KaartenTabs from "../components/kaarten/kaarten-tabs";
import WijnenListDraggable from "../components/wijnen/wijnen-list-draggable";
import wines from "./../components/wijnen/wijnen.json";
import KaartDroppable from "../components/kaarten/kaart-droppable";

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
        activeTabId: 0
    };

    render() {
        const {tabs, activeTabId} = this.state;
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
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <WijnenListDraggable wines={wines.Wines}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-body">
                                <h5>Kaart aanpassen</h5>
                                <KaartenTabs activeTabId={activeTabId} tabs={tabs} setActiveTab={this.setActiveTabId} />
                                <br />
                                { currentTab.wines.length===0 && (
                                    <p>Sleep wijnen naar hier om ze toe te voegen aan de kaart!</p>
                                )}
                                <KaartDroppable/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    setActiveTabId = (id) => {
        this.setState({activeTabId: id});
    }
}


export default Kaart;