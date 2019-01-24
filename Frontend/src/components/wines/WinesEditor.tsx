import React, {Component} from 'react';
import {
    EditingState,
    IntegratedFiltering,
    IntegratedPaging,
    IntegratedSorting,
    PagingState,
    SearchState,
    SortingState,
    DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    PagingPanel,
    SearchPanel,
    Toolbar, TableColumnResizing
} from '@devexpress/dx-react-grid-bootstrap4';
import {
    editColumnMessages,
    headerRowMessages,
    pagingMessages,
    searchMessages,
    tableMessages
} from "../ui/react-grid/Localization";
import Wines from './Wines.json';
import {Command, getRowId, MultilineEditCell} from "../ui/react-grid/Helpers";

interface IProps {
}

interface IState {
    rows: any,
    columns: any,
    pageSizes: any,
    grouping: any,
    tableColumnExtensions: any,
    defaultColumnWidths: any
}

const isMultiline = (columnName) => {
    return columnName.name === 'description';
};

const EditCell = (props) => {
    const {column} = props;

    if (isMultiline(column)) {
        return <MultilineEditCell {...props} />
    } else {
        return <TableEditRow.Cell {...props} />
    }
};

class WinesEditor extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {name: 'title', title: 'Naam'},
                {name: 'year', title: 'Jaar'},
                {name: 'type', title: 'Type'},
                {name: 'region', title: 'Regio'},
                {name: 'description', title: 'Omschrijving'},
                {name: 'price', title: 'Prijs'}
            ],
            defaultColumnWidths: [
                { columnName: 'title', width: 180 },
                { columnName: 'year', width: 75 },
                { columnName: 'type', width: 100 },
                { columnName: 'region', width: 240 },
                { columnName: 'description', width: 400 },
                { columnName: 'price', width: 100 },
            ],
            tableColumnExtensions: [
                {columnName: 'title', width: 300}
            ],
            grouping: [{columnName: 'title'}],
            pageSizes: [5, 10, 15, 0],
            rows: Wines.Wines
        };

        this.commitChanges = this.commitChanges.bind(this);
    }

    commitChanges({added, changed, deleted}: any) {
        let {rows} = this.state;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            rows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            rows = rows.map(row => (changed[row.id] ? {...row, ...changed[row.id]} : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.id));
        }
        this.setState({rows});
    }

    render() {
        const {rows, defaultColumnWidths, columns, tableColumnExtensions, pageSizes} = this.state;

        return (
            <Grid rows={rows} columns={columns} getRowId={getRowId}>
                <SearchState defaultValue={""}/>
                <SortingState/>
                <PagingState defaultCurrentPage={5} defaultPageSize={10}/>
                <EditingState onCommitChanges={this.commitChanges}/>
                <IntegratedPaging/>
                <IntegratedSorting/>
                <IntegratedFiltering/>
                <Table messages={tableMessages} columnExtensions={tableColumnExtensions}/>
                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableHeaderRow messages={headerRowMessages} showSortingControls/>
                <TableEditRow cellComponent={EditCell}/>
                <Toolbar/>
                <SearchPanel messages={searchMessages}/>
                <TableEditColumn messages={editColumnMessages}
                                 commandComponent={Command}
                                 showAddCommand
                                 showEditCommand
                                 showDeleteCommand/>
                <PagingPanel messages={pagingMessages} pageSizes={pageSizes}/>
            </Grid>
        );
    }
}

export default WinesEditor;