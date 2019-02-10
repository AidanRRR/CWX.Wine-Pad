import * as Yup from 'yup';

export interface IValues {
    id: number;
    name: string;
    description: string;
}

export interface IProps {
    onSubmit: (IValues) => void
}

export const validations = Yup.object().shape({
    name: Yup.string()
        .required('Geef een naam op')
});

export const initialValues: IValues = {
    id: 0,
    name: '',
    description: ''
};