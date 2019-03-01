import { Field } from "formik";
import React from "react";
import { IFormikFieldInfo } from "./config";

type Props = {
  field: IFormikFieldInfo;
  dark?: boolean;
  height?: number;
  errors: any;
};

export const TextField: React.FC<Props> = props => {
  const { field, errors, dark } = props;

  const labelStyle = dark
    ? "col-sm-3 col-form-label label-dark"
    : "col-sm-3 col-form-label";

  return (
    <div className="form-group row">
      <label className={labelStyle}>{field.label}</label>
      <div className="col-sm-9">
        <Field
          className={
            errors[field.name] ? "form-control parsley-error" : "form-control"
          }
          type="text"
          name={field.name}
        />
        {errors[field.name] && (
          <ul className="parsley-errors-list filled">
            <li className="parsley-required">{errors[field.name]}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export const MultiTextField: React.FC<Props> = props => {
  const { field, height, errors, dark } = props;

  const labelStyle = dark
    ? "col-sm-3 col-form-label label-dark"
    : "col-sm-3 col-form-label";

  return (
    <div className="form-group row">
      <label className={labelStyle}>{field.label}</label>
      <div className="col-sm-9">
        <Field
          className={
            errors[field.name] ? "form-control parsley-error" : "form-control"
          }
          style={height ? { height } : { height: 200 }}
          type="text"
          component={"textarea"}
          name={field.name}
        />
        {errors[field.name] && (
          <ul className="parsley-errors-list filled">
            <li className="parsley-required">{errors[field.name]}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export const SelectField: React.FC<Props> = props => {
  const { field, errors } = props;

  return (
    <div className="form-group row">
      <label htmlFor="example-text-input" className="col-sm-3 col-form-label">
        {field.label}
      </label>
      <div className="col-sm-9">
        <Field
          className={
            errors[field.name] ? "form-control parsley-error" : "form-control"
          }
          type="text"
          component={"select"}
          name={field.name}
        />
        {errors[field.name] && (
          <ul className="parsley-errors-list filled">
            <li className="parsley-required">{errors[field.name]}</li>
          </ul>
        )}
      </div>
    </div>
  );
};
