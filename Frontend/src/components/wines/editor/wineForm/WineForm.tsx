import React, { Component } from "react";
import { Formik } from "formik";
import { FieldInfos, initialValues, IValues, validations } from "./config";
import {
  MultiTextField,
  SelectField,
  TextField
} from "../../../ui/forms/FormFields";
import { IWine } from "../../Wine";

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
          {({ errors }) => (
            <div>
              <TextField field={FieldInfos.title} errors={errors} />
              <TextField field={FieldInfos.year} errors={errors} />
              <TextField field={FieldInfos.type} errors={errors} />
              <TextField field={FieldInfos.region} errors={errors} />
              <SelectField field={FieldInfos.country} errors={errors} />
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
