import React, {Component} from 'react';
import WinesEditor from "../../components/wines/WinesEditor";

class Wines extends Component {
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
                    <div className="card">
                        <div className="card-body">
                            <WinesEditor />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wines;

