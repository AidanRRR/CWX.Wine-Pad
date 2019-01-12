import React, {Component} from 'react';

interface IState {}
interface IProps {
    naam: string,
    aantal: number
}

class WijnTypeMenuItem extends Component<IProps, IState> {
    render() {
        const { naam, aantal } = this.props;

        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="media">
                            <img className="d-flex mr-3 rounded-circle" src="https://via.placeholder.com/150"
                                 alt="Generic placeholder image" height="75">
                            </img>
                            <div className="media-body">
                                <h5 className="mt-1 font-18">{naam}</h5>
                                <b>{aantal}</b> wijnen <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WijnTypeMenuItem;