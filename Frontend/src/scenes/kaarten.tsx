import React, {Component} from 'react';
import KaartenEditor from "../components/kaarten/kaarten-editor";

class Kaarten extends Component {
    render() {
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Kaarten;