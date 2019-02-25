import React, { Component, Fragment } from "react";
import { Modal } from "reactstrap";

interface IState {}
interface IProps {
  confirmMessage?: string;
  cancelMessage?: string;
  title?: string;
  onToggle: () => void;
  show: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  body: any;
}

class ModalConfirm extends Component<IProps, IState> {
  render() {
    const {
      title,
      onConfirm,
      onCancel,
      onToggle,
      body,
      show,
      confirmMessage,
      cancelMessage
    } = this.props;

    return (
      <Fragment>
        {show && (
          <Modal isOpen={true} toggle={onToggle}>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                onClick={onToggle}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">{body}</div>
            <div className="modal-footer">
              <button
                onClick={onCancel ? onCancel : onToggle}
                type="button"
                className="btn btn-secondary m-r-10"
                data-dismiss="modal"
              >
                {cancelMessage ? cancelMessage : "Annuleren"}
              </button>
              <button
                onClick={onConfirm}
                type="button"
                className="btn btn-primary"
              >
                {confirmMessage ? confirmMessage : "Bevestigen"}
              </button>
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default ModalConfirm;
