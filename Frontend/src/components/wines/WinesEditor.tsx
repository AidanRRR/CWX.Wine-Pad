import React, {Component} from 'react';
import {
    CustomGrouping, CustomTreeData,
    EditingState,
    FilteringState, GroupingState,
    IntegratedFiltering,
    IntegratedPaging,
    PagingState, TreeDataState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    TableFilterRow,
    PagingPanel,
    TableGroupRow, TableTreeColumn
} from '@devexpress/dx-react-grid-bootstrap4';
import {editColumnMessages, headerRowMessages, tableMessages} from "../ui/react-grid/Localization";
import Wines from './Wines.json';
import {IWineDataTable} from "./Wine";

const getRowId = row => row.id;
const getChildGroups = groups => groups
    .map(group => (
            {
                key: group.key,
                childRows: group.items
            }
        )
    );
const getChildRows = (row, rootRows) => {
    if (row) {
        console.log(row.items);
    }
    return (row ? row.items : rootRows);
};

const CommandButton = ({onExecute, icon, text, hint, color}) => (
    <button type="button" className="btn btn-link" style={{padding: 11}}
            onClick={(e) => {
                onExecute();
                e.stopPropagation();
            }}
            title={hint}>

    <span className={color || 'undefined'}>
        {icon ? <i className={`ti-${icon}`} style={{marginRight: text ? 5 : 0}}/> : null}
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

const Command = ({id, onExecute}) => (
    <CommandButton {...commandComponentProps[id]} onExecute={onExecute}/>
);

interface IProps {
}

interface IState {
    rows: any,
    columns: any,
    pageSizes: any,
    grouping: any,
    data: any,
    tableColumnExtensions: any
}

class WinesEditor extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        const data = [{
            name: 'Sandra',
            sex: 'Female',
            city: 'Las Vegas',
            car: 'Audi A4',
            items: [{
                name: 'Sandra a',
                sex: 'Male',
                city: 'Las Vegas',
                car: 'VW Beetle'
            }]
        }, {
            name: 'Bert',
            sex: 'Male',
            city: 'Las Vegas',
            car: 'Audi BA',
        }];

        const parsedRows: IWineDataTable[] = Wines.Wines;
        // const data = parsedRows.map((wine) => {
        //     return ({
        //         title: wine.title,
        //         items: [{title: 'a'}]
        //     });
        // });

        // const data = parsedRows.map((wine) => {
        //     return ({
        //         key: wine.title,
        //         items: wine.years
        //     });
        // });

        this.state = {
            // columns: [
            //     {name: 'title', title: 'Naam'},
            //     {name: 'type', title: 'Type'},
            //     {name: 'region', title: 'Regio'},
            //     {name: 'price', title: 'Prijs'},
            //     {name: 'year', title: 'Jaar'},
            //     {name: 'description', title: 'Omschrijving'},
            // ],
            columns: [
                {name: 'name', title: ''},
                {name: 'sex', title: ''},
                {name: 'city', title: ''},
                {name: 'car', title: ''}
            ],
            tableColumnExtensions: [
                {columnName: 'title', width: 300}
            ],
            grouping: [{columnName: 'title'}],
            pageSizes: [5, 10, 15, 0],
            data: data,
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
        const {data, columns, tableColumnExtensions, pageSizes} = this.state;

        return (
            <Grid rows={data} columns={columns} getRowId={getRowId}>
                {/*<PagingState defaultCurrentPage={0} pageSize={10}/>*/}
                {/*<FilteringState defaultFilters={[]}/>*/}
                {/*<EditingState onCommitChanges={this.commitChanges}/>*/}
                {/*<GroupingState grouping={[{columnName: 'title'}]}/>*/}
                {/*<CustomGrouping getChildGroups={getChildGroups}/>*/}
                {/*<IntegratedFiltering/>*/}
                {/*<IntegratedPaging/>*/}
                <TreeDataState/>
                <CustomTreeData getChildRows={getChildRows} />
                <Table messages={tableMessages} columnExtensions={tableColumnExtensions}/>
                {/*<TableFilterRow />*/}
                <TableHeaderRow messages={headerRowMessages}/>
                <TableTreeColumn for="name"/>

                {/*<TableGroupRow/>*/}
                {/*<TableEditRow />*/}
                {/*<TableEditColumn messages={editColumnMessages}*/}
                {/*commandComponent={Command}*/}
                {/*showAddCommand*/}
                {/*showEditCommand*/}
                {/*showDeleteCommand />*/}
                {/*<PagingPanel pageSizes={pageSizes}/>*/}
            </Grid>
        );
    }
}

export default WinesEditor;