import React, {Component, Fragment} from 'react';
import {Droppable} from "react-beautiful-dnd";
import {IWijn} from "./wijn";
import {Table} from "@devexpress/dx-react-grid-bootstrap4";
import WijnItemDraggable from "./wijn-item-draggable";

interface IState {}
interface IProps {
    id: string,
    wines: IWijn[]
}

class WijnenListDraggable extends Component<IProps, IState> {
    render() {
        const { wines, id } = this.props;

        return (
            <Fragment>
                <Droppable droppableId={id}>
                    {provided => (
                        <div ref={provided.innerRef} style={{}}>
                            {wines.map((wine, i) => {
                                return (
                                    <WijnItemDraggable key={i} wine={wine} index={i}/>
                                )
                            })}
                        </div>
                    )}
                </Droppable>
            </Fragment>
        );
    }
}

export default WijnenListDraggable;