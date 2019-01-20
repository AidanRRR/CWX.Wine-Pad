import React, {Component} from 'react';
import {IWijn} from "./wijn";
import {Draggable} from "react-beautiful-dnd";

interface IState {}
interface IProps {
    wine: IWijn,
    index: number
}

class WijnItemDraggable extends Component<IProps, IState> {
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

export default WijnItemDraggable;