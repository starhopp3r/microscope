import { iso, depthOf, cameraOf, figureSvg, pageHtml } from "./iso-kit.mjs";

export const SWATCHES = {
  head: ["#f3a650", "#ffd8a4", "#c9741f", "#a85d17"],
  tail: ["#efdfb2", "#fbf2d8", "#d8c28a", "#c2a766"],
  rotor: ["#4fb3ae", "#ace6e1", "#2b827d", "#1f6460"],
  stator: ["#7192cf", "#c2d3f3", "#47659f", "#36507f"],
  rod: ["#f5c94b", "#fff0b3", "#c99a1b", "#9c7710"],
  hub: ["#f0a23f", "#ffd59a", "#c2781a", "#965a10"],
  alpha: ["#c9aee6", "#efe4fa", "#9675bd", "#775a9e"],
  beta: ["#9373c9", "#cdb9ec", "#664899", "#4f357b"],
  proton: ["#e5484d", "#ffa3a5", "#b2272c", "#8a1c20"],
  atp: ["#76c46a", "#c8edbf", "#4a9640", "#3a7932"],
  dna: ["#4a8fd8", "#b5d3f4", "#2c66aa", "#204f86"],
  baseA: ["#e5534b", "#ffb3ae", "#b33a33", "#8f2b26"],
  baseT: ["#f2c14e", "#fff0b8", "#c4952a", "#9a721a"],
  baseG: ["#58a65c", "#c3e8c4", "#3b7d3f", "#2e6331"],
  baseC: ["#4e79c7", "#bcd0f3", "#345aa0", "#26457e"],
  rna: ["#e8763c", "#ffc8a6", "#b5521f", "#8c3e16"],
  chlorophyll: ["#5cb85c", "#bfe6b6", "#3b8a3b", "#2d6b2d"],
  cytosol: ["#fbf6ec", "#ffffff", "#efe4cc", "#d9c9a6"],
  capsid: ["#8ea6cf", "#d6e2f5", "#5e78a8", "#47608c"],
  sheath: ["#5fb58c", "#bfe7d2", "#3a8762", "#2c6a4c"],
  fibre: ["#a98bd1", "#e2d6f2", "#7d60a8", "#634a8a"],
  peptidoglycan: ["#c9d77a", "#ecf3c4", "#9aab48", "#7c8b35"],
  cuticle: ["#e9c46a", "#f8e6b8", "#c99a2e", "#a07a1f"],
  epidermis: ["#eef3e2", "#fbfdf6", "#d3dfbd", "#9fb27e"],
  palisade: ["#cfe6b0", "#eef7e2", "#a8cc80", "#78a356"],
  spongy: ["#dcedc6", "#f3f9ea", "#b9d699", "#88aa66"],
  guard: ["#b8dc93", "#e4f3d3", "#8dbb62", "#638f3d"],
  xylem: ["#e6b8a8", "#f7e2da", "#c98b76", "#a1614d"],
  phloem: ["#b7c4ea", "#e1e7f8", "#8a9dd3", "#6577ad"],
  sheathcell: ["#e5e9c8", "#f7f9ea", "#c8cf9a", "#9aa36a"],
  actin: ["#e7854f", "#ffc9a8", "#bf5d2b", "#97461d"],
  myosin: ["#6d8fd6", "#c3d3f5", "#4566ac", "#334f8a"],
  zdisc: ["#6b6f7a", "#b5b9c2", "#474b55", "#33363e"],
  wall: ["#a7c76b", "#dcedbd", "#7c9c43", "#617c31"],
};

const RAD = Math.PI / 180;
const r1 = (value) => (Math.round(value * 10) / 10).toString();

export function screenScale(P) {
  return cameraOf(P).k;
}

export function bioCss(swatches = SWATCHES) {
  const vars = Object.entries(swatches)
    .map(([name, [base, hi, lo, edge]]) => `--bio-${name}:${base};--bio-${name}-hi:${hi};--bio-${name}-lo:${lo};--bio-${name}-edge:${edge};`)
    .join("");
  return `
.bio{${vars}--bio-air:#f7fbf2;--bio-outside:#eef5fc;--bio-cytoplasm:#fbf5e8;--bio-periplasm:#f2f6e4;--bio-halo:rgba(255,255,255,.82);--bio-page:#ffffff;--bio-ink:#26262b;--bio-soft:#5d5d66;--bio-leader:#6b6b74;--bio-region:#8a8a94;--bio-ims:#eef5fc;--bio-matrix:#f7f1fb;--bio-arrow:#3a3a42;--bio-flow:#d9363c}
.bio[data-theme="dark"],.iso[data-theme="dark"] .bio{--bio-air:#182016;--bio-outside:#16202b;--bio-cytoplasm:#221d16;--bio-periplasm:#1b2116;--bio-halo:rgba(18,19,23,.82);--bio-page:#121317;--bio-ink:#ececf1;--bio-soft:#b4b4bd;--bio-leader:#9c9ca6;--bio-region:#8b8b96;--bio-ims:#16202b;--bio-matrix:#1f1a27;--bio-arrow:#d8d8de;--bio-flow:#ff6b6f}
.bio-body{stroke-width:.9;stroke-linejoin:round}
.bio-label{fill:var(--bio-ink);font:500 11.5px/1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;letter-spacing:.005em}
.bio-label[data-small]{font-size:10px;fill:var(--bio-soft)}
.bio-region{fill:var(--bio-region);font:600 10px/1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;letter-spacing:.12em}
.bio-leader{fill:none;stroke:var(--bio-leader);stroke-width:.8;stroke-linecap:round;stroke-linejoin:round}
.bio-casing{fill:none;stroke:var(--bio-halo);stroke-linecap:round;stroke-linejoin:round}
.bio-anchor{fill:var(--bio-leader);stroke:var(--bio-halo);stroke-width:1}
.bio-arrow{fill:none;stroke:var(--bio-arrow);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.bio-arrow-head{fill:var(--bio-arrow)}
.bio-arrow[data-flow]{stroke:var(--bio-flow);stroke-width:2.2;opacity:.85}
.bio-arrow-head[data-flow]{fill:var(--bio-flow);opacity:.85}
.bio-tail{fill:none;stroke-width:.8;stroke-linecap:round}
.bio-glyph{font:700 6.2px/1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;fill:#fff;text-anchor:middle;dominant-baseline:central}
.bio .iso-plate.bio-plate{padding:22px 22px 16px;background:var(--bio-page);box-shadow:0 0 0 1px color-mix(in srgb,var(--bio-region) 35%,transparent);border-radius:4px}
.bio .bio-svg{border-radius:3px}
.bio-title{margin:0 0 14px;color:var(--bio-ink);font:600 15px/1.35 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif}
.bio-fig{margin-right:10px;color:#c2410c;font-weight:700}
.bio[data-theme="dark"] .bio-fig{color:#fb923c}
.bio-foot{display:flex;justify-content:space-between;gap:16px;margin-top:10px;color:var(--bio-soft);font:12px/1.4 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;font-variant-numeric:tabular-nums}
.bio .iso-legend{color:var(--bio-soft);font:13px/1.6 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif}
.bio .iso-stage{outline:none}
.bio .iso-stage:focus-visible{box-shadow:0 0 0 2px color-mix(in srgb,var(--bio-flow) 45%,transparent);border-radius:3px}
.bio-dimension{fill:none;stroke:var(--bio-soft);stroke-width:.9;stroke-linecap:round}
.bio-hbond{fill:var(--bio-page);stroke:var(--bio-ink);stroke-width:.6}
.bio-key{stroke-width:.8}
@media (max-width:560px){.bio-foot{flex-direction:column}}
${Object.keys(swatches)
  .map((name) => `.bio-body[data-swatch="${name}"]{stroke:var(--bio-${name}-edge)}.bio-tail[data-swatch="${name}"]{stroke:var(--bio-${name}-lo)}`)
  .join("\n")}
`;
}

export function bioDefs(names = Object.keys(SWATCHES)) {
  const stops = (list) => list.map(([offset, name]) => `<stop offset="${offset}" style="stop-color:var(${name})"/>`).join("");
  return `<defs>${names
    .map(
      (name) =>
        `<radialGradient id="bio-r-${name}" cx=".38" cy=".3" r=".78" fx=".34" fy=".26">${stops([[0, `--bio-${name}-hi`], [0.5, `--bio-${name}`], [1, `--bio-${name}-lo`]])}</radialGradient>` +
        `<linearGradient id="bio-l-${name}" x1="0" y1="0" x2="1" y2="0">${stops([[0, `--bio-${name}-lo`], [0.28, `--bio-${name}`], [0.48, `--bio-${name}-hi`], [0.72, `--bio-${name}`], [1, `--bio-${name}-lo`]])}</linearGradient>` +
        `<linearGradient id="bio-v-${name}" x1="0" y1="0" x2="0" y2="1">${stops([[0, `--bio-${name}-hi`], [0.55, `--bio-${name}`], [1, `--bio-${name}-lo`]])}</linearGradient>`,
    )
    .join("")}</defs>`;
}

const fill = (kind, name) => `url(#bio-${kind}-${name})`;

export function sphere(P, centre, r, swatch, { extra = "" } = {}) {
  const [x, y] = iso(centre, P);
  return `<circle class="bio-body" data-swatch="${swatch}" cx="${r1(x)}" cy="${r1(y)}" r="${r1(r * screenScale(P))}" fill="${fill("r", swatch)}"${extra}/>`;
}

export function ellipsoid(P, centre, across, tall, swatch, { extra = "" } = {}) {
  const { sinE, cosE } = cameraOf(P);
  const k = screenScale(P);
  const [x, y] = iso(centre, P);
  return `<ellipse class="bio-body" data-swatch="${swatch}" cx="${r1(x)}" cy="${r1(y)}" rx="${r1(across * k)}" ry="${r1(Math.hypot(across * sinE, tall * cosE) * k)}" fill="${fill("r", swatch)}"${extra}/>`;
}

export function capsule(P, base, r, length, swatch, { extra = "" } = {}) {
  const k = screenScale(P);
  const [bx, by] = iso(base, P);
  const [, ty] = iso([base[0], base[1], base[2] + length], P);
  const w = r * k;
  const d = `M${r1(bx - w)} ${r1(ty)}L${r1(bx - w)} ${r1(by)}A${r1(w)} ${r1(w)} 0 0 0 ${r1(bx + w)} ${r1(by)}L${r1(bx + w)} ${r1(ty)}A${r1(w)} ${r1(w)} 0 0 0 ${r1(bx - w)} ${r1(ty)}Z`;
  return `<path class="bio-body" data-swatch="${swatch}" d="${d}" fill="${fill("l", swatch)}"${extra}/>`;
}

export function smoothPath(points, closed = false) {
  if (points.length < 2) return "";
  const at = (index) => points[closed ? (index + points.length) % points.length : Math.max(0, Math.min(points.length - 1, index))];
  let d = `M${r1(points[0][0])} ${r1(points[0][1])}`;
  const count = closed ? points.length : points.length - 1;
  for (let i = 0; i < count; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return closed ? d + "Z" : d;
}

export function cell(P, centre, across, tall, swatch, { radius = Math.min(across, tall) * 0.35, extra = "" } = {}) {
  const k = screenScale(P);
  const { cosE } = cameraOf(P);
  const [x, y] = iso(centre, P);
  const w = (across * k) / 2;
  const h = (tall * k * cosE) / 2;
  const r = Math.min(radius * k, w, h);
  const d = `M${r1(x - w + r)} ${r1(y - h)}L${r1(x + w - r)} ${r1(y - h)}Q${r1(x + w)} ${r1(y - h)} ${r1(x + w)} ${r1(y - h + r)}L${r1(x + w)} ${r1(y + h - r)}Q${r1(x + w)} ${r1(y + h)} ${r1(x + w - r)} ${r1(y + h)}L${r1(x - w + r)} ${r1(y + h)}Q${r1(x - w)} ${r1(y + h)} ${r1(x - w)} ${r1(y + h - r)}L${r1(x - w)} ${r1(y - h + r)}Q${r1(x - w)} ${r1(y - h)} ${r1(x - w + r)} ${r1(y - h)}Z`;
  return `<path class="bio-body" data-swatch="${swatch}" d="${d}" fill="url(#bio-r-${swatch})"${extra}/>`;
}

export function rope(P, points3, r, swatch) {
  const k = screenScale(P);
  const d = smoothPath(points3.map((p) => iso(p, P)));
  const w = 2 * r * k;
  return (
    `<path d="${d}" fill="none" stroke="var(--bio-${swatch}-edge)" stroke-width="${r1(w + 1.8)}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="var(--bio-${swatch})" stroke-width="${r1(w)}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="var(--bio-${swatch}-hi)" stroke-width="${r1(w * 0.32)}" stroke-linecap="round" stroke-linejoin="round" opacity=".75" transform="translate(${r1(-w * 0.16)} ${r1(-w * 0.12)})"/>`
  );
}

function head(direction, tip, size) {
  const angle = Math.atan2(direction[1], direction[0]);
  const back = [tip[0] - Math.cos(angle) * size, tip[1] - Math.sin(angle) * size];
  const side = [Math.cos(angle + Math.PI / 2) * size * 0.42, Math.sin(angle + Math.PI / 2) * size * 0.42];
  return `M${r1(tip[0])} ${r1(tip[1])}L${r1(back[0] + side[0])} ${r1(back[1] + side[1])}L${r1(back[0] - side[0])} ${r1(back[1] - side[1])}Z`;
}

const unit2 = (v) => {
  const length = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / length, v[1] / length];
};

function arrowParts(d, tip, direction, { flow, size, tail }) {
  const attr = flow ? ' data-flow=""' : "";
  const width = flow ? 2.2 : 1.6;
  const heads = [head(direction, tip, size), ...(tail ? [head(tail.direction, tail.tip, size)] : [])].join("");
  return `<path class="bio-casing" d="${d}" stroke-width="${r1(width + 2.6)}"/><path class="bio-casing" d="${heads}" stroke-width="2.4"/><path class="bio-arrow"${attr} d="${d}"/><path class="bio-arrow-head"${attr} d="${heads}"/>`;
}

export function arrow(points, { flow = false, size = 7.5, both = false, bend = null, tone = null } = {}) {
  if (tone) return arrow(points, { flow, size, both, bend }).replace(/class="bio-arrow"( data-flow="")?/g, `class="bio-arrow"$1 style="stroke:var(--bio-${tone}-lo)"`).replace(/class="bio-arrow-head"( data-flow="")?/g, `class="bio-arrow-head"$1 style="fill:var(--bio-${tone}-lo)"`);
  const n = points.length;
  if (bend !== null && n === 2) {
    const [from, to] = points;
    const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
    const normal = unit2([-(to[1] - from[1]), to[0] - from[0]]);
    const control = [mid[0] + normal[0] * bend, mid[1] + normal[1] * bend];
    const endDir = unit2([to[0] - control[0], to[1] - control[1]]);
    const end = [to[0] - endDir[0] * size * 0.7, to[1] - endDir[1] * size * 0.7];
    const startDir = unit2([from[0] - control[0], from[1] - control[1]]);
    const start = both ? [from[0] - startDir[0] * size * 0.7, from[1] - startDir[1] * size * 0.7] : from;
    const d = `M${r1(start[0])} ${r1(start[1])}Q${r1(control[0])} ${r1(control[1])} ${r1(end[0])} ${r1(end[1])}`;
    return arrowParts(d, to, endDir, { flow, size, tail: both ? { tip: from, direction: startDir } : null });
  }
  const endDir = unit2([points[n - 1][0] - points[n - 2][0], points[n - 1][1] - points[n - 2][1]]);
  const trimmed = points.map((p) => [...p]);
  trimmed[n - 1] = [points[n - 1][0] - endDir[0] * size * 0.7, points[n - 1][1] - endDir[1] * size * 0.7];
  let tail = null;
  if (both) {
    const startDir = unit2([points[0][0] - points[1][0], points[0][1] - points[1][1]]);
    trimmed[0] = [points[0][0] - startDir[0] * size * 0.7, points[0][1] - startDir[1] * size * 0.7];
    tail = { tip: points[0], direction: startDir };
  }
  return arrowParts(smoothPath(trimmed), points[n - 1], endDir, { flow, size, tail });
}

export function rotationArrow(P, centre, radius, from, to, { size = 7, steps = 64 } = {}) {
  const { cosA, sinA } = cameraOf(P);
  const view = Math.atan2(sinA, cosA) / RAD;
  const back = [];
  const front = [];
  for (let i = 0; i <= steps; i++) {
    const angle = from + ((to - from) * i) / steps;
    const point = iso([centre[0] + radius * Math.cos(angle * RAD), centre[1] + radius * Math.sin(angle * RAD), centre[2]], P);
    (Math.cos((angle - view) * RAD) < 0 ? back : front).push(point);
  }
  const id = `spin-${Math.round(centre[0])}-${Math.round(centre[1])}-${Math.round(centre[2])}`;
  const tag = (svg) => svg.replace(/class="bio-arrow"/g, `class="bio-arrow" data-arrow="${id}"`).replace(/class="bio-arrow-head"/g, `class="bio-arrow-head" data-arrow="${id}"`);
  const line = (points) => (points.length > 1 ? `<path class="bio-casing" d="${smoothPath(points)}" stroke-width="4.2"/><path class="bio-arrow" d="${smoothPath(points)}"/>` : "");
  const ahead = Math.cos((to - view) * RAD) >= 0;
  const headed = ahead ? front : back;
  const plain = ahead ? back : front;
  return { back: tag(ahead ? line(plain) : arrow(headed, { size })), front: tag(ahead ? arrow(headed, { size }) : line(plain)) };
}

export function arcPoints(P, centre, radius, from, to, steps = 32) {
  return Array.from({ length: steps + 1 }, (_, index) => {
    const a = (from + ((to - from) * index) / steps) * RAD;
    return iso([centre[0] + radius * Math.cos(a), centre[1] + radius * Math.sin(a), centre[2]], P);
  });
}

export function label(text, anchor, { side = "left", x, drop = 0, small = false } = {}) {
  const sign = side === "left" ? -1 : 1;
  const elbow = [anchor[0] + sign * Math.abs(drop), anchor[1] + drop];
  const end = [x - sign * 6, elbow[1]];
  const points = drop ? [anchor, elbow, end] : [anchor, end];
  const d = `M${points.map((p) => `${r1(p[0])} ${r1(p[1])}`).join("L")}`;
  const lines = String(text).split("\n");
  const size = small ? 10 : 11.5;
  const top = elbow[1] + size * 0.36 - ((lines.length - 1) * size * 1.25) / 2;
  const body = lines.length === 1 ? text : lines.map((line, index) => `<tspan x="${r1(x)}" dy="${index ? "1.25em" : 0}">${line}</tspan>`).join("");
  return `<path class="bio-casing" d="${d}" stroke-width="3.2"/><path class="bio-leader" d="${d}"/><circle class="bio-anchor" cx="${r1(anchor[0])}" cy="${r1(anchor[1])}" r="1.9"/><text class="bio-label"${small ? " data-small" : ""} x="${r1(x)}" y="${r1(top)}" text-anchor="${side === "left" ? "end" : "start"}">${body}</text>`;
}

export function region(text, x, y, anchor = "start") {
  return `<text class="bio-region" x="${r1(x)}" y="${r1(y)}" text-anchor="${anchor}">${text}</text>`;
}

const wave = (P, from, to, amplitude, waves, along) => {
  const steps = 10;
  return Array.from({ length: steps + 1 }, (_, index) => {
    const t = index / steps;
    const side = Math.sin(t * Math.PI * 2 * waves) * amplitude;
    return iso([from[0] + (to[0] - from[0]) * t + along[0] * side, from[1] + (to[1] - from[1]) * t + along[1] * side, from[2] + (to[2] - from[2]) * t], P);
  });
};

export function bilayer(P, { x0, x1, y0, y1, z0, z1 }, { spacing = 9, head: hr = 3.6, skip = () => false } = {}) {
  const mid = (z0 + z1) / 2;
  const { cosA, sinA } = cameraOf(P);
  const out = [];
  const top = [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]].map((p) => iso(p, P));
  out.push(`<path d="M${top.map((p) => `${r1(p[0])} ${r1(p[1])}`).join("L")}Z" fill="var(--bio-head-lo)" opacity=".55"/>`);
  const heads = [];
  let row = 0;
  for (let y = y0 + spacing / 2; y <= y1 - spacing / 2 + 0.01; y += spacing * 0.87, row++) {
    for (let x = x0 + spacing / 2 + (row % 2 ? spacing / 2 : 0); x <= x1 - spacing / 2 + 0.01; x += spacing) {
      if (!skip([x, y])) heads.push([x, y, z1]);
    }
  }
  heads.sort((a, b) => depthOf(a, P) - depthOf(b, P));
  for (const p of heads) out.push(ellipsoid(P, p, hr, hr * 0.7, "head"));
  const faces = [];
  if (sinA > 0.05) faces.push({ a: [x0, y1], b: [x1, y1], along: [1, 0] });
  if (cosA > 0.05) faces.push({ a: [x1, y1], b: [x1, y0], along: [0, -1] });
  for (const face of faces) {
    const corners = [[...face.a, z1], [...face.b, z1], [...face.b, z0], [...face.a, z0]].map((p) => iso(p, P));
    out.push(`<path d="M${corners.map((p) => `${r1(p[0])} ${r1(p[1])}`).join("L")}Z" fill="var(--bio-tail-hi)"/>`);
    const length = Math.hypot(face.b[0] - face.a[0], face.b[1] - face.a[1]);
    const count = Math.max(1, Math.round(length / spacing));
    const tails = [];
    const faceHeads = [];
    for (let i = 0; i < count; i++) {
      const s = (i + 0.5) / count;
      const p = [face.a[0] + (face.b[0] - face.a[0]) * s, face.a[1] + (face.b[1] - face.a[1]) * s];
      for (const [zh, zm] of [[z1 - hr, mid + 0.8], [z0 + hr, mid - 0.8]]) {
        for (const side of [-0.32, 0.32]) {
          const from = [p[0] + face.along[0] * side * spacing, p[1] + face.along[1] * side * spacing, zh];
          const to = [from[0], from[1], zm];
          tails.push(smoothPath(wave(P, from, to, spacing * 0.08, 1.5, face.along)));
        }
        faceHeads.push([p[0], p[1], zh]);
      }
    }
    out.push(`<path class="bio-tail" data-swatch="tail" d="${tails.join("")}"/>`);
    for (const p of faceHeads) out.push(sphere(P, p, hr, "head"));
  }
  return out.join("");
}

export function doubleHelix(P, start, end, { radius = 10, rise = 3.4, perTurn = 10.5, groove = 140, hand = "right", sequence = "ATGCGTACCA", strand = "dna", r = 2.2, baseR = r * 0.75, phase = 0, highlight = -1 } = {}) {
  const axis = [end[0] - start[0], end[1] - start[1], end[2] - start[2]];
  const length = Math.hypot(...axis);
  const a = axis.map((v) => v / length);
  const helper = Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
  const u0 = [a[1] * helper[2] - a[2] * helper[1], a[2] * helper[0] - a[0] * helper[2], a[0] * helper[1] - a[1] * helper[0]];
  const un = Math.hypot(...u0);
  const u = u0.map((v) => v / un);
  const v = [a[1] * u[2] - a[2] * u[1], a[2] * u[0] - a[0] * u[2], a[0] * u[1] - a[1] * u[0]];
  const sense = (hand === "right" ? -1 : 1) * (360 / perTurn);
  const at = (s, deg) => {
    const t = (deg + phase) * RAD;
    return [0, 1, 2].map((i) => start[i] + a[i] * s + radius * (Math.cos(t) * u[i] + Math.sin(t) * v[i]));
  };
  const pairs = Math.floor(length / rise);
  const items = [];
  const meta = [];
  const PAIR = { A: "T", T: "A", G: "C", C: "G" };
  const samples = pairs * 6;
  const centreDepth = (along) => depthOf(start.map((value, index) => value + a[index] * along), P);
  for (const offset of [0, groove]) {
    const points = Array.from({ length: samples + 1 }, (_, i) => {
      const along = (i / samples) * pairs * rise;
      const point = at(along, (along / rise) * sense + offset);
      return { point, front: depthOf(point, P) >= centreDepth(along) };
    });
    let run = [points[0]];
    const flush = () => {
      if (run.length < 2) return;
      const depths = run.map((entry) => depthOf(entry.point, P));
      items.push({ d: run[1].front ? Math.max(...depths) : Math.min(...depths), svg: rope(P, run.map((entry) => entry.point), r, strand) });
    };
    for (let i = 1; i < points.length; i++) {
      if (points[i].front !== points[i - 1].front && run.length > 1) {
        run.push(points[i]);
        flush();
        run = [points[i - 1], points[i]];
        continue;
      }
      run.push(points[i]);
    }
    flush();
  }
  for (let i = 0; i < pairs; i++) {
    const s = (i + 0.5) * rise;
    const p0 = at(s, (s / rise) * sense);
    const p1 = at(s, (s / rise) * sense + groove);
    const mid = p0.map((value, index) => (value + p1[index]) / 2);
    const base = sequence[i % sequence.length];
    const half0 = [p0, mid];
    const half1 = [mid, p1];
    const lit = i === highlight;
    const width = lit ? baseR * 1.4 : baseR;
    items.push({ d: depthOf(p0, P) * 0.5 + depthOf(mid, P) * 0.5 - 0.01, svg: rope(P, half0, width, `base${base}`) });
    items.push({ d: depthOf(p1, P) * 0.5 + depthOf(mid, P) * 0.5 - 0.01, svg: rope(P, half1, width, `base${PAIR[base]}`) });
    if (lit) {
      const bonds = base === "G" || base === "C" ? 3 : 2;
      const k = screenScale(P);
      const [mx, my] = iso(mid, P);
      const [ax, ay] = iso(p0, P);
      const dir = unit2([ax - mx, ay - my]);
      const across = [-dir[1], dir[0]];
      const dots = Array.from({ length: bonds }, (_, b) => {
        const t = (b - (bonds - 1) / 2) * width * k * 0.62;
        return `<circle class="bio-hbond" cx="${r1(mx + across[0] * t)}" cy="${r1(my + across[1] * t)}" r="${r1(Math.max(0.9, width * k * 0.2))}"/>`;
      }).join("");
      items.push({ d: Math.max(depthOf(p0, P), depthOf(p1, P)) * 0.5 + depthOf(mid, P) * 0.5, svg: dots });
    }
    meta.push({ index: i, base, partner: PAIR[base], mid, ends: [p0, p1] });
  }
  items.pairs = meta;
  items.point = (along, which) => at(along, (along / rise) * sense + (which ? groove : 0));
  items.length3 = pairs * rise;
  return items;
}

export function dimension(from, to, text, { offset = 10, tick = 4, gap = 5 } = {}) {
  const dir = unit2([to[0] - from[0], to[1] - from[1]]);
  const normal = [dir[1], -dir[0]];
  const a = [from[0] + normal[0] * offset, from[1] + normal[1] * offset];
  const b = [to[0] + normal[0] * offset, to[1] + normal[1] * offset];
  const t = (p) => `M${r1(p[0] - normal[0] * tick)} ${r1(p[1] - normal[1] * tick)}L${r1(p[0] + normal[0] * tick)} ${r1(p[1] + normal[1] * tick)}`;
  const mid = [(a[0] + b[0]) / 2 + normal[0] * gap, (a[1] + b[1]) / 2 + normal[1] * gap];
  const vertical = Math.abs(dir[1]) > Math.abs(dir[0]);
  const anchor = vertical ? (normal[0] > 0 ? "start" : "end") : "middle";
  const baseline = vertical ? mid[1] + 4 : normal[1] < 0 ? mid[1] : mid[1] + 9;
  return `<path class="bio-casing" d="M${r1(a[0])} ${r1(a[1])}L${r1(b[0])} ${r1(b[1])}${t(a)}${t(b)}" stroke-width="3"/><path class="bio-dimension" d="M${r1(a[0])} ${r1(a[1])}L${r1(b[0])} ${r1(b[1])}${t(a)}${t(b)}"/><text class="bio-label" data-small x="${r1(mid[0])}" y="${r1(baseline)}" text-anchor="${anchor}">${text}</text>`;
}

export function key(entries, x, y, { gap = 18, columns = entries.length } = {}) {
  return entries
    .map(([swatch, text], index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      const cx = x + col * 118;
      const cy = y + row * gap;
      return `<rect class="bio-key" x="${r1(cx)}" y="${r1(cy - 8)}" width="14" height="10" rx="2.5" fill="url(#bio-v-${swatch})" stroke="var(--bio-${swatch}-edge)"/><text class="bio-label" data-small x="${r1(cx + 20)}" y="${r1(cy)}">${text}</text>`;
    })
    .join("");
}

export function figurePage({ fig, title, svg, aria, readout, hint, caption, theme, css = "", script = "", width = 800 }) {
  const stage = `<div class="iso-stage bio-stage" tabindex="0" role="slider" aria-label="${aria}" aria-valuemin="0" aria-valuemax="1000000" aria-valuenow="0" aria-valuetext="${readout}">${svg}</div>`;
  const body = `<figure class="iso-figure bio-figure"><div class="iso-plate bio-plate"><p class="bio-title"><span class="bio-fig">${fig}</span>${title}</p>${stage}<div class="bio-foot"><span>${hint}</span><span data-readout>${readout}</span></div></div><figcaption class="iso-legend"><span class="iso-caption">${caption}</span></figcaption></figure>`;
  return pageHtml({ title: title.split(",")[0], theme, body: `<style>${bioCss()}${css}</style><div class="bio" data-theme="${theme}">${body}</div>`, script, width });
}

export function bioSvg({ width, height, label, body }) {
  return figureSvg({ width, height, label, body: [bioDefs(), ...body], className: "bio-svg" });
}

export function membraneLoop(P, points3, { thickness = 4.5, swatch = "head" } = {}) {
  const flat = points3.map((p) => iso(p, P));
  const d = smoothPath(flat, true);
  const k = screenScale(P);
  return `<path d="${d}" fill="none" stroke="var(--bio-${swatch}-edge)" stroke-width="${r1(thickness * k + 2)}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="var(--bio-${swatch})" stroke-width="${r1(thickness * k)}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="var(--bio-tail-hi)" stroke-width="${r1(thickness * k * 0.36)}" stroke-linejoin="round"/>`;
}

export function sortedSvg(items) {
  return [...items].sort((a, b) => a.d - b.d).map((item) => item.svg).join("");
}

export function figureDepth(P) {
  return (point) => depthOf(point, P);
}
