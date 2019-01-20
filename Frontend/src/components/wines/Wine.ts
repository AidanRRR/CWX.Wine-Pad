interface IWineYear {
    year: number,
    price: number,
    description: string,
}

export interface IWine {
    id: number,
    title: string,
    region: string,
    years?: IWineYear[],
    type: string
}

export interface IWineYearDataTable {
    year: number,
    region: string,
    type: string,
    price: number,
    description: string
}
export interface IWineDataTable {
    id: number,
    title: string,
    years?: IWineYearDataTable[]
}