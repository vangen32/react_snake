import {ChangeEvent, Component} from "react";
import "./input.css";

class Input1Props {
  placeholder?: string;
  onChange: Function = () => {};
}

class Input1 extends Component<Input1Props, any> {
  constructor(props : Input1Props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  handleChange(e : ChangeEvent<HTMLInputElement>) {
    this.props.onChange(e.target.value);
    this.setState({ inputValue: e.target.value });
  }

  styles() {
    let classes = "input-1";
    if (this.state.isFocused) classes += " input-1-focus";
    return classes;
  }

  render() {
    return (
      <input
        type="text"
        placeholder={this.props.placeholder}
        className={this.styles()}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    );
  }
}

export default Input1;
