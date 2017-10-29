export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Calculate the distance between two points.
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }

  static generateRandom(xminimum, xmaximum, yminimum, ymaximum) {
    // Maxes are exlusive, mins are inclusive
    const xmin = Math.floor(xminimum);
    const ymin = Math.floor(yminimum);
    const xmax = Math.ceil(xmaximum);
    const ymax = Math.ceil(ymaximum);
    const x = Math.floor(Math.random() * (xmax - xmin)) + xmin;
    const y = Math.floor(Math.random() * (ymax - ymin)) + ymin;

    return new Point(x, y);
  }
}
