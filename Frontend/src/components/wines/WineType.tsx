import React, {Component} from 'react';
import WinesEditor from "./WinesEditor";

interface IState {}
interface IProps {
    soort: string,
    omschrijving?: string;
}

class WineType extends Component<IProps, IState> {
    render() {
        const { soort, omschrijving } = this.props;

        return (
            <div>
                <h5 className="header-title">{soort}</h5>
                {omschrijving && (<p className="text-muted">{omschrijving}</p>)}
                <WinesEditor />
            </div>
        );
    }
}

export default WineType;