import  {Component, createRef, RefObject} from "react";
import Board from "../Board/Board";
import GameEngine from "../../types/GameEngine";
import Size from "../../types/Size";
import { Direction } from "../../enums/Direction";
import "./app.css";
import { StartModal } from "../StartModal/StartModal";
import { Button1 } from "../Reusable/Button1";
import { GameInfo } from "../GameInfo/GameInfo";
import { GameScores } from "../GameScores/GameScores";
import { Pause } from "../Pause/Pause";
import { SaveResultModal } from "../SaveResultModal/SaveResultModal";

class App extends Component<unknown, any> {
  game: GameEngine = new GameEngine(new Size(0,0), ()=>{});
  board : RefObject<Board>;
  gameScores : RefObject<GameScores>;

  constructor(props : unknown) {
    super(props);
    this.state = {
      snakeBody: [],
      unitSize: 20,
      score: 0,
      food: undefined,
      isEaten: false,
      isGameValid: false,
      isPaused: false,
      speed: 1,
      isSaveResultModal: false,
    };
    this.board = createRef();
    this.gameScores = createRef()
    this.start = this.start.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.closeSaveResModal = this.closeSaveResModal.bind(this);
  }

  initNewGame() {
    if (this.board?.current?.divRef?.current) {
      this.game = new GameEngine(
        new Size(
          this.board.current.divRef.current?.offsetWidth,
          this.board.current.divRef.current?.offsetHeight,
        ),
        () => this.updateState(),
      );
      this.updateState();
    }
  }

  updateState() {
    this.setState(
      {
        snakeBody: this.game.snake,
        unitSize: this.game.unitSize,
        score: this.game.score,
        food: this.game.food,
        isEaten: this.game.isSnakeEatThemSelf,
        isGameValid: this.game.isGameValid,
        isPaused: this.game.isPause,
        speed: Math.floor(this.game.score / this.game.pointsToSpeedUp) + 1,
        isSaveResultModal: this.game.isSnakeEatThemSelf,
      },

    );
  }

  start(e : Event | undefined) {
    if(e)
      (e?.target as HTMLElement).blur();
    this.clearGame();
    this.game?.start();
  }

  togglePause(e : Event | undefined) {
    if(e)
      (e?.target as HTMLElement).blur();
    if (this.game && this.game?.isGameValid) {
      if (this.game.isPause) this.game?.continue();
      else this.game?.pause();
      this.setState({
        isPaused: this.game?.isPause,
      });
    }
  }
  clearGame() {
    this.setState({
      snakeBody: [],
      unitSize: 0,
      score: 0,
      food: undefined,
      isEaten: false,
      isGameValid: false,
      isPaused: false,
      speed: 1,
    });
  }

  setControllerListeners() {
    window.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowUp":
          this.game.setDirection(Direction.UP);
          break;
        case "ArrowDown":
          this.game.setDirection(Direction.DOWN);
          break;
        case "ArrowLeft":
          this.game.setDirection(Direction.LEFT);
          break;
        case "ArrowRight":
          this.game.setDirection(Direction.RIGHT);
          break;
        case "Space":
          this.togglePause(undefined);
          break;
        case "Escape":
          this.game?.pause();
          this.setState({
            isPaused: true,
          });
          break;
      }
    });
    window.addEventListener("keyup", (event) => {
      let isKeyup = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].some(
        (x) => x === event.code,
      );
      if (isKeyup) this.game?.setFastMove(false);
    });
  }

  closeSaveResModal(){
    this.setState({
      isSaveResultModal: false
    })
    this.clearGame()
    if(this.gameScores?.current){
      (this.gameScores.current as GameScores).getScores();
    }
  }

  componentDidMount() {
    this.initNewGame();
    this.setControllerListeners();
  }

  render() {
    return (
      <div className="app">
        <GameScores
          score={this.state.score}
          speed={this.state.speed}
          snakeBodyLength={this.state.snakeBody?.length}
          ref={this.gameScores}
        />
        <div className="basis-2/4">
          <div className="w-fit mx-auto relative nice-container">
            <Board
              ref={this.board}
              snakeBody={this.state.snakeBody}
              unitSize={this.state.unitSize}
              food={this.state.food}
              numCells={this.game?.cellsPerLine ?? 20}
              direction={this.game?.direction ?? Direction.UP}
            />
            {!this.state.isGameValid && !this.state.isEaten && (
              <StartModal onStartClick={() => this.start(undefined)} />
            )}
            <Pause isVisible={this.state.isPaused} />
            <SaveResultModal
              isVisible={this.state.isSaveResultModal}
              score={this.state.score}
              closeFunc={this.closeSaveResModal}
            />
          </div>
          <div className="flex justify-center gap-4">
            {this.state.isGameValid && (
              <>
                <Button1
                  onClick={this.start}
                  text={this.state.isGameValid ? "Рестарт" : "Старт"}
                  className="basis-1/4"
                  disabled={false}
                />
                <Button1
                  disabled={!this.state.isGameValid}
                  className="basis-1/4"
                  onClick={this.togglePause}
                  text={this.state.isPaused ? "Продовжити" : "Пауза"}
                />
              </>
            )}
          </div>
        </div>
        <GameInfo />
      </div>
    );
  }
}

export default App;
