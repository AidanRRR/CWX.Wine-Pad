import React, {Component} from 'react';
import { EditingState, FilteringState, IntegratedFiltering, IntegratedPaging, PagingState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn, TableFilterRow, PagingPanel, TableColumnResizing } from '@devexpress/dx-react-grid-bootstrap4';
import {editColumnMessages, headerRowMessages, tableMessages} from "../ui/react-grid/Localization";
import Wines from './Wines.json';

const getRowId = row => row.id;

const CommandButton = ({ onExecute, icon, text, hint, color }) => (
    <button type="button" className="btn btn-link" style={{ padding: 11 }}
            onClick={(e) => {
                onExecute();
                e.stopPropagation();
            }}
            title={hint}>

    <span className={color || 'undefined'}>
        {icon ? <i className={`ti-${icon}`} style={{ marginRight: text ? 5 : 0 }} /> : null}
        {text}
    </span>
    </button>
);

const commandComponentProps = {
    add: {
        icon: 'plus',
        hint: 'Nieuwe toevoegen',
    },
    edit: {
        icon: 'pencil',
        hint: 'Aanpassen',
        color: 'text-warning',
    },
    delete: {
        icon: 'trash',
        hint: 'Verwijder',
        color: 'text-danger',
    },
    commit: {
        icon: 'check',
        hint: 'Opslaan',
        color: 'text-success',
    },
    cancel: {
        icon: 'close',
        hint: 'Annuleren',
        color: 'text-danger',
    },
};

const Command = ({ id, onExecute }) => (
    <CommandButton
        {...commandComponentProps[id]}
        onExecute={onExecute}
    />
);

interface IProps {}
interface IState {
    rows: any,
    columns: any,
    pageSizes: any,
    defaultColumnWidths: any,
    minColumnWidths: any
}

class WinesEditor extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {name: 'title', title: 'Naam'},
                {name: 'type', title: 'Type'},
                {name: 'region', title: 'Regio'},
                {name: 'price', title: 'Prijs'},
                {name: 'description', title: 'Omschrijving'},
            ],
            // minColumnWidths: [
            //     {columnName: 'title', width: 275},
            //     {columnName: 'type', width: 100},
            //     {columnName: 'region', width: 275},
            //     {columnName: 'price', width: 100},
            //     {columnName: 'description', width: 350}
            // ],
            minColumnWidths: [],
            defaultColumnWidths: [
                {columnName: 'title', width: '25%'},
                {columnName: 'type', width: '5%'},
                {columnName: 'region', width: '30%'},
                {columnName: 'price', width: '10%'},
                {columnName: 'description', width: '30%'}
            ],
            pageSizes: [5, 10, 15, 0],
            rows: Wines.Wines
        };

        this.commitChanges = this.commitChanges.bind(this);
    }

    commitChanges({ added, changed, deleted }: any) {
        let { rows } = this.state;
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
            rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.id));
        }
        this.setState({ rows });
    }

    render() {
        const { rows, columns, pageSizes, minColumnWidths, defaultColumnWidths } = this.state;

        return (
            <Grid rows={rows} columns={columns} getRowId={getRowId}>
                <PagingState defaultCurrentPage={0} pageSize={10} />
                <FilteringState defaultFilters={[]} />
                <EditingState onCommitChanges={this.commitChanges} />
                <IntegratedFiltering />
                <IntegratedPaging />
                <Table messages={tableMessages} />
                <TableColumnResizing minColumnWidth={minColumnWidths} defaultColumnWidths={defaultColumnWidths} />
                <TableFilterRow />
                <TableHeaderRow messages={headerRowMessages} />
                <TableEditRow />
                <TableEditColumn messages={editColumnMessages}
                                 commandComponent={Command}
                                 showAddCommand
                                 showEditCommand
                                 showDeleteCommand />
                <PagingPanel pageSizes={pageSizes} />
            </Grid>
        );
    }
}

export default WinesEditor;