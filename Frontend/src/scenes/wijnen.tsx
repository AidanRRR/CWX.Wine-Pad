import React, {Component} from 'react';
import WijnenEditor from "../components/wijnen/wijnen-editor";

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
                    <div className="card">
                        <div className="card-body">
                            <WijnenEditor/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wijnen;

