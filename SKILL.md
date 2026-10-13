---
name: microscope
description: Build textbook-quality, interactive biology figures in the style of Campbell Biology, Alberts' Molecular Biology of the Cell or OpenStax, covering molecules and molecular machines (DNA, ribosomes, ATP synthase, motor proteins, channels), cells and microbes (bacteria, viruses, organelles, membranes), plants (leaf and stem sections, stomata, flowers, roots, xylem) and animals (organs, insects, gills, hearts, muscle), plus the lab techniques that study them. Each figure draws the real structure with soft, colour-coded, shaded shapes, a phospholipid bilayer where there is a membrane, tinted compartments, clear labels with leader lines and process arrows, and it moves on a live model with true counts, directions, scale and rates, with the sources in the caption. Use this whenever someone wants a biology, microbiology, molecular biology, cell biology, botany or zoology illustration, a figure for a lecture, course, textbook, paper, poster, blog post or docs page, an interactive explainer of how a biological structure or process works, or a high-quality scientific SVG of a cell, organism or molecule. Works framework-free (JavaScript that writes SVG and HTML) and in React/Next.js. Also publishes a finished figure to the Microscope community gallery when asked.
license: MIT
compatibility: Written for Claude Code; also runs in Antigravity, OpenCode and Codex. Needs Node.js 20.10+, and Chrome or Chromium for the checks.
metadata:
  opencode/slash: "true"
---

# Microscope

This skill makes biology figures that look like they came out of a good textbook: Campbell Biology, Alberts' Molecular Biology of the Cell, Raven, OpenStax. A membrane is a bilayer of round heads and wavy tails. Proteins are soft, rounded, colour-coded bodies built from their real subunits. Compartments are tinted. Every part the reader must learn is named by a label with a thin leader line, and arrows show what flows and what turns. The figure is also live: it moves on a small model whose counts, directions, scale and rates are true, and the caption cites the sources.

**It never looks like an engineering drawing.** No base plates, posts, feet, screws, rulers, label plates, knurls, bevels, hard faceted four-tone shading, black hairline outlines or monochrome palettes. If a figure could pass for a machine on a workbench, it is wrong.

Read `references/biology.md` before you design anything. It has the textbook style in full, the colour conventions, the levels of scale and the views textbooks use, a table of concepts and how textbooks draw them, true numbers to start from, recipes for every biological form in `kit/bio.mjs`, the correctness rules, and the review.

## The reference example

`examples/atp-synthase/` is the reference. Open it first, and match its look.

- It shows bovine ATP synthase in the inner mitochondrial membrane in the textbook layout: the intermembrane space tinted above, the matrix tinted below, and the catalytic head hanging into the matrix.
- It uses colour by structure: a teal c-ring of 8, a blue stator and peripheral stalk, a yellow central stalk, pale α and dark β subunits, red H⁺ spheres and green ATP.
- The membrane is a phospholipid bilayer.
- Eight labels name the parts and two spaced-capital names mark the compartments. A red arrow shows the proton path, a dark arrow shows the rotation, and "ADP + Pᵢ → ATP" sits beside the head.
- The rotor turns in 45° proton steps on a sourced model (`model.mjs`). The whole protein is redrawn every frame from `scene.mjs`, the same module the build uses.

The other eight examples (`dial-indicator`, `desk-computer`, `arcade-cabinet`, `raptor-engine`, `ripple-tank`, `test-rig`, `spot-plate`, `turning-dial`) are engineering subjects inherited from Anatomy. Never copy their look. Open one only for a technique it demonstrates, and redraw the result in the textbook style:

- `spot-plate` for shapes that merge, as in membrane fusion, budding and cell division;
- `turning-dial` for true 3D rotation;
- `ripple-tank` and `raptor-engine` for WebGL light and fluids;
- `test-rig` for the React split.

## The one idea that matters

**Draw the real structure, the way a great textbook draws it.** In biology the structure is the mechanism: ATP synthase really is a rotary motor, and a stoma really opens because two guard cells swell. Draw that structure truly (its subunits, layers, segments and counts) in the clear, coloured, labelled language of a textbook figure. Then make it move on a true model.

| Concept | How a textbook shows it |
|---|---|
| Chemiosmosis and ATP synthesis | ATP synthase in a bilayer, intermembrane space above and matrix below. H⁺ arrows run through the stator, the rotor ring turns, and ADP + Pᵢ → ATP sits at the head |
| Bacterial run and tumble | A rod-shaped cell with flagella. An inset cuts the envelope open at the motor, showing its rings in the inner membrane, peptidoglycan and outer membrane |
| Translation | The ribosome's large and small subunits on an mRNA strand. tRNAs with anticodons sit in the E, P and A sites, and the polypeptide grows out of the large subunit |
| DNA structure and replication | A coloured double helix with A–T and G–C pairs. At the fork, helicase, primase, the leading and lagging strands, and Okazaki fragments, with 5′ and 3′ marked |
| Gas exchange in a leaf | A leaf cross-section block: cuticle, epidermis, palisade, spongy mesophyll with air spaces, a vein, and guard cells around an open stoma, with CO₂, O₂ and H₂O arrows |
| Saltatory conduction | A neuron with myelin sheaths and nodes of Ranvier. Na⁺ and K⁺ arrows sit at the active node, with an action potential trace |
| Countercurrent exchange | A gill filament with lamellae, water flow and blood flow in opposite directions, and an O₂ gradient |
| PCR | The three-step temperature cycle with strands separating, primers annealing and polymerase extending, and the copy count doubling |

Ways a figure fails:

- **Engineering look.** Mounts, plates, screws, rulers, hard facets, black outlines, monochrome. It reads as a machine drawing, not biology.
- **Clip-art.** A "fried egg" cell with random beans, a ribosome as a snowman, a membrane as one flat line. Simplified is fine; vague is not.
- **Unlabelled.** A textbook figure names its parts and its compartments. A reader who can't name a part learns nothing from it.
- **Untrue.** The wrong count of subunits, legs or protofilaments, a left-handed DNA helix, a polymerase moving the wrong way, a ribosome the size of a mitochondrion. However beautiful, a biological error makes a wrong figure.

## Workflow

Work in this order. Write the truth, the layout and the parts list before any drawing.

1. **Size it before you start.** Name the size before any other work, and tell the user roughly how long it will take when the tier below calls for an estimate.
   - **Figure**: one structure or process, 20–60 drawn parts plus labels. Name the size and build it without asking, without quoting a time.
   - **Hero**: a dense scene (a cell cutaway, a whole replication fork, a leaf block with several cell types), 60–200 parts, or with WebGL or 3D. About 2–4 hours. Say so, then build it unless the user asked for something quick.
   - **Epic**: a whole organism, organ system or a multi-panel process. 6 hours or more. Do not start it. Give the estimate, propose a Hero that keeps the core of the idea, and build the Epic only when the user chooses it.
   - Whatever the size, have a working page that opens in the browser within the first hour, and deepen it from there.
2. **Truth first.** Name the organism, then collect the real numbers and behaviour: sizes, counts, stoichiometry, rates, handedness, polarity, and the compartment each part lives in. Start from `references/biology.md`, section 4, and check every value against a primary source (a structure's PDB entry, a review, a textbook, BioNumbers); use literature tools if you have them. Never invent a number or a structure. Write the model as a small pure module (like `examples/atp-synthase/model.mjs`), with every count as a named constant and a `SOURCES` list, and drive everything from it.
3. **Choose the view.** Pick one level of scale and the view a textbook would use: a cross-section, a cutaway block, a side view of a membrane, a cell cutaway, or an organ cut open (`references/biology.md`, section 2). Put the compartments where textbooks put them, such as the intermembrane space above the matrix. Say in one sentence what moves and what that motion means. Never copy a published figure: take its facts, not its drawing.
4. **Parts list and labels.** List the structures to draw, with their true counts and their colour from the palette, then the labels (sentence case, short) and the arrows (flows in colour, motion in dark grey). Plan where every label sits: in the margins or in clear space, never on top of a structure, with leaders that don't cross each other.
5. **Plan the world.** One world unit stands for one fixed real length for the whole figure (for example 1 nm = 10 units for a molecular machine). Lay out in 3D (x and y on the floor, z up), and choose a gentle camera: elevation 10–25°, with the long axis across the screen. Fit with `fitProjection`, leaving margins for the labels.
6. **Draw with `kit/bio.mjs`.** Build bodies from `sphere`, `ellipsoid` and `capsule` (soft gradient fills, outlines in a darker shade of the body's own colour), strands and tubes from `rope`, membranes from `bilayer` and `membraneLoop`, DNA from `doubleHelix`, and flows from `arrow`. Name parts with `label` and compartments with `region`. Build one subunit and place it `n` times around its axis. Shapes that merge come from a distance field (`examples/spot-plate/`).
7. **Paint back to front.** Give every body a depth (`depthOf` of its centre) and draw in order with `sortedSvg`. Split anything that wraps another part into a back and a front piece (back strand runs, then base pairs, then front runs). Draw arrows and labels last, over everything.
8. **Frame it as a textbook figure.** Add the figure number and a one-line title above, the live readout and the interaction hint below, and the caption under the card: what it shows, the organism, the scale, the real rate and the playback speed, and the sources.
9. **Make it live.** Use calm time-based motion: exponential follow or real springs. Motors step and dwell rather than spin smoothly, and real rates are shown with the playback speed (`100 turns/s · shown 750× slower`). An idle tour runs the mechanism once through and loops when nobody touches it. The figure responds to pointer and keyboard, stops when offscreen, and goes still under reduced motion. See `references/motion.md` and `references/biology.md`, section 9.
10. **Verify like a biologist and an illustrator.** Read every PNG you make.
   - Check the biology first with the review in `references/biology.md`, section 11: name, counts, handedness and polarity, compartments, scale, sources and time. Write down each count drawn against the true count. Check every helix's handedness on screen, not in the maths: the kit's camera is mirror-handed.
   - Then the textbook review, in the same section: does it look like a textbook figure and nothing like an engineering drawing? Are the colours consistent and conventional, is every label legible and clear of the drawing, does every leader end on its part, and does no arrow point into the wrong part?
   - **Run the label check to zero, at rest and in motion.** `node scripts/labels.mjs page.html --reduced` and `node scripts/labels.mjs page.html --drive --frames 30 --every 250` (and on the `-light` page) must both end `labels: 0 problems`. The check fails a leader that isn't horizontal, vertical or 45°, a leader with no dot, crossing leaders, a leader or text touching an arrow, overlapping labels, crossing arrows, text outside the figure, and a moving glyph that touches a label or a leader. Fix the layout, never the check.
   - Capture desktop, phone (390 wide), several moments of motion and 3× close-ups with `scripts/capture.mjs`, both themes, and a reduced-motion run; use `scripts/drive.mjs` for sequences and contact sheets that catch pops.

## Setup

The biology kit is `kit/bio.mjs`. It builds on the camera in `kit/iso-kit.mjs`:

| Function | Use it for |
|---|---|
| `bioCss()`, `bioDefs()` | The palette as CSS tokens (light and dark) and the gradients every body uses. Put `bioDefs()` first in the SVG and wrap the page in `class="bio"` with `data-theme`. |
| `SWATCHES` | The palette: membrane heads and tails, rotor, stator, rod, α, β, protons, ATP, DNA bases (A, T, G, C), DNA, RNA, chlorophyll, cytosol and cell wall. Add a swatch (base, highlight, shadow, edge) for any new structure; never type a colour into a figure. |
| `sphere`, `ellipsoid`, `capsule` | Soft gradient bodies seen in the figure's camera: ions, globular domains, subunits, organelles, cells, rods. |
| `rope(P, points, r, swatch)` | Strands, filaments, stalks, vessels, axons, hyphae: a smooth tube with an edge, a body and a highlight. |
| `doubleHelix(P, from, to, options)` | B-DNA with coloured base pairs, true rise, turn and groove, and the handedness corrected for the camera. It returns depth items for `sortedSvg`. |
| `bilayer(P, box, options)` | A membrane block: heads on the top surface, and on the cut faces heads, tails and the second leaflet. `skip` leaves out heads where a protein sits. |
| `membraneLoop(P, points)` | A membrane seen in section around a cell or an organelle. |
| `arrow(points, { flow, bend })` | A process arrow (flows in the flow colour) or a motion arrow (dark), with a halo and an arrowhead aligned to the path. `bend` makes a smooth curved arrow between two points, for a reaction. |
| `rotationArrow(P, centre, radius, from, to)` | A rotation arrow around an axis, split into `back` (drawn behind the axis, among the depth-sorted parts) and `front` (drawn over it, with the head). |
| `label(text, anchor, { side, x, drop })`, `region(text, x, y)` | A label in a column at `x` on the left or right. Its leader runs horizontally from the anchor dot on the part, or with one 45° elbow (`drop`), and has a halo; `\n` wraps. `region` sets spaced capitals for compartments. |
| `sortedSvg(items)` | Paints `{ d, svg }` items back to front. |

`scripts/labels.mjs` checks the labels and arrows of a built page (see the workflow, step 10). `scripts/inline-kit.mjs` has `kitScript()` and `bioScript()` to inline the camera and the biology kit into a standalone page, so the page can redraw moving parts every frame. `scripts/capture.mjs`, `scripts/drive.mjs` and `scripts/publish.mjs` capture, drive and publish figures.

The rest of `kit/` (`lathe.mjs`, `tube.mjs`, `audit.mjs`, `gl.mjs`, the 3D mode) comes from Anatomy's engineering kit. Use its geometry when you need it (exact turned profiles, routed tubes, a WebGL layer, true 3D turning), but never its look: render the result with the biology palette and gradients.

Pick the path that fits the project:

- **Standalone HTML, a static SVG, a blog post or any non-React site.** Write a Node build script like `examples/atp-synthase/build.mjs`: a pure model module, a scene module that draws the moving parts (shared by the build and the page), and a `live.js` for the page. For a lone `.svg` file, inline `bioCss()` in a `<style>` inside the SVG.
- **React or Next.js.** Keep the model and scene in plain modules, render the static figure in a server component, and redraw the moving parts in one `"use client"` component. `references/react.md` explains the split.

## Textbook style (short form)

`references/biology.md`, sections 5–8, gives the full rules and recipes.

- **Soft, rounded, shaded bodies.** Proteins, organelles and cells are built from rounded shapes with gradient fills: light upper left, shadow lower right. Outlines are a darker shade of the body's own colour, never black.
- **Colour codes structure.** Each kind of structure has one colour from the palette, kept the same across a set of figures: membrane heads orange with pale tails, chlorophyll green, H⁺ red, ATP green, the four DNA bases in four distinct colours. Similar subunits take two shades of one hue, like pale α and dark β.
- **Membranes are bilayers.** A membrane is drawn as two leaflets of round heads with wavy tails, about 4–5 nm thick, never as a single line or a slab.
- **Compartments are tinted.** Cytosol, matrix, stroma, lumen, intermembrane space and extracellular space each get a pale tint, and the main ones are named in spaced capitals.
- **Labels name the parts.** Labels are short and in sentence case, set in aligned columns left and right of the drawing. Each has a thin, haloed leader that runs horizontally (or with one 45° elbow) to a dot on a visible edge of its part. Leaders never cross each other, an arrow or another label. Name every structure the caption mentions.
- **Arrows explain.** Flows (ions, electrons, molecules, water) get coloured arrows along their real path, ending where the thing ends up and never in a part it doesn't enter. Motion (rotation, sliding, walking) gets dark arrows; a rotation arrow passes behind its axis at the back and in front at the front (`rotationArrow`). Reactions are written beside their site with a smooth curved arrow (`arrow(…, { bend })`): "ADP + Pᵢ → ATP". Arrows never cross each other, and moving parts never pass over a label.
- **Clean ground.** The ground is white or tinted compartments, with no texture and no furniture. Give a scale bar, or the scale in the caption.
- **Simplify, never falsify.** Leave out detail the idea doesn't need, but every count, direction and placement that is drawn is true.
- **Both themes.** Light ships; dark uses the same hues on a dark ground. Every colour is a token.

## Biology rules (short form)

These keep a figure true. `references/biology.md` gives the reasoning, the numbers and the recipes.

- **One organism, one level of scale.** Name the organism and draw that organism. One world unit stands for one real length for the whole figure. A process that spans levels becomes a set of figures, or a main view with an inset.
- **Counts come from constants.** Legs, segments, chambers, valves, petals, protofilaments, subunits and stator units are counted in the build from named constants that also feed the readout and the caption.
- **Handedness and polarity are part of the model.** B-DNA and the α-helix are right-handed (`doubleHelix` corrects for the mirror-handed camera), DNA strands are antiparallel, synthesis runs 5′→3′ and N→C, and motors walk toward their true end. Every flow and motion has a signed direction in the model.
- **Every part in its compartment.** F1 heads face the matrix, the Calvin cycle runs in the stroma, plant cells have walls, Gram-negative envelopes have two membranes.
- **Built from real structure.** Complexes are built from their subunits in true number and symmetry, not drawn as one blob.
- **True time, shown slowed.** The model runs in real units; the readout gives the real rate and the playback speed. Motors step and dwell, and nothing jitters for effect.

## WebGL and 3D

Use a shader only for what SVG can't draw: fluorescence and bioluminescence, light falling on or through a leaf or a culture, water and its caustics in a dish, a flame on a lab bench. The shader lives in the figure's own camera, between a back and a front SVG, and never pops: `references/webgl.md` has the rules. The result must still look like the textbook figure, with the same palette and labels.

Use the 3D mode (`references/3d.md`, beta) only when a part turning in depth is the idea and the per-frame redraw in `examples/atp-synthase/live.js` isn't enough. Render its parts with the biology palette.

## References

Read these as you need them:

- `references/biology.md`: the textbook style in full, colour conventions, views and levels of scale, concepts and how textbooks draw them, true numbers, recipes for every biological form with `kit/bio.mjs`, counts, handedness, polarity and compartments, labels and arrows, biological time, anti-patterns, the biology and textbook review, and the ATP synthase design. Read it before designing.
- `references/motion.md`: live behaviour (loops, springs, tours, pointer, keyboard, accessibility, reduced motion), in vanilla JS and React.
- `references/react.md`: the React/Next.js server/client split.
- `references/verify.md`: the `capture.mjs` and `drive.mjs` commands and the review checklist.
- `references/publish.md`: sharing a finished figure in the community gallery with `scripts/publish.mjs`, only when the user asks; nothing is pushed for them.
- `references/webgl.md`, `references/3d.md`: shaders and true 3D turning, when a figure needs them.
- `references/kit.md`, `references/craft.md`, `references/walkthrough.md`: the inherited engineering kit's API and its geometry rules (painter's order, nothing passing through anything). Their look and parts vocabulary are for machines; never use them for a biology figure's appearance.
