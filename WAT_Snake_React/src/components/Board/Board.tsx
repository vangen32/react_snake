import React, {Component, createRef, ReactNode} from "react";
import { Direction } from "../../enums/Direction";
import Point from "../../types/Point";
import Food from "../../types/Food";
import "./foodAnimation.css";

interface BoardProps {
  snakeBody: Array<Point>;
  direction: Direction;
  unitSize: number;
  numCells: number;
  food: Food;
}

class Board extends Component<BoardProps, any> {
  readonly divRef: React.RefObject<HTMLDivElement>;
  constructor(props : BoardProps) {
    super(props);
    this.divRef = createRef();
  }

  getSnakeBodyItemAsset(currentItem : Point, previousItem : Point, nextItem : Point) {
    let url = undefined;
    if (!previousItem)
      switch (this.props.direction) {
        case Direction.UP:
          url = "snake/head_up.png";
          break;
        case Direction.DOWN:
          url = "snake/head_down.png";
          break;
        case Direction.LEFT:
          url = "snake/head_left.png";
          break;
        case Direction.RIGHT:
          url = "snake/head_right.png";
          break;
        default:
          break;
      }
    else {
      if (!nextItem) {
        if (
          previousItem.x - currentItem.x === 0 &&
          (previousItem.y - currentItem.y === 1 ||
            currentItem.y - previousItem.y > 1)
        )
          url = "snake/tail_up.png";
        else if (
          previousItem.x - currentItem.x === 0 &&
          (currentItem.y - previousItem.y === 1 ||
            previousItem.y - currentItem.y > 1)
        )
          url = "snake/tail_down.png";
        else if (
          previousItem.y - currentItem.y === 0 &&
          (currentItem.x - previousItem.x === 1 ||
            previousItem.x - currentItem.x > 1)
        )
          url = "snake/tail_right.png";
        else if (
          previousItem.y - currentItem.y === 0 &&
          (previousItem.x - currentItem.x === 1 ||
            currentItem.x - previousItem.x > 1)
        )
          url = "snake/tail_left.png";
      } else {
        if (
          previousItem.y - currentItem.y === 0 &&
          nextItem.y - currentItem.y === 0
        )
          url = "snake/body_horizontal.png";
        else if (
          previousItem.x - currentItem.x === 0 &&
          nextItem.x - currentItem.x === 0
        )
          url = "snake/body_vertical.png";
        else if (
          (previousItem.x - nextItem.x === 1 &&
            nextItem.y - previousItem.y === 1 &&
            currentItem.x === previousItem.x &&
            currentItem.y === nextItem.y) ||
          (previousItem.x - nextItem.x === -1 &&
            previousItem.y - nextItem.y === 1 &&
            currentItem.x === nextItem.x &&
            currentItem.y === previousItem.y)
        )
          url = "snake/body_topleft.png";
        else {
          let maxCoordValue = this.props.numCells - 1;
          let isBottom =
            previousItem.y - 1 === currentItem.y ||
            nextItem.y - 1 === currentItem.y ||
            (currentItem.y === maxCoordValue &&
              (nextItem.y === 0 || previousItem.y === 0));
          let isTop =
            previousItem.y + 1 === currentItem.y ||
            nextItem.y + 1 === currentItem.y ||
            (currentItem.y === 0 &&
              (nextItem.y === maxCoordValue ||
                previousItem.y === maxCoordValue));
          let isLeft =
            (currentItem.x === 0 &&
              (nextItem.x === maxCoordValue ||
                previousItem.x === maxCoordValue)) ||
            previousItem.x + 1 === currentItem.x ||
            nextItem.x + 1 === currentItem.x;
          let isRight =
            (currentItem.x === maxCoordValue &&
              (nextItem.x === 0 || previousItem.x === 0)) ||
            previousItem.x === currentItem.x + 1 ||
            nextItem.x === currentItem.x + 1;
          let x = undefined;
          let y = undefined;
          if (isTop) y = "top";
          else if (isBottom) y = "bottom";
          if (isRight) x = "right";
          else if (isLeft) x = "left";
          url = `snake/body_${y}${x}.png`;
        }
      }
    }
    return url;
  }
  getFoodAsset(food: Food) {
    return `food/food_${food.value}.png`;
  }
  snakeBody() {
    return this.props.snakeBody?.map((i, index) => {
      const url = this.getSnakeBodyItemAsset(
        i,
        this.props.snakeBody[index - 1],
        this.props.snakeBody[index + 1],
      );
      const style = {
        top: `${this.props.unitSize * i.y}px`,
        left: `${this.props.unitSize * i.x}px`,
        width: `${this.props.unitSize}px`,
        height: `${this.props.unitSize}px`,
        backgroundImage: `url('${url}')`,
        backgroundSize: "contain",
        zIndex: index === 0 ? 1 : 0,
      };
      return <div key={index} className="absolute " style={style}></div>;
    });
  }
  food() {
    if (!this.props.food) return null;
    else {
      const style = {
        top: `${this.props.unitSize * this.props.food.coords.y}px`,
        left: `${this.props.unitSize * this.props.food.coords.x}px`,
        width: `${this.props.unitSize}px`,
        height: `${this.props.unitSize}px`,
        backgroundImage: `url('${this.getFoodAsset(this.props.food)}')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      };
      return <div className="absolute food" style={style}></div>;
    }
  }
  bgCells(): Array<ReactNode > {
    let arr : Array<ReactNode > = [];
    for (let i = 0; i < Math.pow(this.props.numCells, 2); i++) {
      const rowIndex = Math.floor(i / this.props.numCells);
      const colIndex = i % this.props.numCells;
      const isEvenCell = (rowIndex + colIndex) % 2 === 0;
      const style = {
        width: `${this.props.unitSize}px`,
        height: `${this.props.unitSize}px`,
        backgroundColor: isEvenCell ? "#B4E380" : "#88D66C",
      };
      arr.push(<div style={style} key={i}></div>);
    }
    return arr;
  }
  render() {
    return (
      <div
        ref={this.divRef}
        className="bg-[#B4E380]
            w-[500px] h-[500px] overflow-clip
            relative flex flex-wrap"
      >
        {this.bgCells()}
        {this.snakeBody()}
        {this.food()}
      </div>
    );
  }
}

export default Board;
