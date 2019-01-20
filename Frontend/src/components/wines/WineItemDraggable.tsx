import React, {Component} from 'react';
import {Draggable} from "react-beautiful-dnd";
import {IWine} from "./Wine";

interface IState {}
interface IProps {
    wine: IWine,
    index: number
}

class WineItemDraggable extends Component<IProps, IState> {
    render() {
        const { wine, index } = this.props;

        return (
            <Draggable draggableId={wine.id.toString()} index={index}>
                {provided => (
                    <div className="card card-body" ref={provided.innerRef}
                          {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className={"row"}>
                            <div className="col-sm-10">
                                {wine.title} ∙ {wine.region}
                            </div>
                            <div className="col-sm-2">
                                {wine.price}
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className="col-sm-10">
                                {wine.description}
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default WineItemDraggable;