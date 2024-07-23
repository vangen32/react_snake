import React, {Component, createRef} from "react";

export class GameScoresProps {
  score: number = 0;
  speed: number = 1;
  snakeBodyLength: number = 3;
}

export class GameScores extends Component<GameScoresProps, any> {
  readonly divRef: React.RefObject<HTMLDivElement>;
  constructor(props : GameScoresProps) {
    super(props);
    this.state = {
      scores : []
    }
    this.divRef = createRef();
  }

  async getScores() {
    await fetch(`${import.meta.env.VITE_BASE_URL}/scores/list`, {
      method: "GET",
    })
        .then( async (response) => {
          const data = await response.json();
          this.setState({
            scores :data
          })
        })
        .catch(() => {
          alert("Не отримати дані рекордсменів")
        });
  }

  leaderBoard(){
    let list = null;
    if(this.state.scores.length)
     list = this.state.scores?.map((i : {username : string, score : number}, index : number)=>{
      return (<tr key={index} >
        <td className="whitespace-break-spaces break-all">{i.username}</td>
        <td>{i.score}</td>
      </tr>)
    })

    return <table className="w-full table-auto">
      {list}
    </table>
  }

  async componentDidMount() {
    await this.getScores()
  }

  render() {
    return (
      <div className="basis-1/4 grow-0 flex flex-col gap-4" ref={this.divRef}>
        <div className="nice-container flex flex-col gap-3">
          <div className="basis-1/4 flex flex-col gap-4">
            <div>Рахунок: {this.props.score}</div>
            <div>Швидкість: {this.props.speed}</div>
            <div>Довжина: {this.props.snakeBodyLength ?? 0}</div>
          </div>
        </div>
        <div className="nice-container basis-0 grow overflow-auto overflow-y-hidden">
          <h3 className="text-center text-secondary font-bold">Лідери</h3>
          {this.leaderBoard()}
        </div>
      </div>
    );
  }
}
