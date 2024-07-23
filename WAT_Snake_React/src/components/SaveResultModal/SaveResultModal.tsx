import { Component } from "react";
import { Button1 } from "../Reusable/Button1";
import Input1 from "../Reusable/Input/Input1";

class SaveResultModalProps {
  isVisible: boolean = false;
  score: number = 0;
  closeFunc : Function = ()=>{}
}

export class SaveResultModal extends Component<SaveResultModalProps, any> {
  constructor(props : SaveResultModalProps) {
    super(props);

    this.state = {
      username: "",
      isValid: false,
      error: undefined,
    };
    this.handleInput = this.handleInput.bind(this);
    this.saveResult = this.saveResult.bind(this);
  }

  handleInput(value : string) {
    this.setState({
      username: value,
    });
    this.validate();
  }

  async saveResult() {
    this.setState({
      isValid : false
    })
    await fetch(`${import.meta.env.VITE_BASE_URL}/scores/create`, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        score: this.props.score,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        alert("Дані збережено")
        this.props.closeFunc()
      })
      .catch(() => {
        alert("Не вдалось зберегти дані")
        this.setState({
          isValid : true
        })
      });
  }

  validate() {
    this.setState({
      isValid: this.state.username.length >= 2 && this.state.username.length <=18
    });
  }

  render() {
    return this.props.isVisible ? (
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 flex items-center justify-center z-10">
        <div className="border-4 border-secondary rounded-lg bg-primary p-4 w-2/3 flex flex-col gap-4 items-center">
          <div className="text-2xl font-bold text-center text-secondary">
            Збереження результатів
          </div>
          <div className="text-2xl font-bold text-white">
            Ви набрали {this.props.score} очок.
          </div>
          <Input1 placeholder="Введіть ім'я" onChange={this.handleInput} />
          <Button1
            className="mx-auto w-fit"
            text="Зберегти"
            disabled={!this.state.isValid}
            onClick={this.saveResult}
          />
        </div>
      </div>
    ) : null;
  }
}
