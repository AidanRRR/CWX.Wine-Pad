import React, {Component} from 'react';
import {IWijn} from "./wijn";
import {Draggable} from "react-beautiful-dnd";

interface IState {
}

interface IProps {
    wine: IWijn,
    index: number
}

class WijnItemDraggable extends Component<IProps, IState> {
    render() {
        const {wine} = this.props;

        return (
            <Draggable draggableId={wine.id.toString()} index={this.props.index}>
                {provided => (
                    <div className="card card-body" ref={provided.innerRef}
                         {...provided.draggableProps} {...provided.dragHandleProps}>
                        {wine.title}
                    </div>
                )}
            </Draggable>
        );
    }
}

export default WijnItemDraggable;