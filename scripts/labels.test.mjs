import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import test from "node:test";
import * as bio from "../kit/bio.mjs";

const execute = promisify(execFile);
const labels = fileURLToPath(new URL("labels.mjs", import.meta.url));

async function check(body) {
  const directory = await mkdtemp(join(tmpdir(), "microscope-labels-"));
  try {
    const page = join(directory, "figure.html");
    await writeFile(page, `<!doctype html><style>${bio.bioCss()}</style><div class="bio iso-stage"><svg class="bio-svg" width="400" height="300" viewBox="0 0 400 300">${body}</svg></div>`);
    try {
      return { code: 0, ...await execute(process.execPath, [labels, page], { timeout: 60000 }) };
    } catch (error) {
      return { code: error.code, stdout: error.stdout, stderr: error.stderr };
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

const PARTS = `<circle class="bio-body" cx="203" cy="100" r="5" fill="teal"/><circle class="bio-body" cx="223" cy="160" r="5" fill="teal"/>`;

test("clean textbook labels and arrows pass", async () => {
  const result = await check(
    PARTS +
      bio.label("Rotor", [200, 100], { side: "left", x: 120 }) +
      bio.label("Stator", [220, 160], { side: "right", x: 300, drop: -20 }) +
      bio.arrow([[200, 200], [200, 260]], { flow: true }),
  );
  assert.equal(result.code, 0, result.stdout);
  assert.match(result.stdout, /labels: 0 problems/);
});

test("a diagonal leader, crossing leaders and a leader with no dot fail", async () => {
  const result = await check(
    `<path class="bio-leader" d="M200 100L130 140"/><text class="bio-label" x="125" y="144" text-anchor="end">Diagonal</text>` +
      bio.label("Left", [260, 120], { side: "left", x: 120 }) +
      `<path class="bio-leader" d="M200 60L200 200"/><circle class="bio-anchor" cx="200" cy="60" r="1.7"/>`,
  );
  assert.equal(result.code, 1);
  assert.match(result.stdout, /leader not horizontal, vertical or 45°/);
  assert.match(result.stdout, /leader without an anchor dot/);
  assert.match(result.stdout, /leaders cross/);
});

test("overlapping labels, crossing arrows and text outside the figure fail", async () => {
  const result = await check(
    `<text class="bio-label" x="100" y="100">Catalytic head</text><text class="bio-label" x="110" y="104">Central stalk</text>` +
      bio.arrow([[40, 200], [200, 200]]) +
      bio.arrow([[120, 150], [120, 260]]) +
      `<text class="bio-label" x="380" y="40">Peripheral stalk</text>`,
  );
  assert.equal(result.code, 1);
  assert.match(result.stdout, /labels overlap: Catalytic head × Central stalk/);
  assert.match(result.stdout, /arrows cross/);
  assert.match(result.stdout, /label outside the figure: Peripheral stalk/);
});

test("a leader whose dot sits on empty background fails", async () => {
  const result = await check(`<rect width="400" height="300" fill="#eef"/>` + bio.label("Proton", [300, 80], { side: "right", x: 330 }));
  assert.equal(result.code, 1);
  assert.match(result.stdout, /leader ends on nothing: Proton/);
});

test("a moving glyph on a leader fails", async () => {
  const result = await check(
    bio.label("Membrane", [260, 120], { side: "left", x: 120 }) +
      `<g><circle class="bio-body" cx="200" cy="120" r="6"/><text class="bio-glyph" x="200" y="120">H⁺</text></g>`,
  );
  assert.equal(result.code, 1);
  assert.match(result.stdout, /moving glyph touches a leader: Membrane/);
});
