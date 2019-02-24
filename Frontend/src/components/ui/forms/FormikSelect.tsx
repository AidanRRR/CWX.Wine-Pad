import * as React from "react";
import Select from "react-select";

interface IProps {
  value: any;
  suggestions: any;
  error: any;
  field: string;
  onChange: (field: string, value: any) => void;
  onBlur: (field: string, isTouched: boolean) => void;
  placeholder: string | undefined;
}
interface IState {
  selectedOption: any;
}

export class FormikSelect extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedOption: null
    };
  }

  render() {
    const { suggestions, placeholder } = this.props;
    const { selectedOption } = this.state;

    return (
      <Select
        className={"react-select-container"}
        classNamePrefix="react-select"
        placeholder={placeholder}
        value={selectedOption}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        options={suggestions}
      />
    );
  }

  handleBlur = () => {
    const { onBlur, field } = this.props;

    onBlur(field, true);
  };

  handleChange = (selectedOption: any) => {
    const { onChange, field } = this.props;

    this.setState({ selectedOption });

    onChange(field, selectedOption.value);
  };
}
