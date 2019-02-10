import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import { getListStyle } from "../../../ui/dragndrop/dragndrop-helper";
import { IWine } from "../../../../models/Wine";
import WineItemDraggable from "./wine/item/WineItemDraggable";

interface IState {}
interface IProps {
  id: string;
  wines: IWine[];
}

class MenuCardDroppable extends Component<IProps, IState> {
  render() {
    const { wines, id } = this.props;

    return (
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {wines.map((wine, i) => (
              <WineItemDraggable key={i} wine={wine} index={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default MenuCardDroppable;
