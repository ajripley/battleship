export class Ship {
  constructor(size, name, symbol) {
    this.size = size;
    this.name = name;
    this.symbol = symbol;
    this.sunk = false;
    this.location = [];
    this.isHorizontal = false;
  }

  // TODO: change to setter?
  setLocation(points, isHorizontal) {
    this.location = points;
    this.isHorizontal = isHorizontal;
  }
}
