import React, {Component} from 'react';
import WijnenEditor from "./wijnen-editor";

interface IState {}
interface IProps {
    soort: string,
    omschrijving?: string;
}

class WijnType extends Component<IProps, IState> {
    render() {
        const { soort, omschrijving } = this.props;

        return (
            <div>
                <h5 className="header-title">{soort}</h5>
                {omschrijving && (<p className="text-muted">{omschrijving}</p>)}
                <WijnenEditor/>
            </div>
        );
    }
}

export default WijnType;