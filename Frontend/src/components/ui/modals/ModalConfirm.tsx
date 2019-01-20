import React, {Component, Fragment} from 'react';
import { Modal } from 'reactstrap';

interface IState {}
interface IProps {
    title?: string,
    toggle: () => void;
    content: any
}

class ModalConfirm extends Component<IProps, IState> {
    render() {
        const {title, toggle, content} = this.props;

        return (
            <Fragment>
                <Modal isOpen={true} toggle={toggle}>
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button onClick={toggle} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    <div className="modal-footer">
                        <button onClick={toggle} type="button" className="btn btn-danger" data-dismiss="modal">Annuleren</button>
                        <button type="button" className="btn btn-primary">Bevestigen</button>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

export default ModalConfirm;