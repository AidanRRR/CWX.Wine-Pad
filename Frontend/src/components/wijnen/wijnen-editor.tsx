import React, {Component} from 'react';
import {EditingState, FilteringState, IntegratedFiltering} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    TableFilterRow
} from '@devexpress/dx-react-grid-bootstrap4';
import {editColumnMessages, headerRowMessages, tableMessages} from "../ui/react-grid/Localization";

const getRowId = row => row.id;

interface IProps {}
interface IState {
    rows: any,
    columns: any
}

class WijnenEditor extends React.Component<IProps, IState> {
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
            rows: []
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
        const { rows, columns } = this.state;

        return (
            <Grid rows={rows} columns={columns} getRowId={getRowId}>
                <FilteringState defaultFilters={[]} />
                <IntegratedFiltering />
                <EditingState onCommitChanges={this.commitChanges} />
                <Table messages={tableMessages} />
                <TableFilterRow />
                <TableHeaderRow messages={headerRowMessages} />
                <TableEditRow />
                <TableEditColumn messages={editColumnMessages} showAddCommand showEditCommand showDeleteCommand />
            </Grid>
        );
    }
}

export default WijnenEditor;