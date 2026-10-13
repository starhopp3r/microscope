# Contributing to Microscope

Thank you for helping. Microscope is judged by how its figures look at 4× zoom, so most of this guide is about checking your work before anyone else does.

By taking part you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Setup

You need:

- **Node.js 20.10 or later.** Nothing to install: the kit, the build scripts and the checks use only Node's built-in modules.
- **Google Chrome or Chromium** for the browser checks. The scripts find it in the usual places; otherwise set `CHROME_PATH` to the binary.
- **Claude Code**, Antigravity, OpenCode or Codex, to try the skill itself.

```sh
git clone https://github.com/starhopp3r/microscope.git
cd microscope
```

To use your working copy as the skill while you change it, link it into your personal skills folder (move any installed copy out of the way first):

```sh
ln -s "$PWD" ~/.claude/skills/microscope
```

For Antigravity, for OpenCode, or for Codex:

```sh
ln -s "$PWD" ~/.gemini/antigravity/skills/microscope
```

```sh
ln -s "$PWD" ~/.config/opencode/skills/microscope
```

```sh
ln -s "$PWD" ~/.agents/skills/microscope
```

## Building the examples

Each example is a biology figure: one script that writes standalone pages next to itself. The built pages are committed.

```sh
node examples/atp-synthase/build.mjs
node examples/atp-synthase/build.mjs --light
node examples/dna-double-helix/build.mjs
node examples/dna-double-helix/build.mjs --light
node examples/t4-phage/build.mjs
node examples/t4-phage/build.mjs --light
node examples/leaf-stoma/build.mjs
node examples/leaf-stoma/build.mjs --light
node examples/sarcomere/build.mjs
node examples/sarcomere/build.mjs --light
```

Each takes a second or two. After a build, `git status --short` must show nothing unless you meant to change a figure. CI runs exactly these commands and then `git diff --exit-code`.

## The checks

Run the ones that match what you touched, and read every PNG they write: open it and look. Put screenshots in `shots/`, which is ignored.

**Regression tests.** All of them, before any pull request. The browser tests need Chrome or Chromium.

```sh
node --test scripts/*.test.mjs
```

**Labels and arrows.** Every biology figure, both themes, at rest and in motion. Each run must end `labels: 0 problems`.

```sh
node scripts/labels.mjs examples/atp-synthase/atp-synthase-light.html --reduced
node scripts/labels.mjs examples/atp-synthase/atp-synthase-light.html --drive --frames 30 --every 250
node scripts/labels.mjs examples/atp-synthase/atp-synthase.html --drive --frames 30 --every 250
```

**Capture.** Stills, phone width, close-ups and the reduced-motion pose.

```sh
node scripts/capture.mjs examples/leaf-stoma/leaf-stoma-light.html --out shots/desk.png
node scripts/capture.mjs examples/leaf-stoma/leaf-stoma-light.html --out shots/phone.png --width 390
node scripts/capture.mjs examples/leaf-stoma/leaf-stoma-light.html --out shots/stoma.png --zoom 150,250,200,150 --zoom-scale 3
node scripts/capture.mjs examples/leaf-stoma/leaf-stoma-light.html --out shots/still.png --reduced
```

**Drive.** Scripted sessions: move, click, key, wait, and contact sheets that catch pops in the motion.

```sh
node scripts/drive.mjs examples/t4-phage/t4-phage-light.html '[["wait",300],["sheet","shots/t4.png",900,12,".iso-plate",0.5,null,4]]'
node scripts/drive.mjs examples/sarcomere/sarcomere-light.html '[["key","ArrowRight"],["wait",2800],["shot","shots/contracted.png"]]'
```

Anything with `until` or `eval` goes in an actions file (`--actions steps.json`). [`references/verify.md`](references/verify.md) has every option.

## House rules

These come from [`SKILL.md`](SKILL.md) and [`references/`](references). A pull request that breaks one will be asked to change.

- **No comments in code.** Not a header, not a note beside a tricky line, not a JSDoc. Put the explanation in names and structure. Tool directives such as `"use client"` are not comments and stay.
- **Kit changes are opt-in.** A change to `kit/` or `scripts/inline-kit.mjs` adds an option or a function whose default is the old behaviour. Every existing example must rebuild byte-identical; CI checks it. If a change is meant to alter a figure, say so in the pull request and commit the rebuilt pages with it.
- **Both themes work, and light ships.** Every colour is a token with a light value and a dark override, never a literal in a figure's CSS or shader. Light shaders are designed for paper (normal premultiplied alpha, never `screen`), not dark glows darkened. Build with `--light` and check both pages.
- **Textbook look, never engineering.** Figures are soft, colour-coded, labelled biology illustrations (`references/biology.md`). No plates, posts, screws, rulers, faceted shading or monochrome.
- **Labels and arrows are clean.** Leaders are horizontal or one 45° elbow, end in a dot on a visible part and cross nothing; arrows cross nothing; moving parts never pass over a label. `scripts/labels.mjs` must report 0 problems at rest and in motion, in both themes.
- **Depth order is true.** Parts are painted back to front from their real depth; a part that wraps another is split into back and front pieces.
- **Shaders never pop.** Every uniform rides an envelope with an attack and a decay, a phase change is a crossfade, and every term reaches zero before any bound or canvas edge. The effect lives in world space in the figure's own camera, and the SVG still reads without WebGL.
- **Every number is true.** The readout, the motion and the caption come from one model with the real numbers. Docs follow the same rule: never write a number or a feature you have not checked.
- **Every biological claim has a source.** A count, size, rate, direction or structure added to `SKILL.md`, `references/biology.md` or a figure is checked against a primary source (a structure, a review, a textbook or the BioNumbers database), and the pull request names it.
- **Read every PNG.** Look at close-ups of every label end, arrowhead and junction in both themes before you ask for a review.

## Changing the skill's text

`SKILL.md` and `references/` are instructions Claude follows, so keep them short, exact and in the same plain voice. When you change a kit API, update [`references/kit.md`](references/kit.md) in the same pull request. When you add an example, give it a folder under `examples/` with a `build.mjs` that writes `<name>.html` and, with `--light`, `<name>-light.html`; add it to the list in `SKILL.md`, the table in the README and the build list in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Pull requests

1. Open an issue first for anything larger than a fix, so we can agree on the approach.
2. Fork the repository and branch from `main`.
3. Make one change per pull request.
4. Rebuild every example and confirm that `git status --short` shows only what you meant to change.
5. Run the checks that apply, and attach screenshots in both themes for any visual change.
6. Add a line under `Unreleased` in [`CHANGELOG.md`](CHANGELOG.md).
7. Fill in the pull request template.

CI must pass before a merge.

## Reporting a bug or asking for a figure

Use the [issue forms](https://github.com/starhopp3r/microscope/issues/new/choose). For a figure that came out wrong, include the prompt, the theme, where the figure lives (HTML, SVG or React), and a screenshot or close-up of the fault.
