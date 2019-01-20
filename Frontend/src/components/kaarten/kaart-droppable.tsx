import React, {Component} from 'react';
import {DragDropContext, Droppable} from "react-beautiful-dnd";

interface IState {}
interface IProps {}

class KaartDroppable extends Component<IProps, IState> {
    render() {
        return (
            <div>
                <DragDropContext onDragEnd={() => {}}>
                    <Droppable droppableId="kaart-droppable">
                        {(provided) => (
                            <div ref={provided.innerRef}
                                 {...provided.droppableProps}
                                 style={{height: 300, backgroundColor: 'red'}}>
                                <p>sleep</p>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}

export default KaartDroppable;