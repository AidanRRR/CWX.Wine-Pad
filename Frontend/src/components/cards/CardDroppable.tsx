import React, {Component} from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {getListStyle} from "../ui/dragndrop/dragndrop-helper";
import {IWine} from "../wines/Wine";
import WineItemDraggable from "../wines/WineItemDraggable";

interface IState {}
interface IProps {
    id: string,
    wines: IWine[]
}

class CardDroppable extends Component<IProps, IState> {
    render() {
        const { wines, id} = this.props;

        return (
            <div>
                <Droppable droppableId={id}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                            {wines.map((wine, i) => (
                                <WineItemDraggable key={i} wine={wine} index={i}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

export default CardDroppable;