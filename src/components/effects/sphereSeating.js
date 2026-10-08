// Seating plan for the team sphere (InfiniteMenu): which member's photo sits on each of
// the sphere's discs. A plain `disc % memberCount` repeats members next to each other,
// so the plan is optimised up-front.
//
// Rules, in priority order:
//   1. Every member keeps at least one seat (so the tour can reach everyone).
//   2. Around any disc, nobody repeats: the disc and its ring of neighbours are all
//      different members (hard goal; minimised when the counts make it impossible).
//      The plan is shown as-is, so the ring around a member never changes on screen.
//   3. Members sharing the same photo (placeholder / temporary photos) are kept apart.
//   4. Seats are spread evenly between members.

/** Neighbour lists from disc positions: discs closer than the shortest edge × 1.3. */
export function buildNeighbors(positions) {
  const n = positions.length;
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  let min = Infinity;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) min = Math.min(min, dist(positions[i], positions[j]));
  const limit = min * 1.3;
  return positions.map((p, i) => positions.map((q, j) => (i !== j && dist(p, q) < limit ? j : -1)).filter((j) => j >= 0));
}

// Small deterministic PRNG so every visitor gets the same, reproducible plan.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ringCost(seat, ring, imageKeys) {
  let cost = 0;
  for (let a = 0; a < ring.length; a++) {
    for (let b = a + 1; b < ring.length; b++) {
      const x = seat[ring[a]];
      const y = seat[ring[b]];
      if (x === y) cost += 1000; // rule 2
      else if (imageKeys && imageKeys[x] && imageKeys[x] === imageKeys[y]) cost += 3; // rule 3
    }
  }
  return cost;
}

function balanceCost(counts, ideal) {
  let cost = 0;
  for (const c of counts) cost += c === 0 ? 10000 : (c - ideal) * (c - ideal) * 2; // rules 1 + 4
  return cost;
}

/** Item index for every disc, optimised by randomised local search (fast: 42 discs). */
export function assignSeats(neighbors, itemCount, imageKeys) {
  const V = neighbors.length;
  if (itemCount <= 1) return new Array(V).fill(0);
  const rand = rng(0x7e1a);
  const rings = neighbors.map((nb, v) => [v, ...nb]);
  // Rings each disc belongs to (its own + its neighbours'): the only costs a change touches.
  const owners = neighbors.map((nb, v) => [v, ...nb]);
  const ideal = V / itemCount;
  const local = (seat, vs) => {
    const seen = new Set();
    let c = 0;
    for (const v of vs) for (const r of owners[v]) if (!seen.has(r)) {
      seen.add(r);
      c += ringCost(seat, rings[r], imageKeys);
    }
    return c;
  };
  const total = (seat, counts) => balanceCost(counts, ideal) + rings.reduce((s, r) => s + ringCost(seat, r, imageKeys), 0);

  let best = Array.from({ length: V }, (_, i) => i % itemCount);
  let bestCounts = new Array(itemCount).fill(0);
  for (const it of best) bestCounts[it]++;
  let bestCost = total(best, bestCounts);

  for (let restart = 0; restart < 8; restart++) {
    const seat = restart === 0 ? best.slice() : Array.from({ length: V }, () => Math.floor(rand() * itemCount));
    const counts = new Array(itemCount).fill(0);
    for (const it of seat) counts[it]++;
    let cost = total(seat, counts);
    for (let step = 0; step < 4000; step++) {
      const v = Math.floor(rand() * V);
      if (rand() < 0.5) {
        const old = seat[v];
        const nu = Math.floor(rand() * itemCount);
        if (nu === old) continue;
        const before = local(seat, [v]) + balanceCost(counts, ideal);
        seat[v] = nu; counts[old]--; counts[nu]++;
        const after = local(seat, [v]) + balanceCost(counts, ideal);
        if (after <= before) cost += after - before;
        else { seat[v] = old; counts[old]++; counts[nu]--; }
      } else {
        const u = Math.floor(rand() * V);
        if (seat[u] === seat[v]) continue;
        const before = local(seat, [v, u]);
        [seat[v], seat[u]] = [seat[u], seat[v]];
        const after = local(seat, [v, u]);
        if (after <= before) cost += after - before;
        else [seat[v], seat[u]] = [seat[u], seat[v]];
      }
    }
    if (cost < bestCost) {
      bestCost = cost;
      best = seat.slice();
    }
    // A plan with no repeated member around any disc is good enough; stop early.
    if (bestCost < 1000 && restart >= 1) break;
  }
  return best;
}

/** assignSeats with a per-browser cache: the plan only depends on the sphere and the
 *  member list, so it is solved once (~100 ms) and reused on later visits. */
export function loadSeating(neighbors, itemCount, imageKeys) {
  const key = `te_seats_v1:${neighbors.length}:${itemCount}:${(imageKeys || []).join(',')}`;
  try {
    const cached = JSON.parse(localStorage.getItem(key) || 'null');
    if (Array.isArray(cached) && cached.length === neighbors.length && cached.every((x) => Number.isInteger(x) && x >= 0 && x < itemCount)) return cached;
  } catch {}
  const seat = assignSeats(neighbors, itemCount, imageKeys);
  try {
    localStorage.setItem(key, JSON.stringify(seat));
  } catch {}
  return seat;
}
