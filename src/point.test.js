import { Point } from './point';

test('generateRandom() returns point within given min and max for x and y', () => {
  for (let i = 0; i < 50; i += 1) {
    const p = Point.generateRandom(0, 10, 0, 10);
    expect(p).toBeDefined();
    expect(p.x).toBeGreaterThanOrEqual(0);
    expect(p.x).toBeLessThan(10);
    expect(p.y).toBeGreaterThanOrEqual(0);
    expect(p.y).toBeLessThan(10);
  }
});
