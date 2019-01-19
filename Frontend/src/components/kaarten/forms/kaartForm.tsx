import React, {Component} from 'react';
import {Field, Formik} from "formik";
import {initialValues, IValues, validations} from "./kaartFormSetup";

interface IState {}
interface IProps {
    onComplete: () => void
}

class KaartForm extends Component<IProps, IState> {
    render() {
        return (
            <Formik initialValues={initialValues} validationSchema={validations} onSubmit={() => {
            }}>
                {({errors, touched}) => (
                    <div className="form-group row">
                        <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Naam</label>
                        <div className="col-sm-10">
                            <Field className={errors.name ? 'form-control parsley-error' : 'form-control'}
                                   type="text" name="name" placeholder="Geef een naam aan het onderdeel"/>
                            {errors.name && (
                                <ul className="parsley-errors-list filled">
                                    <li className="parsley-required">{errors.name}</li>
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </Formik>
        );
    }

    submit = async (values: IValues) => {
        // Send to backend
    }
}

export default KaartForm;