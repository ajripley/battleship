import { Point } from './point';
import { Ship } from './ship';

export class Board {
  constructor(size) {
    this.size = size;
    this.board = this.createBoard(size);

    // TODO: the following are for future game AI,
    // but it might be better to use a single
    // dictionary/hash table with the point as the key
    // and the result as the value
    this.misses = [];
    this.hits = [];

    this.ships = [
      new Ship(5, 'Aircraft Carrier', 'a'),
      new Ship(4, 'Battleship', 'b'),
      new Ship(3, 'Submarine', 's'),
      new Ship(3, 'Cruiser', 'c'),
      new Ship(2, 'Destroyer', 'd'),
    ];
  }

  // TODO: where and what should this be? It's supposed to be a constant.
  get EMPTY() {
    return '-';
  }

  get HIT() {
    return '*';
  }

  get MISS() {
    return 'X';
  }

  createBoard(size) {
    const b = [];

    for (let i = 0; i < size; i += 1) {
      b[i] = [];

      for (let j = 0; j < size; j += 1) {
        b[i][j] = this.EMPTY;
      }
    }

    return b;
  }

  // This is here for debugging purposes.
  printToConsole() {
    for (let i = 0; i < this.size; i += 1) {
      let s = "";
      for (let j = 0; j < this.size; j += 1) {
        s += this.board[i][j] + " ";
      }
      console.log(s);
    }
  }

  // TODO: right now only automatic ship setting is supported
  // may want to include manual ship setting later
  setShips() {
    // go in order from largest to smallest ship
    for (var s of this.ships) {
      let shipPlaced = false;

      while (!shipPlaced) {
        const isHorizontal = Math.random() < 0.5;
        const start = Point.generateRandom(0, this.size, 0, this.size);
        let canPlace = true;
        let positions = [];

        if (isHorizontal) {
          for (let i = 0; i < s.size; i += 1) {
            // check each placement coordinate to make sure it's valid
            const newX = start.x + i;

            if (newX >= this.size || this.board[start.y][newX] !== this.EMPTY) {
              canPlace = false;
              break;
            }

            positions.push(new Point(newX, start.y));
          }
        } else { // vertical
          for (let i = 0; i < s.size; i += 1) {
            const newY = start.y + i;

            if (newY >= this.size || this.board[newY][start.x] !== this.EMPTY) {
              canPlace = false;
              break;
            }

            positions.push(new Point(start.x, newY));
          }
        }

        if (canPlace) {
          s.setLocation(positions, isHorizontal);
          for (var p of positions) {
            this.board[p.y][p.x] = s.symbol;
          }
          shipPlaced = true;
        }
      }
    }
  }

  checkValidMove(point) {
    // point needs to fall within board boundaries and not have been made in a prior move
    const valid = (point.x >= 0 && point.y >= 0 &&
      point.x < this.size &&
      point.y < this.size &&
      (this.hits.filter((p) => (p.x === point.x && p.y === point.y))).length === 0 &&
      (this.misses.filter((p) => (p.x === point.x && p.y === point.y))).length === 0);
    return valid;
  }

  // need to call checkValidMove before calling checkHit
  checkHit(point) {
    let wasHit = false;

    if (this.board[point.y][point.x] !== this.EMPTY && this.board[point.y][point.x] !== this.HIT && this.board[y][x] !== this.MISS) {
      wasHit = true;
      this.hits.push(point);
      this.board[point.y][point.x] = this.HIT;
    } else {
      this.misses.push(point);
      this.board[point.y][point.x] = this.MISS;
    }

    return wasHit;
  }

}
