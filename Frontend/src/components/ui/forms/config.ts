export interface IFormikFieldInfo {
    name: string;
    label: string;
    errorMessage: string;
}

export type FieldInfosType<TValues> = { [key in keyof TValues]: FormikFieldInfo<TValues> };

export class FormikFieldInfo<TValues> {
    public name: keyof TValues;
    public label: string;
    public errorMessage: string;

    constructor(name: keyof TValues, label: string, errorMessage: string = RequiredMessage) {
        this.name = name;
        this.label = label;
        this.errorMessage = errorMessage;
    }
}

export const DateRegex = new RegExp(
    '^\\s*(3[01]|[12][0-9]|0?[1-9])\\-(1[012]|0?[1-9])\\-((?:19|20)\\d{2})\\s*$'
);

export const RequiredMessage = 'Geef een waarde in';
