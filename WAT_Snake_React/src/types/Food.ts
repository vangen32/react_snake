import Point from "./Point";

class Food {
  private _value: number = 1;
  private _coords: Point;
  get value() {
    return this._value;
  }

  get coords() {
    return this._coords;
  }
  constructor(value : number, coords: Point) {
    this._value = value;
    this._coords = coords;
  }

  static RandomFoodFactory(minCoordsValues: Point, maxCoordsValues: Point) {
    const random = Math.random();
    const coords = new Point(
      Math.floor(Math.random() * maxCoordsValues.x + 1 + minCoordsValues.x),
      Math.floor(Math.random() * maxCoordsValues.y + 1 + minCoordsValues.y),
    );

    if (random >= 0.8) return new Food(10, coords);
    if (random >= 0.5) return new Food(5, coords);
    else return new Food(1, coords);
  }
}

export default Food;
