<h1 align="center">Microscope</h1>

<p align="center"><b>A Claude skill for biology figures: the real structure, built as a precise, working model.</b><br>Molecular biology, microbiology, cell biology, botany and zoology.<br>Crafted, interactive isometric figures with many small precise parts, in SVG, WebGL and 3D.<br>Also runs in Antigravity, OpenCode and Codex.</p>

<p align="center">
  <a href="https://code.claude.com/docs/en/skills"><img src="https://img.shields.io/badge/Claude_Code-skill-1b1b19?style=flat-square&logo=claude&logoColor=white" alt="Claude Code skill"></a>
  <a href="https://agentskills.io"><img src="https://img.shields.io/badge/Agent_Skills-compatible-1b1b19?style=flat-square" alt="Agent Skills compatible"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-1b1b19?style=flat-square" alt="MIT license"></a>
  <a href="#requirements"><img src="https://img.shields.io/badge/node-%E2%89%A5%2020.10-1b1b19?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node 20.10 or later"></a>
  <a href="#requirements"><img src="https://img.shields.io/badge/dependencies-0-1b1b19?style=flat-square" alt="No dependencies"></a>
  <a href="https://github.com/starhopp3r/microscope/actions/workflows/ci.yml"><img src="https://github.com/starhopp3r/microscope/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
</p>

<p align="center">
  <a href="https://github.com/starhopp3r/microscope/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Download-ZIP-1b1b19?style=for-the-badge&logo=github&logoColor=white" alt="Download ZIP"></a>
  &nbsp;
  <a href="#install"><img src="https://img.shields.io/badge/Install-npx_skills_add-d7d7d0?style=for-the-badge&labelColor=1b1b19&logo=npm&logoColor=white" alt="Install with npx"></a>
</p>

<p align="center">
  <a href="#quick-start">Quick start</a> ·
  <a href="#gallery">Gallery</a> ·
  <a href="#what-it-makes">What it makes</a> ·
  <a href="#install">Install</a> ·
  <a href="#usage">Usage</a> ·
  <a href="#examples">Examples</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#limits">Limits</a>
</p>

<p align="center">
  <img src=".github/assets/atp-synthase.webp" width="560" alt="An isometric model of bovine ATP synthase standing through a square patch of membrane on four posts above a base plate with a scale bar and a label plate engraved Bos taurus. A ring of eight cylinders sits in a cutaway in the membrane beside the a-subunit, with protons as small spheres on the ring and queued below it; a central stalk rises into a head of six subunits capped by a dome and held by a curved peripheral stalk. The card reads Fig 1, ATP synthase, 2 H+, 88 degrees, 0 ATP, 750 times slower.">
</p>

<p align="center"><sub><code>examples/atp-synthase</code>, light theme, mid-step. Protons enter the a-subunit from below, turn the eight-subunit c-ring, and one ATP leaves the head every 120°.</sub></p>

---

Ask Claude for a figure of a biological structure or process, and Microscope has it build the real thing as a precise teaching model on a mount. Chemiosmosis becomes a patch of inner mitochondrial membrane with an ATP synthase standing through it, its eight-subunit c-ring turning as protons pass. Bacterial chemotaxis becomes an E. coli envelope opened at its flagellar motor, running and tumbling as the rotor reverses. Gas exchange becomes a block cut from a leaf whose guard cells swell and open the pore.

Claude builds the specimen out of dozens of small, solid, shaded parts in their true number, direction and scale. It puts the specimen on a crafted mount with a scale bar, in a framed card with a title, a hint, numbered legend keys and a live readout, and makes it move calmly under the pointer and the keyboard. Then it checks the biology (counts, handedness, polarity, compartments, scale, sources) and the craft, zooming in on every joint. Every number the figure shows comes from the same small model that moves its parts.

> [!NOTE]
> Microscope is a fork of [Anatomy](https://github.com/wheresryan22/anatomy) by [@wheresryan22](https://x.com/wheresryan22), tuned for biology. The drawing kit, the checks and eight of the nine examples come from Anatomy. Those eight are engineering subjects, kept as the craft references every biological figure is built with; `atp-synthase` is the biology reference.

## Quick start

```sh
npx skills add starhopp3r/microscope -g -a claude-code
```

Then, in Claude Code:

```text
/microscope show how ATP synthase makes ATP in mitochondria, interactive
```

For OpenCode or Codex, swap the agent: `-a opencode` or `-a codex`. OpenCode takes the same `/microscope` command; in Codex, type `$microscope`.

That's it. No API keys and nothing to `npm install`: the kit uses only Node's built-in modules.

## Gallery

<table>
  <tr>
    <td width="50%"><img src=".github/assets/raptor-engine-apart.webp" alt="The Raptor 2 engine taken apart in its test stand: its assemblies, pipes and harness hang apart from each other between the posts of the stand."></td>
    <td width="50%"><img src=".github/assets/ripple-tank.webp" alt="A school ripple tank on four tall legs, with a lamp on an arm above it. Two dippers on a vibrating bar make interfering waves, and their caustics are projected onto the paper screen under the tank."></td>
  </tr>
  <tr>
    <td><sub><b>raptor-engine</b>: hover to take it apart into 11 assemblies. An audit proves that no pipe passes through anything, at rest, apart and in every frame between.</sub></td>
    <td><sub><b>ripple-tank</b>: SVG apparatus over two WebGL layers (lamp light and caustics on the paper, reflections in the water) driven by a dispersion and optics model.</sub></td>
  </tr>
  <tr>
    <td><img src=".github/assets/turning-dial.webp" alt="A combination dial on a raised door plate. A small gold and chrome robot hand lies on the dial and turns with it; a green light glows under one fingertip."></td>
    <td><img src=".github/assets/dial-indicator.webp" alt="A dial indicator gauge on a stand above a base plate with a ruler strip. Its plunger rests on one of three gauge blocks on a sliding carriage."></td>
  </tr>
  <tr>
    <td><sub><b>turning-dial</b>: the 3D mode (beta). About 90 parts are re-projected and re-shaded every frame as you drag the dial.</sub></td>
    <td><sub><b>dial-indicator</b>: the smallest example, about 300 lines. Hover to slide the carriage; the needle reads each block.</sub></td>
  </tr>
</table>

These are the engineering craft references that ship with the skill: they show the finish, the shading, the cutaways, the shaders and the 3D mode that every specimen is built with. Every screenshot is the light theme of a page in [`examples/`](examples), captured with the skill's own [`scripts/capture.mjs`](scripts/capture.mjs) and [`scripts/drive.mjs`](scripts/drive.mjs). The built pages are committed: open any `.html` in `examples/` to try it.

## What it makes

Figures of living things, at whatever level the idea lives:

| Field | For example |
|---|---|
| **Molecular biology** | DNA and its replication fork, transcription, a ribosome translating mRNA, Cas9 cutting at a PAM, an enzyme's active site |
| **Cell biology** | ATP synthase in the inner mitochondrial membrane, kinesin walking a microtubule, the sarcomere, an action potential along a myelinated axon, a synapse, the mitotic spindle, the nuclear pore |
| **Microbiology** | The flagellar motor and run-and-tumble, Gram-positive and Gram-negative envelopes, a T4 phage injecting its genome, a virion fusing with a membrane, budding yeast |
| **Botany** | A leaf section with opening stomata, a chloroplast's grana, xylem and transpiration, a root tip, a flower cut lengthwise with a pollen tube growing |
| **Zoology** | A fish gill's countercurrent exchange, a four-chambered heart through its cycle, an insect thorax driving its wings, an arthropod leg's segments and joints |
| **Lab methods** | A compound microscope, a PCR thermocycler, a gel electrophoresis tank, a centrifuge rotor |

Three kinds of figure. All three share one kit, one camera and one set of craft rules.

| Kind | What it is | Example |
|---|---|---|
| **SVG** | The core. Solid isometric parts with four-tone shading, painted back to front, in a card with a live readout and eased motion. It ships as a standalone HTML page, a lone `.svg` file with its styles embedded, or React/Next.js components. | `dial-indicator`, `desk-computer`, `arcade-cabinet`, `test-rig` |
| **SVG + WebGL** | For what lines can't draw: fluorescence, light falling on a leaf or a slide, water and caustics, the glow under a gel, a flame on the bench. The shader runs in a canvas between a back and a front SVG, in the figure's own isometric camera, so it sits inside the drawing. The SVG still reads without WebGL. | `raptor-engine`, `ripple-tank` |
| **3D** <sup>beta</sup> | Parts that turn in true 3D: a rotary motor such as ATP synthase or the flagellar motor, a specimen that turns on a stage, a leg that flexes at its joints. The moving parts are re-projected and re-shaded by the kit's own rules every frame; the rest of the figure stays static art. | `turning-dial` |

Each figure is light or dark. Light is the theme the skill designs for first, shaders included.

## Install

Microscope is a standard [Agent Skill](https://agentskills.io): a folder with a `SKILL.md` at its root. This repository is that folder. Pick one way in:

| | Command | Installs to |
|---|---|---|
| **skills CLI**, for you (Claude Code) | `npx skills add starhopp3r/microscope -g -a claude-code` | `~/.claude/skills/microscope` |
| **skills CLI**, for you (Antigravity) | `npx skills add starhopp3r/microscope -g -a antigravity` | `~/.gemini/antigravity/skills/microscope` |
| **skills CLI**, for you (OpenCode) | `npx skills add starhopp3r/microscope -g -a opencode` | `~/.config/opencode/skills/microscope` |
| **skills CLI**, for you (Codex) | `npx skills add starhopp3r/microscope -g -a codex` | `~/.agents/skills/microscope` |
| **skills CLI**, for one project | `npx skills add starhopp3r/microscope` | `.claude/skills/microscope` for Claude Code, `.agents/skills/microscope` for Antigravity, OpenCode and Codex |
| **git**, for you (Claude Code) | `git clone https://github.com/starhopp3r/microscope.git ~/.claude/skills/microscope` | `~/.claude/skills/microscope` |
| **git**, for you (Antigravity) | `git clone https://github.com/starhopp3r/microscope.git ~/.gemini/antigravity/skills/microscope` | `~/.gemini/antigravity/skills/microscope` |
| **git**, for you (OpenCode) | `git clone https://github.com/starhopp3r/microscope.git ~/.config/opencode/skills/microscope` | `~/.config/opencode/skills/microscope` |
| **git**, for you (Codex) | `git clone https://github.com/starhopp3r/microscope.git ~/.agents/skills/microscope` | `~/.agents/skills/microscope` |
| **git**, for one project | `git clone https://github.com/starhopp3r/microscope.git .claude/skills/microscope` | `.claude/skills/microscope` (Claude Code and OpenCode) or `.agents/skills/microscope` (Antigravity, OpenCode and Codex) |
| **Download**, no git | see below | any of the folders above |

<details>
<summary><b>With the skills CLI</b></summary>

<br>

The [`skills`](https://github.com/vercel-labs/skills) CLI finds the `SKILL.md` at the root of this repository and installs it as `microscope`. By default it installs into the current project and asks which agents to set up. `-g` installs it for your user, and `-a claude-code` sets up Claude Code only. Use `-a antigravity`, `-a opencode` or `-a codex` for Antigravity, OpenCode or Codex only.

The CLI copies the whole repository, examples included (about 10 MB). It needs a recent Node.js: version 1.7.1 of the CLI asks for 22.20 or later.

</details>

<details>
<summary><b>With git</b></summary>

<br>

Clone the repository into one of the skill folders, so that `SKILL.md` ends up at `<skills folder>/microscope/SKILL.md`. For Claude Code use `~/.claude/skills/microscope` or `.claude/skills/microscope`. For Antigravity use `~/.gemini/antigravity/skills/microscope` or `.agents/skills/microscope`. For OpenCode use `~/.config/opencode/skills/microscope` or `.opencode/skills/microscope`; OpenCode also reads the Claude Code and `.agents` folders. For Codex use `~/.agents/skills/microscope` or `.agents/skills/microscope`. For a project install, commit the folder so your team gets it too. To update later, `git pull` inside that folder.

</details>

<details>
<summary><b>Download, without git</b></summary>

<br>

[Download the ZIP](https://github.com/starhopp3r/microscope/archive/refs/heads/main.zip), unpack it, rename the folder from `microscope-main` to `microscope`, and move it into `~/.claude/skills/` (Claude Code), `~/.gemini/antigravity/skills/` (Antigravity), `~/.config/opencode/skills/` (OpenCode) or `~/.agents/skills/` (Codex).

Or in one line on macOS or Linux:

```sh
mkdir -p ~/.claude/skills/microscope && curl -L https://github.com/starhopp3r/microscope/archive/refs/heads/main.tar.gz | tar -xz --strip-components=1 -C ~/.claude/skills/microscope
```

For Antigravity, OpenCode or Codex, put the same files in `~/.gemini/antigravity/skills/microscope`, `~/.config/opencode/skills/microscope` or `~/.agents/skills/microscope`:

```sh
mkdir -p ~/.gemini/antigravity/skills/microscope && curl -L https://github.com/starhopp3r/microscope/archive/refs/heads/main.tar.gz | tar -xz --strip-components=1 -C ~/.gemini/antigravity/skills/microscope
```

```sh
mkdir -p ~/.config/opencode/skills/microscope && curl -L https://github.com/starhopp3r/microscope/archive/refs/heads/main.tar.gz | tar -xz --strip-components=1 -C ~/.config/opencode/skills/microscope
```

</details>

Claude Code picks up new skills in a running session. If the `skills` folder itself did not exist when the session started, run `/reload-skills`. Antigravity and OpenCode list it as `/microscope` in their chat; restart if it does not show. Codex lists it under `/skills` and runs it with `$microscope`; restart Codex if it does not show.

<details>
<summary><b>Codex: if the browser checks are blocked</b></summary>

<br>

The skill checks its own figures by starting headless Chrome, which writes a temporary profile and talks to it over a local port. Codex runs commands in a sandbox, and that sandbox may stop Chrome. The figure is still built; only its checks fail. In order of preference:

1. When Codex asks to run a check outside the sandbox, approve it for that command. This needs the default `approval_policy = "on-request"`.
2. Or allow it once in `~/.codex/config.toml`:

   ```toml
   approval_policy = "on-request"
   sandbox_mode = "workspace-write"

   [sandbox_workspace_write]
   network_access = true
   writable_roots = ["/tmp"]
   ```

   Newer Codex releases may name these settings differently; check the config reference for your version.
3. Or run the check yourself in a normal terminal, for example `node scripts/capture.mjs page.html --out shots/page.png`.

Starting Codex with `--sandbox danger-full-access` also works, but it lifts every limit for that session, so keep it for projects you trust.

</details>

## Usage

Type `/microscope` (in Codex, `$microscope`) and say what the figure should show:

```text
/microscope show how ATP synthase makes ATP in mitochondria, interactive
```

You don't have to name the skill. Claude also loads it when you ask for a biology, microbiology, molecular biology, cell biology, botany or zoology illustration, a figure for a lecture, course, paper, poster or blog post, or an interactive explainer of a biological structure or process. Antigravity, OpenCode and Codex do the same.

<details>
<summary><b>More prompts</b>, from the skill's <a href="evals/evals.json">evals</a></summary>

<br>

```text
/microscope E. coli's flagellar motor in its cell envelope, and how switching rotation direction makes it run or tumble. A React component for our Next.js site plus a static HTML preview, dark theme.
```

```text
/microscope a leaf cross-section showing how stomata open and close, for a botany lecture slide. Light theme, just the SVG file and a PNG preview.
```

```text
/microscope a bacterial ribosome translating an mRNA: tRNAs moving through the A, P and E sites and the chain growing. One HTML file, dark theme.
```

```text
/microscope a bony fish gill arch showing countercurrent exchange, water one way over the lamellae and blood the other. Standalone HTML, light theme.
```

```text
/microscope an agarose gel electrophoresis tank with a DNA ladder and three samples running; show the bands separating by size when the power is on. One HTML file, light theme.
```

</details>

Four habits get the best figures:

1. **Name the process and the organism.** Say what it should show and in which organism (bovine mitochondria, E. coli, a eudicot leaf, a honeybee), and give any numbers you care about (stoichiometry, rates, sizes, counts). Microscope picks the level of scale, the cut and the mount; that is most of the work.
2. **Or name the specimen.** If you already know what you want on the stand (a sarcomere, a T4 phage, a lily flower cut lengthwise), say so, and say what should move.
3. **Say who it is for.** A first-year lecture, a methods tutorial or a review figure changes how much is shown and how many parts the legend names.
4. **Say where it will live.** A standalone HTML page, a lone SVG file, or a React/Next.js component; light or dark. The build differs for each.

A figure arrives as source you own: a Node build script and the page it writes, or, for React, geometry modules, a server component for the static art and one client component for the motion. The kit comes with it.

## Examples

`atp-synthase` is the biology reference. The other eight come from Anatomy and are engineering subjects. They stay because each one is the working reference for a technique a biological figure needs: the mount (`dial-indicator`), drawing on a face (`desk-computer`), a cutaway that keeps the mechanism in view (`arcade-cabinet`), turned bodies, tubes and the audit (`raptor-engine`), water and light on planes (`ripple-tank`), the drawing quality bar (`test-rig`), shapes that merge, as membranes fuse and cells divide (`spot-plate`), and rotary motion (`turning-dial`). A worked biology design is in [`references/biology.md`](references/biology.md), section 12.

Each framework-free example has a Node build script that writes standalone pages next to itself. Add `--light` for the light theme.

| Example | What it shows | Build |
|---|---|---|
| [`atp-synthase`](examples/atp-synthase) | Bovine ATP synthase through a patch of inner mitochondrial membrane on a mount. Protons enter the a-subunit, turn the eight-subunit c-ring and central stalk in 45° steps, and one ATP leaves a β subunit every 120°. Numbered legend keys light their parts. The biology reference. | `node examples/atp-synthase/build.mjs` |
| [`dial-indicator`](examples/dial-indicator) | A dial gauge on a stand over a carriage of gauge blocks. The smallest example, about 300 lines. | `node examples/dial-indicator/build.mjs` |
| [`desk-computer`](examples/desk-computer) | A 1984-style desk computer with a keyboard you can type on. The typed line appears on a CRT drawn in the plane of the case front, and switching it off collapses the picture to a line and a dot. About 85 solids. | `node examples/desk-computer/build.mjs` |
| [`arcade-cabinet`](examples/arcade-cabinet) | An upright arcade cabinet with its side panel off. Drop a quarter: it rolls down the coin chute past the coin-switch wire into the cash box, a pulse runs along the cable to the board, and the CRT warms up into an attract mode drawn in the plane of the tilted monitor. About 240 solids and 15 cables. | `node examples/arcade-cabinet/build.mjs` |
| [`raptor-engine`](examples/raptor-engine) | A Raptor 2 engine in a test stand. It comes apart into 11 assemblies, and a WebGL plume, shock, splash and steam render between the back and front SVG. The reference for dense pipework, smooth shading, fades and the audit. The build takes a few minutes. | `node examples/raptor-engine/build.mjs` |
| [`ripple-tank`](examples/ripple-tank) | A school ripple tank on tall legs over a paper screen, seen from 44° up. Two WebGL layers are registered to the isometric planes and driven by a pure model in `model.mjs`. | `node examples/ripple-tank/build.mjs` |
| [`test-rig`](examples/test-rig) | A production figure from a React/Next.js site: a glass button on a spring-mounted carriage, a finger probe on a rail, and a dial gauge reading the lean. 53 solids. No build script: copy it into a React app. | none |
| [`spot-plate`](examples/spot-plate) | A second figure from the same site: six pairs of glass drops on a spot plate that run together into one piece of glass as a fan of feeler blades opens. Each pair is drawn from one distance field. No build script: copy it into a React app. | none |
| [`turning-dial`](examples/turning-dial) | The 3D mode: a combination dial that turns in true 3D with a small robot hand on it, a three-hinge finger that lifts, and a pod that breaks off as a free body. `stress.mjs` is a 380-part hand in a cluttered workshop, used to measure performance. | `node examples/turning-dial/build.mjs` |

`node examples/atp-synthase/build.mjs --audit`, `node examples/raptor-engine/build.mjs --audit`, `node examples/arcade-cabinet/build.mjs --audit` and `node examples/turning-dial/build.mjs --light --audit` also run the geometry audit. The 3D audit is slow; see [`references/3d.md`](references/3d.md).

## How it works

- **[`SKILL.md`](SKILL.md)** is what Claude reads. It sets the workflow: collect the true numbers for the organism first, choose the specimen and its mount, write a parts list, plan the world, build the geometry once with the kit, paint back to front, frame it, make it live, and then verify it like a critic. It also holds the biology rules and the craft rules in short form.
- **[`references/biology.md`](references/biology.md)** is the domain guide: levels of scale and mounts, concepts and their specimens, true numbers to start from, recipes for living forms in the kit, counts, handedness, polarity and compartments, colour and stains, naming parts through the legend, biological time, and the biology review.
- **[`kit/`](kit)** is the drawing library the figures are built from: the isometric camera, solids and a parts library (`iso-kit`), round parts on any axis (`lathe.mjs`), pipes and cables (`tube.mjs`), the WebGL layer (`gl.mjs`), the 3D runtime (`turn*.mjs`), and React components (`react/`). Apart from React for those components, it has no dependencies.
- **[`references/`](references)** are the long-form guides Claude opens when it needs them: biology, craft, the kit API, motion, React, verification, WebGL, a design walkthrough and the 3D mode.
- **Verification.** [`kit/audit.mjs`](kit/audit.mjs) proves the geometry: nothing passes through anything, every end sits on a mount, and every overlap is drawn in depth order (`node build.mjs --audit`). In headless Chrome, [`scripts/capture.mjs`](scripts/capture.mjs) and [`scripts/drive.mjs`](scripts/drive.mjs) take screenshots, close-ups and slowed-down contact sheets, [`scripts/lines.mjs`](scripts/lines.mjs) fails any line that ends in mid-air, and [`scripts/turn-check.mjs`](scripts/turn-check.mjs) checks 3D figures. The skill tells Claude to read every PNG it makes.

<details>
<summary><b>Repository layout</b></summary>

<br>

```text
microscope/
├── SKILL.md                  the skill: workflow, setup and craft rules
├── kit/                      the drawing library
│   ├── iso-kit.ts            the core: camera, solids, parts, SVG renderer, card and page, CSS
│   ├── iso-kit.mjs           the same core as plain ESM, for Node build scripts
│   ├── iso.css               the kit's CSS, both themes
│   ├── react/                draw.tsx (server-safe components), live.tsx (client hooks)
│   ├── lathe.mjs             round parts on any axis
│   ├── tube.mjs              pipes, tubes and cables
│   ├── audit.mjs             the geometry audit
│   ├── gl.mjs                the WebGL layer for shaders inside the drawing
│   ├── turn.mjs              the 3D runtime (beta)
│   ├── turn-build.mjs        the 3D builder
│   ├── turn-audit.mjs        the 3D orbit audit
│   └── turn-fixed.mjs, canvas-painter.mjs, gl-shared.mjs
│                             experimental variants, not yet documented or used by the examples
├── references/               long-form guides Claude reads as needed
│   ├── biology.md  craft.md  kit.md  motion.md  react.md
│   └── verify.md  webgl.md  walkthrough.md  3d.md
├── scripts/                  headless Chrome checks and build helpers
│   ├── capture.mjs           screenshots and close-ups
│   ├── drive.mjs             scripted sessions and contact sheets
│   ├── lines.mjs             the line-end check (with line-ends.mjs)
│   ├── inline-kit.mjs        the kit as source, to inline into a standalone page
│   ├── turn-check.mjs        3D checks in the browser (with turn-fidelity.mjs)
│   └── turn-bench.mjs        3D timing in Node
├── examples/                 nine complete figures, built pages committed
├── evals/evals.json          test prompts and what a good answer contains
└── .github/                  issue forms, PR template, CI, README images
```

</details>

## Requirements

| | Needed for | Notes |
|---|---|---|
| **[Claude Code](https://code.claude.com/docs/en/overview)**, or [Antigravity](https://antigravity.google), [OpenCode](https://opencode.ai/docs/skills/) or [Codex](https://developers.openai.com/codex/skills) | everything | The skill is written for Claude Code and follows the open Agent Skills format, so Antigravity, OpenCode and Codex load it too. In Codex, the browser checks start Chrome; if its sandbox blocks that, allow it for those commands. |
| **Node.js 20.10+** | builds, kit, checks | Built-in modules only: nothing to `npm install`. The examples were rebuilt byte for byte on Node 20.19 and 22.11. On Node 20 the browser scripts restart themselves with `--experimental-websocket`. |
| **Chrome or Chromium** | the checks | `capture.mjs`, `drive.mjs`, `lines.mjs` and `turn-check.mjs` look in the usual places on macOS, Linux and Windows and in Playwright's cache. Set `CHROME_PATH` for any other binary. They run it headless with WebGL on. |
| **React 18+** | React output only | `kit/react/`, `examples/test-rig/` and `examples/spot-plate/`. |

## Limits

- **It is not a chart library.** There are no axes, series or data plots: no volcano plots, phylogenetic trees or growth curves. Numbers appear as a live readout driven by a model, and as the true sizes and counts of the parts.
- **It draws specimens and instruments.** Molecules, cells, tissues, organs, plants and animals, and the instruments that study them. It does not draw whole people, faces or exact maps, and it is not a molecular viewer: it builds a crafted model from a structure's facts rather than rendering atomic coordinates. An idea that has no structure to build, such as a whole metabolic network, will come out weaker; pick the machine or compartment that carries one step.
- **It is only as true as its sources.** The skill collects real numbers and checks counts, handedness, polarity and compartments, but have an expert review a figure before it goes into teaching material or a paper.
- **It is slow on purpose.** A figure takes a long session: the parts list, the geometry, the audit, and close-ups of every joint in both themes. The Raptor's build takes a few minutes, and a full 3D orbit audit takes 15 to 20 minutes for 30 parts.
- **Shaders need WebGL.** Without it the SVG still reads, and under reduced motion every figure goes still.

> [!NOTE]
> **The 3D mode is beta.** It is proved on its example and one test figure, not yet on a production figure. A small 3D figure runs at 60 fps; the 380-part stress hand measured about 20 fps at 1440 px wide and 13 to 15 fps on a throttled phone profile, on a heavily loaded machine.

## Share a figure

Made something good? Ask your agent to *"publish this figure to the Microscope community gallery"*. It asks for a title and your GitHub name, shows what it will send, and after your yes opens a pull request on [microscope-community](https://github.com/starhopp3r/microscope-community) for you: no git, no forking by hand. Or run `scripts/publish.mjs --submit` yourself. Without a terminal, use the gallery's **Submit a figure** form with a GitHub Gist.

## Contributing

Issues and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first: it covers building the examples, the checks, and the house rules a change has to keep (among them, no comments in code, and kit changes that leave every existing example byte-identical). Please follow the [Code of Conduct](CODE_OF_CONDUCT.md), and report security problems as described in [SECURITY.md](SECURITY.md).

- [Report a bug](https://github.com/starhopp3r/microscope/issues/new?template=bug_report.yml)
- [Request a figure](https://github.com/starhopp3r/microscope/issues/new?template=figure_request.yml)
- [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE) © 2026 Ryan · [@wheresryan22](https://x.com/wheresryan22). Microscope is a fork of [Anatomy](https://github.com/wheresryan22/anatomy), tuned for biology.

<p align="center"><sub>If Microscope drew something useful for you, a ⭐ helps other people find it.</sub></p>
