import { Component } from "react";
import "./button1.css";

class ButtonProps {
  onClick: Function = () => {};
  className?: string;
  text?: string;
  disabled: boolean = false;
}
export class Button1 extends Component<ButtonProps, any> {
  classes() {
    return "button1 " + this.props.className;
  }

  render() {
    return (
      <button
        className={this.classes()}
        onClick={(e) => this.props.onClick(e)}
        disabled={this.props.disabled}
      >
        {this.props.text}
      </button>
    );
  }
}
