import { Board } from './board';

export class Player {
  constructor(name, boardSize) {
    this.name = name;
    this.board = new Board(boardSize);
    this.board.setShips();
    this.stats = {
      misses: 0,
      hits: 0,
      shots: 0,
      won: false
    };
  }
}
