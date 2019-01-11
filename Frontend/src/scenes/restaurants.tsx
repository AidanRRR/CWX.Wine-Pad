import React, {Component} from 'react';

class Restaurants extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box text-left">
                            <h4 className="page-title">Restaurants</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-body">
                                    <h4 className="card-title font-20 mt-0">Butcher's Dining (HOVE)</h4>
                                    <p className="card-text">Kapelstraat 102, 2540 Hove</p>
                                    <p className="card-text">
                                        <small className="text-muted"></small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-primary btn-lg">Restaurant toevoegen</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Restaurants;