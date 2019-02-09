import React, { Component } from "react";
import { Field, Formik } from "formik";
import { initialValues, IValues, validations } from "./Config";

interface IState {}
interface IProps {
  onComplete: () => void;
}

class NewMenuForm extends Component<IProps, IState> {
  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={() => {}}
      >
        {({ errors, touched }) => (
          <div>
            <div className="form-group row">
              <label
                htmlFor="example-text-input"
                className="col-sm-3 col-form-label"
              >
                Naam
              </label>
              <div className="col-sm-9">
                <Field
                  className={
                    errors.name ? "form-control parsley-error" : "form-control"
                  }
                  type="text"
                  name="name"
                  placeholder="Bv. 'Restaurant de vettigen hoek'"
                />
                {errors.name && (
                  <ul className="parsley-errors-list filled">
                    <li className="parsley-required">{errors.name}</li>
                  </ul>
                )}
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="example-text-input"
                className="col-sm-3 col-form-label"
              >
                Omschrijving
              </label>
              <div className="col-sm-9">
                <Field
                  type="text"
                  component={"textarea"}
                  className={"form-control"}
                  name="description"
                  placeholder="Een optionele omschrijving van de kaart..."
                />
              </div>
            </div>
          </div>
        )}
      </Formik>
    );
  }

  submit = async (values: IValues) => {
    // Send to backend
  };
}

export default NewMenuForm;
