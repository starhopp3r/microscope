import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const argv = process.argv.slice(2);
if (!argv.length || argv.includes("--help") || argv.includes("-h")) {
  console.log(`Check the labels and arrows of a biology figure the way a textbook editor would.

  node labels.mjs <file.html | url> [--frames 6] [--every 450] [--drive] [drive.mjs flags]

Measures the rendered page in headless Chrome and fails on any of these:
  - a leader segment that is not horizontal, vertical or at 45°;
  - a leader without an anchor dot, or whose dot sits on empty background instead of a part;
  - two leaders that cross, or a leader that crosses or touches an arrow or another label's text;
  - two labels whose text overlaps, or label text that touches an arrow;
  - two arrows that cross;
  - label text outside the figure;
  - a moving glyph (H⁺, ATP, any .bio-glyph) that touches a label's text or a leader it isn't anchored to.
With --frames it checks that many moments, --every ms apart, so moving parts are checked as they travel; --drive
hovers the figure first so it runs. Exits 1 on any problem.`);
  process.exit(argv.length ? 0 : 1);
}
const take = (flag, fallback) => {
  const at = argv.indexOf(flag);
  if (at < 0) return fallback;
  const value = argv[at + 1];
  argv.splice(at, 2);
  return value;
};
const has = (flag) => {
  const at = argv.indexOf(flag);
  if (at < 0) return false;
  argv.splice(at, 1);
  return true;
};
const frames = Number(take("--frames", 1));
const every = Number(take("--every", 450));
const drive = has("--drive");

const CHECK = `(() => {
  const svg = document.querySelector("svg.bio-svg") || document.querySelector(".iso-stage svg");
  const view = svg.viewBox.baseVal;
  const box = (el, pad = 0) => { const b = el.getBBox(); return { x0: b.x - pad, y0: b.y - pad, x1: b.x + b.width + pad, y1: b.y + b.height + pad }; };
  const meet = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
  const pointsOf = (d) => (d.match(/-?\\d*\\.?\\d+(?:e-?\\d+)?/g) || []).map(Number).reduce((list, value, index, all) => (index % 2 ? list : [...list, [value, all[index + 1]]]), []);
  const segs = (pts) => pts.slice(1).map((p, i) => [pts[i], p]);
  const cross = (a, b, c, d) => { const o = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]); const s1 = o(a, b, c), s2 = o(a, b, d), s3 = o(c, d, a), s4 = o(c, d, b); return s1 * s2 < -1e-6 && s3 * s4 < -1e-6; };
  const near = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1]; const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1))); return Math.hypot(p[0] - a[0] - dx * t, p[1] - a[1] - dy * t); };
  const segBox = ([a, b], r) => ({ x0: Math.min(a[0], b[0]) - r, y0: Math.min(a[1], b[1]) - r, x1: Math.max(a[0], b[0]) + r, y1: Math.max(a[1], b[1]) + r });
  const segHitsBox = (s, r) => { const [a, b] = s; if (meet(segBox(s, 0), r) === false) return false; for (let t = 0; t <= 1.0001; t += 0.02) { const p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; if (p[0] > r.x0 && p[0] < r.x1 && p[1] > r.y0 && p[1] < r.y1) return true; } return false; };
  const fmt = (p) => p.map((v) => v.toFixed(0)).join(",");
  const matrix = svg.getScreenCTM();
  const onPart = ([x, y]) => { const point = svg.createSVGPoint(); point.x = x; point.y = y; const at = point.matrixTransform(matrix); const stack = document.elementsFromPoint(at.x, at.y).filter((el) => svg.contains(el) && el !== svg); const top = stack.find((el) => !el.matches(".bio-leader, .bio-anchor, .bio-casing, .bio-label, .bio-region, .bio-arrow, .bio-arrow-head, defs *")); return Boolean(top) && top.tagName !== "rect"; };
  const problems = [];
  const texts = [...svg.querySelectorAll("text.bio-label, text.bio-region")].map((el) => ({ el, name: el.textContent.trim(), r: box(el, 1.5) }));
  const leaders = [...svg.querySelectorAll("path.bio-leader")].map((el) => ({ el, pts: pointsOf(el.getAttribute("d")) }));
  const anchors = [...svg.querySelectorAll("circle.bio-anchor")].map((el) => [Number(el.getAttribute("cx")), Number(el.getAttribute("cy"))]);
  const arrows = [...svg.querySelectorAll("path.bio-arrow")].map((el, index) => { const n = el.getTotalLength(); const pts = []; for (let s = 0; s <= n; s += 1.5) { const p = el.getPointAtLength(s); pts.push([p.x, p.y]); } return { index, pts, group: el.getAttribute("data-arrow") || "arrow-" + index }; });
  const heads = [...svg.querySelectorAll("path.bio-arrow-head")].map((el) => box(el, 0.5));
  const glyphs = [...svg.querySelectorAll("text.bio-glyph")].map((el) => { const body = el.previousElementSibling; const g = el.closest("g[opacity]"); const alpha = g ? Number(g.getAttribute("opacity")) : 1; return { r: box(body || el, 0.5), alpha }; }).filter((g) => g.alpha > 0.25);
  const leaderName = (l) => { const end = l.pts[l.pts.length - 1]; const t = texts.find((t) => Math.abs((t.r.x0 + t.r.x1) / 2 - end[0]) < (t.r.x1 - t.r.x0) / 2 + 12 && end[1] > t.r.y0 - 14 && end[1] < t.r.y1 + 14); return t ? t.name : "leader at " + fmt(l.pts[0]); };
  for (const t of texts) if (t.r.x0 < view.x - 0.5 || t.r.y0 < view.y - 0.5 || t.r.x1 > view.x + view.width + 0.5 || t.r.y1 > view.y + view.height + 0.5) problems.push("label outside the figure: " + t.name);
  texts.forEach((a, i) => texts.slice(i + 1).forEach((b) => { if (meet(a.r, b.r)) problems.push("labels overlap: " + a.name + " × " + b.name); }));
  for (const l of leaders) {
    const name = leaderName(l);
    for (const [a, b] of segs(l.pts)) { const dx = Math.abs(b[0] - a[0]), dy = Math.abs(b[1] - a[1]); if (!(dy < 0.6 || dx < 0.6 || Math.abs(dx - dy) < 0.8)) problems.push("leader not horizontal, vertical or 45°: " + name + " at " + fmt(a)); }
    if (!anchors.some((p) => Math.hypot(p[0] - l.pts[0][0], p[1] - l.pts[0][1]) < 0.6)) problems.push("leader without an anchor dot: " + name);
    else if (!onPart(l.pts[0])) problems.push("leader ends on nothing: " + name + " at " + fmt(l.pts[0]));
    for (const t of texts) if (segs(l.pts).some((s) => segHitsBox(s, t.r))) problems.push("leader crosses label text: " + name + " × " + t.name);
    for (const a of arrows) if (a.pts.some((p) => segs(l.pts).some(([s0, s1]) => near(p, s0, s1) < 2.2))) problems.push("leader touches an arrow: " + name);
    for (const h of heads) if (segs(l.pts).some((s) => segHitsBox(s, h))) problems.push("leader touches an arrowhead: " + name);
  }
  leaders.forEach((a, i) => leaders.slice(i + 1).forEach((b) => { if (segs(a.pts).some(([p, q]) => segs(b.pts).some(([r, s]) => cross(p, q, r, s)))) problems.push("leaders cross: " + leaderName(a) + " × " + leaderName(b)); }));
  for (const t of texts) { if (arrows.some((a) => a.pts.some((p) => p[0] > t.r.x0 && p[0] < t.r.x1 && p[1] > t.r.y0 && p[1] < t.r.y1))) problems.push("arrow touches label text: " + t.name); if (heads.some((h) => meet(h, t.r))) problems.push("arrowhead touches label text: " + t.name); }
  arrows.forEach((a, i) => arrows.slice(i + 1).forEach((b) => { if (a.group === b.group) return; const hit = a.pts.find((p) => b.pts.some((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1.6)); if (hit) problems.push("arrows cross at " + fmt(hit)); }));
  for (const g of glyphs) {
    for (const t of texts) if (meet(g.r, t.r)) problems.push("moving glyph touches label text: " + t.name);
    for (const l of leaders) { const own = g.r.x0 - 3 < l.pts[0][0] && l.pts[0][0] < g.r.x1 + 3 && g.r.y0 - 3 < l.pts[0][1] && l.pts[0][1] < g.r.y1 + 3; if (!own && segs(l.pts).some((s) => segHitsBox(s, g.r))) problems.push("moving glyph touches a leader: " + leaderName(l)); }
  }
  return { labels: texts.length, leaders: leaders.length, arrows: arrows.length, glyphs: glyphs.length, problems };
})()`;

const actions = [["wait", 1500]];
if (drive) actions.push(["move", ".iso-stage", 0.5, 0.5], ["wait", 1200]);
for (let i = 0; i < frames; i++) {
  if (i) actions.push(["wait", every]);
  actions.push(["eval", CHECK]);
}
const dir = mkdtempSync(join(tmpdir(), "microscope-labels-"));
const file = join(dir, "actions.json");
writeFileSync(file, JSON.stringify(actions));
const run = spawnSync(process.execPath, [join(dirname(fileURLToPath(import.meta.url)), "drive.mjs"), argv[0], "--actions", file, ...argv.slice(1)], { encoding: "utf8" });
rmSync(dir, { recursive: true, force: true });
if (run.status !== 0 && !run.stdout.includes("eval:")) {
  process.stderr.write(run.stdout + run.stderr);
  process.exit(1);
}
const results = run.stdout.split("\n").filter((line) => line.startsWith("eval:")).map((line) => JSON.parse(line.slice(5)));
const seen = new Map();
results.forEach((result, index) => result.problems.forEach((p) => seen.set(p, [...(seen.get(p) ?? []), index])));
const problems = [...seen].map(([p, at]) => (results.length > 1 ? `${p} (frame${at.length > 1 ? "s" : ""} ${at.join(", ")})` : p));
const first = results[0] ?? { labels: 0, leaders: 0, arrows: 0, glyphs: 0 };
console.log(`labels: ${first.labels} labels, ${first.leaders} leaders, ${first.arrows} arrows, ${results.length} frame${results.length === 1 ? "" : "s"}`);
for (const p of problems) console.log("  " + p);
console.log(problems.length ? `labels: ${problems.length} problem${problems.length === 1 ? "" : "s"}` : "labels: 0 problems");
process.exit(problems.length ? 1 : 0);
