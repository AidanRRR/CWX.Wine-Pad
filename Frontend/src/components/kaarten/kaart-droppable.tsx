import React, {Component} from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {IWijn} from "../wijnen/wijn";
import WijnItemDraggable from "../wijnen/wijn-item-draggable";
import {getListStyle} from "../ui/dragndrop/dragndrop-helper";


interface IState {
}

interface IProps {
    id: string,
    wines: IWijn[]
}

class KaartDroppable extends Component<IProps, IState> {
    render() {
        const { wines, id} = this.props;

        return (
            <div>
                <Droppable droppableId={id}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                            {wines.map((wine, i) => (
                                <WijnItemDraggable key={i} wine={wine} index={i}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

export default KaartDroppable;