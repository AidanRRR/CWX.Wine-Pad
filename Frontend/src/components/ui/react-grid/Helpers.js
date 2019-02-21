import React from "react";

export const getRowId = row => row.id;

export const CommandButton = ({onExecute, icon, text, hint, color}) => (
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

export const MultilineEditCell = ({column, value, onValueChange}) => (
    <td style={{ verticalAlign: 'middle', padding: 1}}>
        <textarea className="form-control" style={{height: 125}}
                  value={value} onChange={e => onValueChange(e.target.value)}>
        </textarea>
    </td>
);

export const Command = ({id, onExecute}) => (
    <CommandButton {...commandComponentProps[id]} onExecute={onExecute}/>
);

export const commandComponentProps = {
    add: {
        icon: 'plus',
        hint: 'Nieuwe toevoegen',
        color: 'table-icon'
    },
    edit: {
        icon: 'pencil',
        hint: 'Aanpassen',
        color: 'table-icon',
    },
    delete: {
        icon: 'trash',
        hint: 'Verwijder',
        color: 'table-icon',
    },
    commit: {
        icon: 'check',
        hint: 'Opslaan',
        color: 'table-icon',
    },
    cancel: {
        icon: 'close',
        hint: 'Annuleren',
        color: 'table-icon',
    },
};