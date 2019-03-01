import * as Yup from 'yup';
import {FieldInfosType, FormikFieldInfo} from "../../ui/forms/config";

export type IValues = {
    name: string | null;
    description: string | null;
}

export const FieldInfos: FieldInfosType<IValues> = {
    name: new FormikFieldInfo('name', 'Naam'),
    description: new FormikFieldInfo('description', 'Omschrijving'),
};

export interface IProps {
    onSubmit: (IValues) => void
}

export const validations = Yup.object().shape({
    title: Yup.string()
        .required('Geef een naam op')
});

export const initialValues: IValues = {
    name: '',
    description: ''
};