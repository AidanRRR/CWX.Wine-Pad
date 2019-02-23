import React, { Component } from "react";

export interface IProps {
  onConfirm: () => void;
  onCancel: () => void;
}
export interface IState {}

class SaveCancel extends Component<IProps, IState> {
  render() {
    const { onConfirm, onCancel } = this.props;

    return (
      <div className={"pull-right"}>
        <button
          onClick={onConfirm}
          type="button"
          className="btn btn-primary btn-lg"
        >
          Opslaan
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="btn btn-secondary btn-lg"
        >
          Annuleren
        </button>
      </div>
    );
  }
}

export default SaveCancel;
