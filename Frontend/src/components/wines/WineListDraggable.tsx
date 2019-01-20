import React, {Component, Fragment} from 'react';
import {Droppable} from "react-beautiful-dnd";
import {Table} from "@devexpress/dx-react-grid-bootstrap4";
import {IWine} from "./Wine";
import WineItemDraggable from "./WineItemDraggable";

interface IState {}
interface IProps {
    id: string,
    wines: IWine[]
}

class WineListDraggable extends Component<IProps, IState> {
    render() {
        const { wines, id } = this.props;

        return (
            <Fragment>
                <Droppable droppableId={id}>
                    {provided => (
                        <div ref={provided.innerRef} style={{}}>
                            {wines.map((wine, i) => {
                                return (
                                    <WineItemDraggable key={i} wine={wine} index={i}/>
                                )
                            })}
                        </div>
                    )}
                </Droppable>
            </Fragment>
        );
    }
}

export default WineListDraggable;