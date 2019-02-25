import React, { Fragment } from "react";
import {
  DataTypeProvider,
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
import ModalConfirm from "../../ui/modals/ModalConfirm";
import {
  ColorTypeFormatter,
  searchPanelComponent,
  TableCell,
  TableComponent,
  TableRow,
  ToolbarRoot
} from "./tableComponents/TableComponents";

interface IProps {
  onEditWine: (wine: IWine) => void;
}

interface IState {
  rows: any;
  columns: any;
  pageSizes: any;
  grouping: any;
  editingWine: IWine | null;
  colorColumns: string[];
  deletingRows: any[];
  editingRowIds: number[];
  rowChanges: any;
}

class WinesEditor extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "title", title: "WIJN" },
        { name: "year", title: "JAAR" },
        { name: "colorId", title: " " },
        { name: "type", title: "TYPE" },
        { name: "region", title: "REGIO" },
        { name: "price", title: "PRIJS" }
      ],
      grouping: [{ columnName: "title" }],
      deletingRows: [],
      colorColumns: ["colorId"],
      pageSizes: [5, 10, 15, 0],
      rows: Wines.Wines,
      editingWine: null,
      editingRowIds: [],
      rowChanges: {}
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
    this.setState({ rows, deletingRows: deleted || this.getStateDeletingRows });
  }
  changeEditingRowIds = editingRowIds => {
    const { rows } = this.state;
    const { onEditWine } = this.props;

    const editingWine = rows[editingRowIds[0]];

    onEditWine(editingWine);

    this.setState({ editingWine });
  };

  getStateRows = () => {
    const { rows } = this.state;
    return rows;
  };
  cancelDelete = () => this.setState({ deletingRows: [] });
  changeRowChanges = rowChanges => this.setState({ rowChanges });
  deleteRows = () => {
    const rows = this.getStateRows().slice();
    this.getStateDeletingRows().forEach(rowId => {
      const index = rows.findIndex(row => row.id === rowId);
      if (index > -1) {
        rows.splice(index, 1);
      }
    });
    this.setState({ rows, deletingRows: [] });
  };
  getStateDeletingRows = () => {
    const { deletingRows } = this.state;
    return deletingRows;
  };

  handleNewWine = () => {
    const { onEditWine } = this.props;

    const newWine: IWine = {
      id: 0,
      description: null,
      price: null,
      region: null,
      type: null,
      year: null,
      country: null,
      title: null,
      colorId: null
    };

    onEditWine(newWine);

    this.setState({ editingWine: newWine });
  };

  render() {
    const {
      rows,
      columns,
      pageSizes,
      colorColumns,
      deletingRows,
      editingRowIds,
      rowChanges
    } = this.state;

    return (
      <Fragment>
        <ModalConfirm
          title={"Verwijderen"}
          confirmMessage={"Ja"}
          cancelMessage={"Nee"}
          show={!!deletingRows.length}
          onToggle={this.cancelDelete}
          onCancel={this.cancelDelete}
          onConfirm={this.deleteRows}
          body={<p>Ben je zeker dat je deze wijn wilt verwijderen?</p>}
        />
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <DataTypeProvider
            for={colorColumns}
            formatterComponent={ColorTypeFormatter}
          />
          <SearchState defaultValue={""} />
          <SortingState
            defaultSorting={[{ columnName: "title", direction: "asc" }]}
          />{" "}
          <EditingState
            onAddedRowsChange={this.handleNewWine}
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={this.changeEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={this.changeRowChanges}
            onCommitChanges={this.commitChanges}
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
      </Fragment>
    );
  }
}

export default WinesEditor;
