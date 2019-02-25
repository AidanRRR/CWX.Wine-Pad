import * as Yup from 'yup';
import {FieldInfosType, FormikFieldInfo} from "../../ui/forms/config";

export type IValues = {
    title: string | null;
    year: number | null;
    type: string | null;
    region: string | null;
    country: string | null;
    description: string | null;
    price: number | null;
}

export const FieldInfos: FieldInfosType<IValues> = {
    title: new FormikFieldInfo('title', 'Titel'),
    year: new FormikFieldInfo('year', 'Jaar'),
    type: new FormikFieldInfo('type', 'Type'),
    region: new FormikFieldInfo('region', 'Regio'),
    country: new FormikFieldInfo('country', 'Land'),
    description: new FormikFieldInfo('description', 'Omschrijving'),
    price: new FormikFieldInfo('price', 'Prijs'),
};

export interface IProps {
    onSubmit: (IValues) => void
}

export const validations = Yup.object().shape({
    title: Yup.string()
        .required('Geef een naam op')
});

export const initialValues: IValues = {
    title: '',
    description: '',
    price: null,
    region: '',
    type: '',
    year: null,
    country: ''
};