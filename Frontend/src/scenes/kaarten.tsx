import React, { Component } from "react";
import KaartenEditor from "../components/kaarten/kaarten-editor";
import KaartenTabs from "../components/kaarten/kaarten-tabs";

class Kaarten extends Component {
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
                                <h5>Beschikbare wijnen</h5>
                                <KaartenEditor/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-body">
                                <h5>Kaart aanpassen</h5>
                                <KaartenTabs activeTabId={activeTabId} tabs={tabs} setActiveTab={this.setActiveTabId} />
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


export default Kaarten;