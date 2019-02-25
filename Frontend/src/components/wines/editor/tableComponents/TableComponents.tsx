import React from "react";
import {
  Table,
  Toolbar,
  SearchPanel
} from "@devexpress/dx-react-grid-bootstrap4";

export const TableComponent = ({ ...restProps }) => {
  return (
    <Table.Table
      {...restProps}
      style={{ borderSpacing: "0 10px", borderCollapse: "inherit" }}
    />
  );
};
export const TableRow = ({ row, ...restProps }) => {
  return (
    // @ts-ignore
    <Table.Row
      {...restProps}
      style={{
        backgroundColor: "#2F2720",
        height: 60
      }}
    />
  );
};
export const TableCell = restProps => {
  return (
    <Table.Cell
      className={
        restProps.column.name === "title"
          ? "table-cell-primary"
          : "table-cell-secondary"
      }
      {...restProps}
    />
  );
};
export const ToolbarRoot = ({ ...restProps }) => {
  return <Toolbar.Root style={{ position: "absolute" }} {...restProps} />;
};
export const searchPanelComponent = ({ ...restProps }) => {
  return (
    <div className={"input-group"} style={{ width: "40%" }}>
      <SearchPanel.Input
        className={"form-control"}
        value={restProps.value}
        onValueChange={restProps.onValueChange}
        getMessage={restProps.getMessage}
      />

      <div className="input-group-append">
        <span className="input-group-prepend">
          <button type="button" className="btn btn-primary">
            <i className="fa fa-search" />
          </button>
        </span>
      </div>
    </div>
  );
};
export const ColorTypeFormatter = props => {
  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <div
        style={{
          display: "inline-block",
          borderRadius: "3px",
          width: "30px",
          height: "30px",
          margin: "-8px 8px -8px 0",
          textAlign: "center"
        }}
      >
        <img
          src={`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png`}
          style={{
            height: "28px",
            margin: "0 auto"
          }}
          alt="Avatar"
        />
      </div>
    </div>
  );
};
