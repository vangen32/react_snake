export default class Point {
  private _x;
  private _y;

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  constructor(x : number, y : number) {
    this._x = x;
    this._y = y;
  }
  updateCoords(x : number, y : number) : void {
    this._x = x;
    this._y = y;
  }

  compareCoords(point: Point) {
    return this.x === point.x && this.y === point.y;
  }
}
