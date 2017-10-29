import { Board } from './board';
import { Point } from './point';

test('create board', () => {
  /*
  let b = new Board();
  expect(b).toBeUndefined();
  */
  // TODO: what kind of behavior do we want here?

  const b = new Board(10);
  expect(b).toBeDefined();
  expect(b.size).toBe(10);
  expect(b.EMPTY).toBe('-');
  for (let i = 0; i < b.size; i += 1)  {
    for (let j = 0; j < b.size; j += 1) {
      expect(b.board[i][j]).toBe(b.EMPTY);
    }
  }
});

test('setShips() sets ships properly', () => {
  for (let i = 0; i < 50; i += 1) {
    const b = new Board(10);
    expect(b).toBeDefined();
    expect(b.ships).toBeDefined();
    b.setShips();
    //b.printToConsole();

    // this is a very basic check,
    // will probably want to do a more complex check later
    let dict = {}
    for (let i = 0; i < b.size; i += 1) {
      for (let j = 0; j < b.size; j += 1) {
        dict[b.board[i][j]] = (dict[b.board[i][j]] || 0) + 1;
      }
    }

    expect(dict['a']).toBe(5);
    expect(dict['b']).toBe(4);
    expect(dict['s']).toBe(3);
    expect(dict['c']).toBe(3);
    expect(dict['d']).toBe(2);
    expect(dict[b.EMPTY]).toBe((b.size * b.size) - (5 + 4 + 3 + 3 + 2));
  }
});

test('checkValidMove gives expected results', () => {
  const b = new Board(10);
  expect(b).toBeDefined();
  expect(b.hits).toBeDefined();
  expect(b.misses).toBeDefined();

  let t = [];
  const po = new Point(1, 1);
  t.push(po);
  expect((t.filter((p) => (p.x === po.x && p.y === po.y))).length).toBeGreaterThanOrEqual(1);
  expect((t.filter((p) => (p.x === 1 && p.y === 1))).length).toBeGreaterThanOrEqual(1);
  expect((t.filter((p) => (p.x === 0 && p.y === 0))).length).toBe(0);


  expect(b.checkValidMove(new Point(-1, -1))).toBe(false);
  expect(b.checkValidMove(new Point(10, 10))).toBe(false);
  expect(b.checkValidMove(new Point(0, 0))).toBe(true);
  b.hits.push(new Point(0, 0));
  expect(b.checkValidMove(new Point(0, 0))).toBe(false);
  b.misses.push(new Point(5, 5));
  expect(b.checkValidMove(new Point(5, 5))).toBe(false);
});
