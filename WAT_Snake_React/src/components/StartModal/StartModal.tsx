import { Component } from "react";
import { Button1 } from "../Reusable/Button1";

class StartModalProps {
  onStartClick : Function = ()=>{}
}

export class StartModal extends Component<StartModalProps, any> {
  constructor(props : StartModalProps) {
    super(props);
    this.start = this.start.bind(this);
  }
  start(e : MouseEvent) {
    (e.target as HTMLElement).blur();
    this.props.onStartClick(e);
  }
  render() {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 flex items-center justify-center z-10">
        <div className="border-4 border-secondary rounded-lg bg-primary p-4 w-2/3 flex flex-col gap-4 items-center">
          <div className="text-4xl font-bold text-center text-secondary">
            Snake
          </div>
          <div className="text-center text-white">
            Гра зроблена в якості тестового завдання. Використані технології
            React, TS, Vite.
          </div>
          <Button1
            onClick={(e : MouseEvent)=>this.start(e)}
            className="mx-auto w-fit"
            text="Старт"
            disabled={false}
          />
        </div>
      </div>
    );
  }
}
