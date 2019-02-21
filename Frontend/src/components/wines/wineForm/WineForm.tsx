import React, { Component } from "react";
import { Field, Formik } from "formik";
import { FieldInfos, initialValues, IValues, validations } from "./config";
import {
  MultiTextField,
  SelectField,
  TextField
} from "../../ui/forms/FormFields";
import { IWine } from "../../../models/Wine";
import { FormikSelect } from "../../ui/forms/FormikSelect";
import { CountrySuggestions } from "../../../models/Country";

export interface IProps {
  wine: IWine;
}
export interface IState {
  initialValues: IValues;
}

class WineForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      initialValues: this.createInitialValues()
    };
  }

  render() {
    const { initialValues } = this.state;

    return (
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validations}
          onSubmit={() => {}}
        >
          {({ values, errors, setFieldValue, setFieldTouched }) => (
            <div>
              <TextField field={FieldInfos.title} errors={errors} />
              <TextField field={FieldInfos.year} errors={errors} />
              <TextField field={FieldInfos.type} errors={errors} />
              <TextField field={FieldInfos.region} errors={errors} />

              <div className="form-group row">
                <label
                  htmlFor="example-text-input"
                  className="col-sm-3 col-form-label"
                >
                  {FieldInfos.country.label}
                </label>
                <div className="col-sm-9">
                  <FormikSelect
                    value={values.country}
                    suggestions={CountrySuggestions}
                    error={errors.country}
                    field={FieldInfos.country.name}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={FieldInfos.country.label}
                  />
                </div>
              </div>

              <MultiTextField field={FieldInfos.description} errors={errors} />
              <TextField field={FieldInfos.price} errors={errors} />
            </div>
          )}
        </Formik>
      </div>
    );
  }

  createInitialValues(): IValues {
    const { wine } = this.props;

    if (wine.id === 0) {
      return initialValues;
    } else {
      return {
        title: wine.title,
        country: wine.country,
        year: wine.year,
        type: wine.type,
        region: wine.region,
        price: wine.price,
        description: wine.description
      };
    }
  }
}

export default WineForm;
