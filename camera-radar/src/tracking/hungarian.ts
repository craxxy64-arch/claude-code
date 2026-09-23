/**
 * Hungarian (Kuhn–Munkres) assignment for a rectangular cost matrix.
 * Returns, for each row, the assigned column index or -1.
 * O(n^3); fine for the tens of targets a camera frame contains.
 */
export function hungarian(cost: number[][]): number[] {
  const rows = cost.length;
  if (!rows) return [];
  const cols = cost[0].length;
  if (!cols) return new Array(rows).fill(-1);
  const n = Math.max(rows, cols);
  const BIG = 1e9;
  const a = (i: number, j: number) => (i < rows && j < cols ? cost[i][j] : BIG / 1e3);

  // 1-indexed potentials implementation (e-maxx).
  const u = new Float64Array(n + 1);
  const v = new Float64Array(n + 1);
  const p = new Int32Array(n + 1);
  const way = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minv = new Float64Array(n + 1).fill(Infinity);
    const used = new Uint8Array(n + 1);
    do {
      used[j0] = 1;
      const i0 = p[j0];
      let delta = Infinity;
      let j1 = 0;
      for (let j = 1; j <= n; j++) {
        if (used[j]) continue;
        const cur = a(i0 - 1, j - 1) - u[i0] - v[j];
        if (cur < minv[j]) {
          minv[j] = cur;
          way[j] = j0;
        }
        if (minv[j] < delta) {
          delta = minv[j];
          j1 = j;
        }
      }
      for (let j = 0; j <= n; j++) {
        if (used[j]) {
          u[p[j]] += delta;
          v[j] -= delta;
        } else {
          minv[j] -= delta;
        }
      }
      j0 = j1;
    } while (p[j0] !== 0);
    do {
      const j1 = way[j0];
      p[j0] = p[j1];
      j0 = j1;
    } while (j0);
  }
  const result = new Array<number>(rows).fill(-1);
  for (let j = 1; j <= n; j++) {
    const i = p[j] - 1;
    if (i >= 0 && i < rows && j - 1 < cols) result[i] = j - 1;
  }
  return result;
}
