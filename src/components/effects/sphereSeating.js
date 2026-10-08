// Seating plan for the team sphere (InfiniteMenu): which member's photo sits on each of
// the sphere's discs. A plain `disc % memberCount` repeats members next to each other,
// so the plan is optimised up-front and adjusted while a member is centred.
//
// Rules, in priority order:
//   1. Every member keeps at least one seat (so the tour can reach everyone).
//   2. Around any disc, nobody repeats: the disc and its ring of neighbours are all
//      different members (hard goal; minimised when the counts make it impossible).
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

/**
 * What each disc shows while `focus` (a disc index) is centred: the centred member
 * appears on that disc only, and the ring around the centre shows distinct members
 * (none of them the centred one). Other repeats are swapped for members that clash
 * least with their own neighbours.
 */
export function focusView(base, neighbors, focus, itemCount, imageKeys) {
  const view = base.slice();
  if (focus < 0 || focus >= view.length || itemCount <= 1) return view;
  const centre = base[focus];

  const pick = (v, forbidden, avoidKeys) => {
    let bestItem = -1;
    let bestScore = Infinity;
    for (let it = 0; it < itemCount; it++) {
      if (forbidden.has(it)) continue;
      let score = it === base[v] ? -1 : 0; // keep the planned member when it is valid
      // Members sharing one photo would look like the same person twice in the ring.
      if (avoidKeys && imageKeys && imageKeys[it] && avoidKeys.has(imageKeys[it])) score += 100;
      for (const u of neighbors[v]) {
        if (view[u] === it) score += 10;
        else if (imageKeys && imageKeys[it] && imageKeys[it] === imageKeys[view[u]]) score += 1;
      }
      if (score < bestScore) {
        bestScore = score;
        bestItem = it;
      }
    }
    return bestItem < 0 ? view[v] : bestItem;
  };

  // 1. The ring around the centre: all different, none equal to the centre.
  const used = new Set([centre]);
  const usedKeys = new Set(imageKeys && imageKeys[centre] ? [imageKeys[centre]] : []);
  for (const u of neighbors[focus]) {
    view[u] = pick(u, used, usedKeys);
    used.add(view[u]);
    if (imageKeys && imageKeys[view[u]]) usedKeys.add(imageKeys[view[u]]);
  }
  // 2. The centred member's face nowhere else.
  const ring = new Set([focus, ...neighbors[focus]]);
  for (let v = 0; v < view.length; v++) {
    if (v !== focus && !ring.has(v) && view[v] === centre) view[v] = pick(v, new Set([centre]));
  }
  return view;
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
