export interface ICountry {
    id: number,
    name: string
}

export interface ICountrySuggestion {
    value: number,
    label: string
}

export const Countries: ICountry[] = [
    {
        id: 0,
        name: "België"
    },
    {
        id: 1,
        name: "Frankrijk"
    }
];