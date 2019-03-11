import React, { Component } from "react";
import { Field, Formik } from "formik";
import { MultiTextField, TextField } from "../../ui/forms/FormFields";
import { IMenu } from "../../../scenes/menu/Menus";
import { FieldInfos, initialValues, IValues, validations } from "./config";
import { FileUploader } from "../../ui/dropzone/Dropzone";

interface IState {}
interface IProps {
  onComplete: () => void;
  menu?: IMenu;
}

class MenuForm extends Component<IProps, IState> {
  render() {
    const { menu } = this.props;

    return (
      <div className={"row"}>
        <div className={"col-md-12 mb-4"}>
          <h1 className={"h1-dark"}>
            {menu ? "Menu aanpassen" : "Menu toevoegen"}
          </h1>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validations}
          onSubmit={() => {}}
        >
          {({ errors, touched }) => (
            <div className="col-md-12">
              <TextField field={FieldInfos.name} errors={errors} dark={true} />
              <MultiTextField
                height={100}
                field={FieldInfos.description}
                errors={errors}
                dark={true}
              />

              <div className="form-group row">
                <label className={"col-sm-3 col-form-label label-dark"}>
                  Cover foto
                </label>
                <div className="col-sm-9">
                  <FileUploader onFileUploaded={() => {}} />
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    );
  }

  submit = async (values: IValues) => {
    // Send to backend
  };
}

export default MenuForm;
