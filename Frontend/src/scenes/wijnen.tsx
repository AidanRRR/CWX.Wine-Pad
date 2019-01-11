import React, {Component} from 'react';
import WijnType from "../components/wijnen/wijn-type";

class Wijnen extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box text-left">
                            <h4 className="page-title">Overzicht wijnen</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <WijnType soort={"WIT"}
                                          omschrijving={"Witte wijn wordt gemaakt uit het sap van druiven. De most is dus vrij van schillen, steeltjes en pitten."}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <WijnType soort={"ROOD"}
                                          omschrijving={"Rode wijn is een type wijn dat ontstaat door most van blauwe druiven enige tijd met de druivenschillen te laten vergisten."}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <button type="button" className="btn btn-primary btn-lg">Voeg wijnsoort toe</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wijnen;