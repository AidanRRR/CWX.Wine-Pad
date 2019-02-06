import React, {Component, Fragment} from 'react';
import ModalConfirm from "../ui/modals/ModalConfirm";
import MenuTabForm from "./MenuTabForm/MenuTabForm";
import {IMenuTab} from "../../scenes/menu/IMenuTab";

interface IState {
    showAddCard: boolean,
    addCardConfirmed: boolean
}

interface IProps {
    tabs: IMenuTab[],
    activeTabId: any,
    setActiveTab: (id) => void,
    onRefresh: () => void
}

class MenuTabs extends Component<IProps, IState> {
    state = {
        showAddCard: false,
        addCardConfirmed: false
    };

    render() {
        const {tabs, activeTabId, setActiveTab, onRefresh} = this.props;
        const {showAddCard, addCardConfirmed} = this.state;

        return (
            <Fragment>
                {showAddCard && (
                    <ModalConfirm toggle={this.handleToggleModal}
                                  onConfirm={() => {this.setState({addCardConfirmed: true})}}
                                  body={<MenuTabForm confirmed={addCardConfirmed} onComplete={onRefresh}/>}
                                  title={"Onderdeel toevoegen"}
                    />
                )}

                <ul className="nav nav-tabs">
                    {tabs.map((tab, i) => {
                        return (
                            <li key={i} className="nav-item">
                                {tab.id === activeTabId && (
                                    <div className="nav-link active" onClick={() => {
                                        setActiveTab(tab.id)
                                    }}>{tab.name}</div>
                                )}

                                {tab.id !== activeTabId && (
                                    <div className="nav-link" onClick={() => {
                                        setActiveTab(tab.id)
                                    }}>{tab.name}</div>
                                )}
                            </li>
                        )
                    })}
                    <li>
                        <div className="nav-link" onClick={() => {
                            this.setState({showAddCard: true});
                        }}>
                            <i className="typcn typcn-document-add"/>
                        </div>
                    </li>
                </ul>
            </Fragment>
        );
    }

    handleConfirmModal = () => {
        const {showAddCard, addCardConfirmed} = this.state;
        this.setState({showAddCard: !(showAddCard), addCardConfirmed: !(addCardConfirmed)});
    };
    handleToggleModal = () => {
        const { showAddCard } = this.state;
        this.setState({showAddCard: !(showAddCard)});
    };
}

export default MenuTabs;