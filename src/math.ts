export function randInt(from: Num, to: Num): Num {
  return clamp(Math.round(lerp(from, to, Math.random())), from, to);
}

export function clamp(v: Num, min: Num, max: Num): Num {
  return v < min ? min : v > max ? max : v;
}

export function lerp(from: Num, to: Num, progress: Num): Num {
  return to * progress + from * (1 - progress);
}