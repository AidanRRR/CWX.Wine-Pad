import React, {Component, Fragment} from 'react';
import ModalConfirm from "../ui/modals/modalconfirm";
import KaartForm from "./forms/kaartForm";

interface IState {
    showAddCard: boolean
}
interface IProps {
    tabs: any,
    activeTabId: any,
    setActiveTab: (id) => void
}

class KaartenTabs extends Component<IProps, IState> {
    state = {
        showAddCard: false
    };

    render() {
        const {tabs, activeTabId, setActiveTab} = this.props;
        const {showAddCard} = this.state;

        return (
            <Fragment>
                {showAddCard && (
                    <ModalConfirm toggle={this.handleToggleModal}
                                  content={<KaartForm onComplete={this.refresh} />}
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

    handleToggleModal = () => {
        this.setState({showAddCard: !(this.state.showAddCard)});
    };

    refresh = async () => {}
}

export default KaartenTabs;