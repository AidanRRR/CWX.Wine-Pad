import React, {Component} from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {IWijn} from "../wijnen/wijn";
import WijnItemDraggable from "../wijnen/wijn-item-draggable";


interface IState {
}

interface IProps {
    id: string,
    wines: IWijn[]
}

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

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