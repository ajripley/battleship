import { Ship } from './ship';
import { Point } from './point';

test('create ship with defaults', () => {
  const s = new Ship(5, 'Aircraft Carrier', 'a');
  expect(s).toBeDefined();
  expect(s.sunk).toBe(false);
  expect(s.size).toBe(5);
  expect(s.name).toBe('Aircraft Carrier');
  expect(s.symbol).toBe('a');
  expect(s.isHorizontal).toBe(false);
  expect(s.location).toBeDefined;
  expect(s.location.length).toBe(0);
});

// test location and isHorizontal after calling setLocation
test('setLocation has expected behavior', () => {
  const s = new Ship(5, 'Aircraft Carrier', 'a');
  const points = [new Point(0, 0), new Point(1, 0),
    new Point(2, 0), new Point(3, 0), new Point(4, 0)];
  s.setLocation(points, true);
  expect(s.isHorizontal).toBe(true);
  expect(s.location).toBeDefined();
  expect(s.location.length).toBe(5);
});
