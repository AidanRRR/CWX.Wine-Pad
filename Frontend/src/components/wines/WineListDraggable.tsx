import React, {Component, Fragment} from 'react';
import {Droppable} from "react-beautiful-dnd";
import {IWine} from "./Wine";
import WineItemDraggable from "./WineItemDraggable";
import './WineListDraggable.scss';

interface IState {
    filteredWines: IWine[]
}
interface IProps {
    id: string,
    wines: IWine[],
}

const filterField = (search, value) => value.toLowerCase().indexOf(search.toLowerCase()) >= 0;
const orFilter = (search, values) => values.some(filterField.bind(null, search));

class WineListDraggable extends Component<IProps, IState> {
    state = {
        filteredWines: this.props.wines
    };

    handleChangeFilter = (event) => {
        const { wines } = this.props;
        const term = event.target.value;

        const result = wines.filter((wine) => {
            return orFilter(term, [wine.title, wine.description]);
        });

        this.setState({filteredWines: result});
    };

    render() {
        const { wines, id } = this.props;
        const { filteredWines } = this.state;

        return (
            <div className={"wine-list-draggable"}>
                <div>
                    <div className="input-group mb-4">
                    <span className="input-group-prepend">
                    <button type="button" className="btn btn-primary">
                        <i className="fa fa-search"/>
                    </button>
                    </span>
                        <input onChange={this.handleChangeFilter} type="text" className="form-control" placeholder="Zoeken..."/>
                    </div>
                    <div>
                        {/*<div className="form-check-inline my-2">*/}
                            {/*<div className="custom-control custom-checkbox">*/}
                                {/*<input type="checkbox" className="custom-control-input" id="customCheck6"*/}
                                       {/*data-parsley-multiple="groups" data-parsley-mincheck="0"/>*/}
                                {/*<label className="custom-control-label" htmlFor="customCheck6">ROOD</label>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className="form-check-inline my-2">*/}
                            {/*<div className="custom-control custom-checkbox">*/}
                                {/*<input type="checkbox" className="custom-control-input" id="customCheck6"*/}
                                       {/*data-parsley-multiple="groups" data-parsley-mincheck="1"/>*/}
                                {/*<label className="custom-control-label" htmlFor="customCheck6">WIT</label>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className="form-check-inline my-2">*/}
                            {/*<div className="custom-control custom-checkbox">*/}
                                {/*<input type="checkbox" className="custom-control-input" id="customCheck6"*/}
                                       {/*data-parsley-multiple="groups" data-parsley-mincheck="2"/>*/}
                                {/*<label className="custom-control-label" htmlFor="customCheck6">ROSE</label>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <Droppable droppableId={id}>
                    {provided => (
                        <div ref={provided.innerRef} style={{}}>
                            {wines.map((wine, i) => {
                                const match = (filteredWines.filter((fwine) => fwine.id===wine.id)[0]) !== undefined;
                                console.log(match);

                                return (
                                    <WineItemDraggable key={i} wine={wine} index={i}/>
                                )
                            })}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

export default WineListDraggable;