export interface IWine {
    id: number,
    title: string,
    region: string,
    year?: number | null,
    price?: number | string,
    description: string,
    type: string
}