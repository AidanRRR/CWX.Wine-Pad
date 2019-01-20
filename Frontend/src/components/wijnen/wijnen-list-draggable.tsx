import React, {Component, Fragment} from 'react';
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {IWijn} from "./wijn";
import WijnItemDraggable from "./wijn-item-draggable";

interface IState {
}

interface IProps {
    wines: IWijn[]
}

class WijnenListDraggable extends Component<IProps, IState> {
    onDragEnd = result => {
    };

    render() {
        const {wines} = this.props;

        return (
            <Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId={"wijnen-list"}>
                        {provided => (
                            <div ref={provided.innerRef} style={{}}>
                                {wines.map((wine, i) => {
                                    return (
                                        <WijnItemDraggable key={i} wine={wine} index={i} />
                                    )
                                })}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Fragment>
        );
    }
}

export default WijnenListDraggable;