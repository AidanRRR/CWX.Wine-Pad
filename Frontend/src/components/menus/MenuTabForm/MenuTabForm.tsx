import React, {Component} from 'react';
import {Field, Formik} from "formik";
import {initialValues, IValues, validations} from "./Config";

interface IState {
}

interface IProps {
    onComplete: () => void,
    confirmed: boolean,
    modalFooter?: any
}

class MenuTabForm extends Component<IProps, IState> {
    render() {
        const { confirmed } = this.props;

        return (
            <Formik initialValues={initialValues} validationSchema={validations} onSubmit={() => {
            }}>
                {({errors, touched, values}) => {

                    if (confirmed && errors.name === undefined && touched.name===true) {
                        this.submit(errors, values);
                    }

                    return (
                        <div className="form-group row">
                            <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Naam</label>
                            <div className="col-sm-10">
                                <Field className={errors.name ? 'form-control parsley-error' : 'form-control'}
                                       type="text" name="name" placeholder="Bv. 'By the glass'"/>
                                {errors.name && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errors.name}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    )
                }}
            </Formik>
        );
    }

    submit = async (errors: any, values: IValues) => {
        this.props.onComplete();
    }
}

export default MenuTabForm;