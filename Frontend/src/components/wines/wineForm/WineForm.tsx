import React, { Component } from "react";
import { Formik } from "formik";
import { FieldInfos, initialValues, IValues, validations } from "./config";
import { MultiTextField, TextField } from "../../ui/forms/FormFields";
import { IWine } from "../../../models/Wine";
import { FormikSelect } from "../../ui/forms/FormikSelect";
import { CountrySuggestions } from "../../../models/Country";
import SaveCancel from "../../ui/buttons/SaveCancel";

export interface IProps {
  wine: IWine;
  onCancel: () => void;
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
    const { onCancel } = this.props;

    return (
      <div className={"row"}>
        <div className={"col-md-12 mb-4"}>
          <h1 className={"h1-dark"}>Wijn informatie</h1>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validations}
          onSubmit={() => {}}
        >
          {({ submitForm, values, errors, setFieldValue, setFieldTouched }) => (
            <div className={"col-md-12"}>
              <TextField field={FieldInfos.title} errors={errors} dark={true} />
              <TextField field={FieldInfos.year} errors={errors} dark={true} />
              <TextField field={FieldInfos.type} errors={errors} dark={true} />
              <TextField
                field={FieldInfos.region}
                errors={errors}
                dark={true}
              />

              <div className="form-group row">
                <label
                  htmlFor="example-text-input"
                  className="col-sm-3 col-form-label label-dark"
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

              <MultiTextField
                field={FieldInfos.description}
                errors={errors}
                dark={true}
              />
              <TextField field={FieldInfos.price} errors={errors} dark={true} />
              <SaveCancel onConfirm={submitForm} onCancel={onCancel} />
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
