import  { Component } from "react";

export class PauseProps {
  isVisible: boolean = false;
}
export class Pause extends Component<PauseProps, any> {
  constructor(props : PauseProps) {
    super(props);
  }

  pause() {
    return this.props.isVisible ? (
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 flex items-center justify-center z-20">
        <div className="border-4 border-secondary rounded-lg bg-primary p-4 w-2/3 flex flex-col gap-4 items-center">
          <div className="text-4xl font-bold text-center text-secondary">
            Пауза
          </div>
        </div>
      </div>
    ) : null;
  }

  render() {
    return this.pause();
  }
}
