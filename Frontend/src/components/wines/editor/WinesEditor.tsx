import React from "react";
import {
  EditingState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  PagingState,
  SearchState,
  SortingState
} from "@devexpress/dx-react-grid";
import {
  Grid,
  PagingPanel,
  SearchPanel,
  Table,
  TableEditColumn,
  TableHeaderRow,
  Toolbar
} from "@devexpress/dx-react-grid-bootstrap4";
import {
  editColumnMessages,
  headerRowMessages,
  pagingMessages,
  searchMessages,
  tableMessages
} from "../../ui/react-grid/Localization";
import Wines from "../../../models/Wines.json";
import { Command, getRowId } from "../../ui/react-grid/Helpers";
import { IWine } from "../../../models/Wine";
import { Getter } from "@devexpress/dx-react-core";
import "./ColumnLayout.scss";

interface IProps {
  onEditWine: (wine: IWine) => void;
}

interface IState {
  rows: any;
  columns: any;
  pageSizes: any;
  grouping: any;
  editingWine: IWine | null;
}

const TableComponent = ({ ...restProps }) => {
  return (
    <Table.Table
      {...restProps}
      style={{ borderSpacing: "0 10px", borderCollapse: "inherit" }}
    />
  );
};
const TableRow = ({ row, ...restProps }) => {
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
const TableCell = restProps => {
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
const ToolbarRoot = ({ ...restProps }) => {
  return <Toolbar.Root style={{ position: "absolute" }} {...restProps} />;
};
const searchPanelComponent = ({ ...restProps }) => {
  return (
    <div className={"input-group"} style={{ width: "40%" }}>
      <SearchPanel.Input
        className={"form-control"}
        value={restProps.value}
        onValueChange={restProps.onValueChange}
        getMessage={restProps.getMessage}
      />

      <div className="input-group-append">
        <span className="input-group-append">
          <div className="input-group-text">
            <i className="ti-search" />
          </div>
        </span>
      </div>
    </div>
  );
};

class WinesEditor extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "title", title: "WIJN" },
        { name: "year", title: "JAAR" },
        { name: "type", title: "TYPE" },
        { name: "region", title: "REGIO" },
        { name: "price", title: "PRIJS" }
      ],
      grouping: [{ columnName: "title" }],
      pageSizes: [5, 10, 15, 0],
      rows: Wines.Wines,
      editingWine: null
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }: any) {
    let { rows } = this.state;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row
        }))
      ];
    }
    if (changed) {
      rows = rows.map(row =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(row.id));
    }
    this.setState({ rows });
  }

  changeEditingRowIds = editingRowIds => {
    const { rows } = this.state;
    const { onEditWine } = this.props;

    const editingWine = rows[editingRowIds[0]];

    onEditWine(editingWine);

    this.setState({ editingWine });
  };

  render() {
    const { rows, columns, pageSizes } = this.state;

    return (
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <SearchState defaultValue={""} />
        <SortingState
          defaultSorting={[{ columnName: "title", direction: "asc" }]}
        />{" "}
        <EditingState
          onCommitChanges={this.commitChanges}
          onEditingRowIdsChange={this.changeEditingRowIds}
        />
        <PagingState defaultCurrentPage={0} defaultPageSize={10} />
        <IntegratedPaging />
        <IntegratedSorting />
        <IntegratedFiltering />
        <Table
          tableComponent={TableComponent}
          cellComponent={TableCell}
          rowComponent={TableRow}
          messages={tableMessages}
        />
        <TableHeaderRow messages={headerRowMessages} showSortingControls />
        <Toolbar rootComponent={ToolbarRoot} />
        <SearchPanel
          inputComponent={searchPanelComponent}
          messages={searchMessages}
        />
        <TableEditColumn
          messages={editColumnMessages}
          commandComponent={Command}
          showAddCommand
          showEditCommand
          showDeleteCommand
        />
        <Getter
          name="tableColumns"
          computed={({ tableColumns }) => {
            return [
              ...tableColumns.filter(
                c => c.type !== TableEditColumn.COLUMN_TYPE
              ),
              {
                key: "editCommand",
                type: TableEditColumn.COLUMN_TYPE,
                width: 140
              }
            ];
          }}
        />
        <PagingPanel messages={pagingMessages} pageSizes={pageSizes} />
      </Grid>
    );
  }
}

export default WinesEditor;
