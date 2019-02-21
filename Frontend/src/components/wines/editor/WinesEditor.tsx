import React, { Component } from "react";
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
  Table,
  TableHeaderRow,
  TableEditColumn,
  PagingPanel,
  SearchPanel,
  Toolbar,
  TableColumnResizing
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

interface IProps {
  onEditWine: (wine: IWine) => void;
}

interface IState {
  rows: any;
  columns: any;
  pageSizes: any;
  grouping: any;
  tableColumnExtensions: any;
  defaultColumnWidths: any;
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
        backgroundColor: "#2F2720"
      }}
    />
  );
};

class WinesEditor extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "title", title: "Naam" },
        { name: "year", title: "Jaar" },
        { name: "type", title: "Type" },
        { name: "region", title: "Regio" },
        { name: "description", title: "Omschrijving" },
        { name: "price", title: "Prijs" }
      ],
      defaultColumnWidths: [
        { columnName: "title", width: 180 },
        { columnName: "year", width: 75 },
        { columnName: "type", width: 100 },
        { columnName: "region", width: 240 },
        { columnName: "description", width: 400 },
        { columnName: "price", width: 100 }
      ],
      tableColumnExtensions: [{ columnName: "title", width: 300 }],
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
    const {
      rows,
      defaultColumnWidths,
      columns,
      tableColumnExtensions,
      pageSizes
    } = this.state;

    return (
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <SearchState defaultValue={""} />
        <SortingState />
        <EditingState
          onCommitChanges={() => {}}
          onEditingRowIdsChange={this.changeEditingRowIds}
        />
        <PagingState defaultCurrentPage={5} defaultPageSize={10} />
        <IntegratedPaging />
        <IntegratedSorting />
        <IntegratedFiltering />
        <Table
          tableComponent={TableComponent}
          rowComponent={TableRow}
          messages={tableMessages}
          columnExtensions={tableColumnExtensions}
        />
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableHeaderRow messages={headerRowMessages} showSortingControls />
        <Toolbar />
        <SearchPanel messages={searchMessages} />
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
            const result = [
              ...tableColumns.filter(
                c => c.type !== TableEditColumn.COLUMN_TYPE
              ),
              {
                key: "editCommand",
                type: TableEditColumn.COLUMN_TYPE,
                width: 140
              }
            ];
            return result;
          }}
        />
        <PagingPanel messages={pagingMessages} pageSizes={pageSizes} />
      </Grid>
    );
  }
}

export default WinesEditor;
