import Size from "./Size";
import Point from "./Point";
import { Direction } from "../enums/Direction";
import Food from "./Food";

class GameEngine {
  readonly cellsPerLine = 20;
  readonly pointsToGrow = 10;
  readonly pointsToSpeedUp = 50;

  intervalId = 0;
  score = 0;
  isPause: boolean = false;
  isGameValid = false;

  boardSize: Size;
  unitSize: number;

  snake: Array<Point> = new Array<Point>(new Point(0,0));
  snakeEndPointPreMove : Point = new Point(0,0);
  direction: Direction = Direction.UP;
  isSnakeEatThemSelf = false;
  isFastMove = false;
  food: Food | null = null;

  update: Function;
  constructor(boardSize: Size, updateState: Function) {
    this.boardSize = boardSize;
    this.unitSize = Math.ceil(boardSize.width / this.cellsPerLine);
    this.update = updateState;
  }

  makeStep() {
    this.checkIsSnakeEatThemSelf();
    this.recalculateSnake();
    this.checkIsSnakeEatFood();
    this.update();
    if (!this.isSnakeEatThemSelf)
      this.intervalId = setTimeout(() => this.makeStep(), this.getMoveSpeed());
  }

  start() {
    clearTimeout(this.intervalId);
    this.initGame();
    this.intervalId = setTimeout(() => this.makeStep(), this.getMoveSpeed());
  }

  continue() {
    this.isPause = false;
    this.intervalId = setTimeout(() => this.makeStep(), this.getMoveSpeed());
  }

  pause() {
    this.isPause = true;
    clearTimeout(this.intervalId);
  }

  recalculateSnake() {
    let prevPointCoords : Point;
    this.snake.forEach((point) => {
      if (!prevPointCoords) {
        prevPointCoords = new Point(point.x, point.y);
        switch (this.direction) {
          case Direction.UP:
            point.updateCoords(
              this.pointValue(point.x),
              this.pointValue(point.y - 1),
            );
            break;
          case Direction.DOWN:
            point.updateCoords(
              this.pointValue(point.x),
              this.pointValue(point.y + 1),
            );
            break;
          case Direction.LEFT:
            point.updateCoords(
              this.pointValue(point.x - 1),
              this.pointValue(point.y),
            );
            break;
          case Direction.RIGHT:
            point.updateCoords(
              this.pointValue(point.x + 1),
              this.pointValue(point.y),
            );
            break;
        }
      } else {
        this.snakeEndPointPreMove = new Point(point.x, point.y);
        point.updateCoords(prevPointCoords.x, prevPointCoords.y);
        prevPointCoords = new Point(this.snakeEndPointPreMove.x, this.snakeEndPointPreMove.y);
      }
    });
  }

  checkIsSnakeEatFood() {
    if (
      this.food &&
      this.snake[0].x === this.food.coords.x &&
      this.snake[0].y === this.food.coords.y
    ) {
      this.score += this.food.value;
      this.checkIsSnakeGrow();
      this.createFood();
    }
  }

  checkIsSnakeEatThemSelf() {
    for (let i = 0; i < this.snake.length; i++) {
      let isEat =
        this.snake.filter((point) => point.compareCoords(this.snake[i]))
          .length > 1;
      if (isEat) {
        this.isSnakeEatThemSelf = true;
        this.isGameValid = false;
        return;
      }
    }
  }

  checkIsSnakeGrow() {
    let isGrow =
      this.snake.length - 3 < Math.floor(this.score / this.pointsToGrow);
    if (isGrow) {
      this.snake.push(
        new Point(this.snakeEndPointPreMove.x, this.snakeEndPointPreMove.y),
      );
    }
  }

  createFood() {
    const food = Food.RandomFoodFactory(
      new Point(0, 0),
      new Point(this.cellsPerLine - 1, this.cellsPerLine - 1),
    );
    if (
      this.snake.some(
        (point) => point.x === food.coords.x && point.y === food.coords.y,
      )
    ) {
      this.createFood();
    } else this.food = food;
  }

  initGame() {
    this.isGameValid = true;
    this.isSnakeEatThemSelf = false;
    this.snake = [
      new Point(10, 10),
      new Point(10, 11),
      new Point(10, 12),
      new Point(10, 13),
      new Point(10, 14),
    ];
    this.direction = Direction.UP;
    this.score = 0;
    this.createFood();
  }

  pointValue(coord: number) {
    if (coord < 0) return this.cellsPerLine - 1;
    else if (coord >= this.cellsPerLine) return 0;
    else return coord;
  }

  getMoveSpeed() {
    const tickTimeout =
      1000 - Math.floor(this.score / this.pointsToSpeedUp) * 100;
    return this.isFastMove || tickTimeout <= 0 ? 25 : tickTimeout;
  }

  setFastMove(value: boolean = false) {
    this.isFastMove = value;
  }

  setDirection(newDirection: Direction) {
    if (!this.snake) return;
    let headPoint = { x: this.snake[0].x, y: this.snake[0].y };
    let potentialPosition = undefined;

    this.isFastMove = this.direction === newDirection;

    switch (newDirection) {
      case Direction.UP:
        potentialPosition = { x: headPoint.x, y: headPoint.y - 1 };
        break;
      case Direction.DOWN:
        potentialPosition = { x: headPoint.x, y: headPoint.y + 1 };
        break;
      case Direction.LEFT:
        potentialPosition = { x: headPoint.x - 1, y: headPoint.y };
        break;
      case Direction.RIGHT:
        potentialPosition = { x: headPoint.x + 1, y: headPoint.y };
        break;
    }
    let isBackMove =
      this.snake[1].y === potentialPosition.y &&
      this.snake[1].x === potentialPosition.x;
    if (!isBackMove) this.direction = newDirection;
  }
}

export default GameEngine;
