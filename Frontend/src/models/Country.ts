export interface ICountry {
    id: number,
    name: string
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

export const CountrySuggestions = [
    { value: 0, label: 'België' },
    { value: 1, label: 'Frankrijk' },
];