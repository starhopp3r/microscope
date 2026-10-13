# Biology

How to make figures of living things that look like a good textbook's and that a biologist would sign off on: molecules, cells, microbes, plants and animals, and the techniques used to study them. The look is the textbook illustration (Campbell Biology, Alberts' Molecular Biology of the Cell, Raven, OpenStax); the truth is the primary literature.

## Contents
1. Draw it like a textbook
2. Pick the level and the view
3. Concepts and how textbooks draw them
4. True numbers
5. Drawing living forms with `kit/bio.mjs`
6. Getting it right: counts, handedness, polarity, compartments
7. Colour conventions
8. Labels, arrows and the figure frame
9. Time and motion in living systems
10. Anti-patterns
11. Biology and textbook review
12. Design: ATP synthase

## 1. Draw it like a textbook

A good textbook figure does four things at once:

- **It shows the real structure.** The parts are the right shape, in the right number, in the right place.
- **It simplifies.** It leaves out what the idea doesn't need, and nothing it keeps is false.
- **It names.** Labels with thin leaders name every part the text talks about, and compartment names say where we are.
- **It explains.** Arrows show what flows and what moves, and the reaction is written where it happens.

The visual language is consistent across good textbooks:

- **Soft, rounded bodies with gradient shading.** Light comes from the upper left, with a highlight and a shadowed lower edge. Proteins look like smooth clay models of their subunits; cells and organelles like soft balloons cut open.
- **Colour by structure.** One colour per kind of thing, kept constant: the membrane's orange heads and pale tails, chlorophyll green, DNA bases in four colours, red protons. Outlines are a darker shade of the body's own colour.
- **Membranes as bilayers.** Two rows of round heads with wavy tails between them, at the molecular scale. At the cell scale, a double line with the bilayer's colours.
- **Tinted compartments** on a white ground, with the main ones named in spaced capitals.
- **A gentle 3D view.** Usually a side view with a little of the top showing, or a cutaway block. Never a technical isometric with hard facets.

Microscope adds what a printed textbook can't: the figure moves on a true model, and the numbers in its readout are real.

**Never make it look engineered.** The kit inherited from Anatomy draws machines: base plates, posts, screws, rulers, label plates, knurls, four-tone faceted shading, black hairlines, monochrome. None of it belongs in a biology figure. Don't mount a specimen on a stand, don't print a ruler on a plate, and don't render proteins as turned metal.

## 2. Pick the level and the view

Choose one level of scale per figure and say it with a scale bar or in the caption. One world unit stands for one fixed real length, chosen per figure:

| Level | Typical subject | 1 world unit ≈ | Textbook view |
|---|---|---|---|
| Molecular | DNA, an enzyme active site, a channel | 0.05–0.1 nm | Ribbon or space-filling cartoon, a helix lying across the page |
| Macromolecular machine | ribosome, ATP synthase, flagellar motor, kinesin | 0.1 nm | Side view in a membrane strip, compartments above and below |
| Organelle and microbe | mitochondrion, chloroplast, bacterium, virus | 5–20 nm | Cut open lengthwise to show the inside, with an inset to the molecular level |
| Cell and tissue | neuron, guard cells, leaf section, sarcomere | 0.1–1 µm | Cross-section or a cutaway block with its layers on the cut faces |
| Organ and organism | heart, flower, insect, fish gill | 10 µm–1 mm | Cut open to show the inside, or a whole organism with an enlarged inset |
| Technique | PCR, gel electrophoresis, centrifugation | varies | The process in steps, with the instrument simplified to what matters |

Never mix levels in one drawing. When the idea spans levels, use the textbook device: a main view plus an inset joined to it by a thin outlined callout (a box on the main view, lines to the enlarged inset), each at its own scale.

Put compartments where textbooks put them: the intermembrane space above and the matrix below for the inner mitochondrial membrane, the stroma below the thylakoid, the outside of a cell above its plasma membrane, the lumen inside. Then choose a gentle camera: elevation 10–25°, with the long axis across the screen.

## 3. Concepts and how textbooks draw them

| Concept | How to draw it | What moves |
|---|---|---|
| Oxidative phosphorylation, chemiosmosis | ATP synthase in a bilayer strip, intermembrane space above and matrix below; red H⁺ arrows through the stator | The c-ring and central stalk turn; one ATP leaves the head every 120° |
| Electron transport chain | Complexes I–IV as coloured blobs in the bilayer, ubiquinone and cytochrome c as small carriers, e⁻ path arrows, H⁺ pumped up | Electrons hop along; H⁺ cross at I, III and IV |
| Bacterial motility, chemotaxis | A rod-shaped cell with peritrichous flagella; an inset of the motor in the envelope | Counter-clockwise rotation, viewed from outside the cell, bundles the flagella into a run; clockwise unbundles them into a tumble |
| Translation | Ribosome subunits on mRNA, tRNAs with anticodons in the E, P and A sites, a growing chain | tRNAs move A → P → E, one codon per step |
| DNA structure | A double helix with coloured base pairs, sugar-phosphate backbones, 5′ and 3′ ends marked, major and minor grooves | Optional unwinding |
| DNA replication | A fork with helicase, topoisomerase, SSBs, primase, sliding clamps, polymerases, and the leading and lagging strands with Okazaki fragments | The fork advances; the lagging strand loops |
| Transcription | RNA polymerase on DNA with an open bubble and the RNA leaving | The bubble travels |
| Gene editing | Cas9 with its guide RNA on DNA, PAM highlighted | The guide pairs, then both strands are cut |
| Action potential | Axon with myelin and nodes; voltage-gated Na⁺ and K⁺ channels in a bilayer inset; a voltage trace | Channels open node by node |
| Synaptic transmission | Synaptic knob with vesicles, the cleft, receptors on the postsynaptic membrane | Vesicles fuse; neurotransmitter crosses |
| Muscle contraction | Sarcomere with Z-discs, thin actin and thick myosin filaments with heads | Filaments slide; the I band and H zone shorten |
| Cargo transport | Microtubule of 13 protofilaments with kinesin carrying a vesicle | Hand-over-hand 8 nm steps to the plus end |
| Photosynthesis | Chloroplast cut open (envelope, grana, stroma) plus a thylakoid membrane inset with photosystems | Light → e⁻ flow, H⁺ into the lumen, ATP synthase |
| Gas exchange in a leaf | Leaf cross-section block with stomata | Guard cells swell; the pore opens; CO₂, O₂ and H₂O arrows |
| Transpiration | Plant outline with roots, stem and leaf, plus xylem insets | Water rises; vapour leaves the stomata |
| Mitosis | Cells in each phase with chromosomes, spindle and centrosomes | Chromatids separate |
| Viral entry | Virion with spikes docking to receptors on a bilayer | Fusion, then release of the genome |
| Gram staining | Two envelope cross-sections side by side, Gram-positive and Gram-negative | Crystal violet stays in the thick wall (iodine fixes it) and alcohol washes it out of the thin one |
| Countercurrent exchange | Gill filament with lamellae, flows in opposite directions, an O₂ gradient shaded along the lamella | Water and blood move |
| Heart cycle | A heart cut open in the frontal plane with chambers, valves and vessels; blue and red blood | Valves open and close; chambers contract in order |
| PCR | Strands in three steps with the temperatures | Denature, anneal, extend; copies double |
| Gel electrophoresis | Gel tank with wells and bands, − at the wells, + at the far end | Bands migrate by size |

## 4. True numbers

Collect the numbers before any geometry, for the organism you are drawing. These are typical values to start from and to sanity-check against; they vary between species, cell types and conditions. Check each one you use against a primary source (the structure's PDB entry, a review, a textbook, the BioNumbers database), and keep the list as data in the model module, for example `SOURCES = [{ value: "c-ring 8", source: "Watt et al. 2010, PNAS" }]`. The caption cites them.

**Molecules and machines**

| Thing | Typical numbers |
|---|---|
| B-DNA | Right-handed, about 2.0 nm wide, 0.34 nm rise per base pair, about 10.5 bp per turn (pitch about 3.4–3.6 nm), strands antiparallel, major and minor grooves about 2.2 and 1.2 nm wide measured backbone to backbone along the axis |
| α-helix | Right-handed, 3.6 residues per turn, 0.15 nm rise per residue (0.54 nm pitch) |
| Lipid bilayer | About 4–5 nm thick, of which about 3 nm is the hydrophobic core |
| Microtubule | 25 nm outer and about 15 nm inner diameter, 13 protofilaments in most cells, αβ-tubulin dimers 8 nm long, β-tubulin exposed at the plus end |
| Actin filament | About 7 nm wide, two strands twisting with a crossover about every 36 nm |
| Kinesin-1 | 8 nm per step and one ATP per step, about 0.8 µm/s (about 100 steps per second), stalls near 6 pN, walks toward the plus end (dynein walks toward the minus end) |
| ATP synthase | F1 is α3β3 with the central stalk γ, δ, ε (mitochondrial names; the bacterial δ is the mitochondrial OSCP), the head about 10–11 nm across; c-ring of 8 subunits in vertebrate (probably all animal) mitochondria, 10 in yeast and E. coli, more in some bacteria and chloroplasts; three ATP per full turn; 120° steps, which in ATP-driven rotation of isolated F1 split into about 80° and 40° substeps; the mitochondrial peripheral stalk is one b-subunit with d, F6 and OSCP (bacteria have two b) |
| Flagellar motor (E. coli) | Rotor about 45 nm across, up to about 11 proton-driven stator units, around 100–300 revolutions per second; filament about 20 nm thick and 5–10 µm long, of 11 flagellin protofilaments; runs about 1 s, tumbles about 0.1 s, swimming about 20–30 µm/s |
| Ribosome | Bacterial 70S (50S + 30S) about 20–25 nm across; eukaryotic 80S (60S + 40S) about 25–30 nm; A, P and E sites; elongation about 10–20 amino acids per second in bacteria and about 5 in eukaryotes; mRNA read 5′→3′, protein made N→C |
| DNA replication | E. coli Pol III about 1,000 nt/s; Okazaki fragments 1,000–2,000 nt in bacteria and 100–200 nt in eukaryotes; polymerases add only at a 3′ end |
| Transcription | E. coli RNA polymerase about 40–80 nt/s; transcription bubble about 13 bp |
| Cas9 (S. pyogenes) | 20-nt guide; NGG PAM just 3′ of the target on the non-target strand; blunt cut 3 bp upstream of the PAM |
| Na⁺/K⁺ pump | 3 Na⁺ out and 2 K⁺ in per ATP |
| Haemoglobin | α2β2 tetramer, 4 haems, 4 O₂; adult P50 about 26–27 mmHg, Hill coefficient about 2.8 |
| Nuclear pore complex | About 100–120 nm across in vertebrates, eightfold symmetric; free diffusion up to about 40 kDa |
| Synapse | Cleft about 20 nm wide; synaptic vesicles about 40 nm across |

**Cells and microbes**

| Thing | Typical numbers |
|---|---|
| E. coli | Rod about 2 µm long and 1 µm wide (about 1 fL); doubles in about 20 min in rich medium; one circular chromosome of 4.6 Mbp |
| Gram-positive envelope | One membrane under a thick peptidoglycan wall (about 20–80 nm) threaded with teichoic acids |
| Gram-negative envelope | Inner membrane, periplasm with a thin peptidoglycan layer (a few nm), outer membrane with lipopolysaccharide outside |
| Budding yeast | About 5 µm across; buds grow from the mother cell |
| Virions | HIV about 120 nm; SARS-CoV-2 about 100 nm with spikes about 20 nm long; T4 phage: elongated (prolate) icosahedral head about 120 × 86 nm, contractile tail sheath, hexagonal baseplate, six long and six short tail fibres |
| Animal and plant cells | Animal cells about 10–20 µm with a nucleus about 5–10 µm; plant cells about 10–100 µm with a cell wall and a central vacuole that can fill most of the cell |
| Mitochondrion | About 0.5–1 µm wide and one to several µm long; the inner membrane folds into cristae; F1 heads face the matrix |
| Chloroplast | About 5–10 µm long; grana are stacks of about 5–20 thylakoid discs, about 0.3–0.6 µm across, joined by stroma lamellae |
| Red blood cell | Biconcave disc about 7.8 µm across, about 2.5–2.6 µm thick at the rim and about 0.8–1 µm at the centre; no nucleus in mammals |
| Neuron | Resting about −70 mV, threshold about −55 mV, peak about +30 to +40 mV, spike about 1–2 ms; conduction about 0.5–2 m/s unmyelinated and up to about 120 m/s myelinated; nodes of Ranvier about 1 µm long and 0.2–2 mm apart |
| Sarcomere | About 2.0–2.5 µm at rest, Z-disc to Z-disc; thick filaments about 1.6 µm long |
| Mitosis | Prophase, prometaphase, metaphase, anaphase, telophase, then cytokinesis; 46 chromosomes in a human somatic cell |

**Plants**

| Thing | What is true |
|---|---|
| Eudicot leaf, top to bottom | Cuticle, upper epidermis, palisade mesophyll (one or two layers of column cells), spongy mesophyll with air spaces, lower epidermis with most of the stomata. In a vein, xylem lies toward the upper side and phloem toward the lower, inside a bundle sheath |
| Stomata | Two guard cells around a pore: kidney-shaped in eudicots, dumbbell-shaped with subsidiary cells in grasses. They open when K⁺ and water enter, the guard cells swell, and radial cellulose bands make them bow apart |
| Eudicots and monocots | Floral parts in fours or fives against threes; net against parallel veins; vascular bundles in a ring against scattered; two cotyledons against one; a taproot against fibrous roots |
| Flower, outside to inside | Sepals, petals, stamens (filament and anther), carpels (stigma, style, ovary with ovules) |
| Xylem and phloem | Xylem vessels and tracheids are dead and lignified when mature and carry water up under tension; phloem sieve tubes are living, with companion cells, and carry sugar from source to sink |
| Root | Root cap, meristem, elongation zone, then the maturation zone with root hairs; the endodermis carries the Casparian strip |

**Animals**

| Thing | What is true |
|---|---|
| Insects | Head, thorax (three segments), abdomen; three pairs of legs, one pair per thoracic segment; wings, usually two pairs, on the second and third thoracic segments (flies have halteres in place of hind wings); one pair of antennae; compound eyes, usually with three ocelli; leg segments coxa, trochanter, femur, tibia, tarsus with claws |
| Spiders | Two body parts (prosoma and opisthosoma, joined by a narrow pedicel); four pairs of legs on the prosoma; chelicerae and pedipalps; usually eight eyes; no antennae; spinnerets at the rear |
| Bony fish gills | Four gill arches on each side under the operculum; each arch carries two rows of filaments, and each filament many thin lamellae where blood runs opposite to the water |
| Hearts | Fish two chambers; amphibians three; most reptiles three with a partial septum; crocodilians, birds and mammals four. Mammalian valves: tricuspid, pulmonary, mitral and aortic; the left ventricle wall is much thicker than the right |
| Body plans | Most animals are bilaterally symmetric; cnidarians are radially symmetric, and adult echinoderms are five-way symmetric |

**Instruments**

| Thing | What is true |
|---|---|
| Compound light microscope | Eyepiece usually 10×; objectives commonly 4×, 10×, 40× and 100× (oil); total magnification is the product; resolution limit about 200 nm (d = λ / 2NA); revolving nosepiece, stage with clips and vernier, coarse and fine focus, condenser with iris diaphragm, illuminator |
| PCR | Denature at about 94–98 °C, anneal at about 50–65 °C, extend at 72 °C (Taq makes about 1 kb per minute); ideally the copy count doubles each cycle |
| Agarose gel | DNA is negatively charged and runs toward the anode (red, +); small fragments run faster; gels of about 0.7–2% agarose |
| Centrifuge | RCF = 1.118 × 10⁻⁵ × r (cm) × rpm² |


## 5. Drawing living forms with `kit/bio.mjs`

Everything is drawn in the figure's 3D camera (`fitProjection`, `iso`, `depthOf` from `kit/iso-kit.mjs`) and rendered with the soft bodies in `kit/bio.mjs`. Give every body a depth (the `depthOf` of its centre) and paint them back to front with `sortedSvg`.

**Bodies.**
- `sphere` for ions, small molecules, globular domains, vesicles and cocci.
- `ellipsoid` (upright) for subunits, organelles, nuclei, yeast cells and lobes. Lie it down by building it in the figure's frame, or approximate with a few overlapping ellipsoids.
- `capsule` (upright) for rod-shaped parts: c subunits, a central stalk, helices drawn as cylinders, rod-shaped bacteria standing up.
- A protein is several bodies, one per subunit or domain, in their true number and symmetry: a ring of 8 capsules, an alternating hexamer of α and β ellipsoids. Build one and place it `n` times around the axis, at angles `2π / n`.

**Strands and tubes.** `rope(P, points, r, swatch)` draws a smooth tube with an edge, a body and a highlight. Use it for mRNA, polypeptides, flagella, stalks, filaments, axons, hyphae, vessels and root hairs. Split a long rope into back and front runs where it wraps something.

**DNA.** `doubleHelix(P, from, to, { radius, rise, perTurn, groove, sequence })` draws B-DNA with coloured base pairs:
- It defaults to 10.5 bp per turn, and `groove` (the angle between the strands, about 140°) sets the minor and major grooves.
- It returns depth items: back runs, then base pairs, then front runs.
- The kit's camera is mirror-handed (seen from above, +x to +y looks clockwise), so `doubleHelix` flips its sense so that `hand: "right"` looks right-handed on screen. Check it: on a helix lying across the page, the strand nearest the viewer slopes down to the right.

**Membranes.**
- `bilayer(P, box)` draws a membrane strip: heads in staggered rows on its top surface, and on each visible cut face two rows of heads with wavy tails meeting at the midplane. Use it at the molecular and machine levels, about 4–5 nm thick. `skip([x, y])` leaves out top heads where a protein stands.
- At the cell and organelle level, `membraneLoop(P, points)` draws a membrane in section as a band in the bilayer's colours. Draw two loops for an envelope (the inner and outer mitochondrial membranes, a Gram-negative envelope, the nuclear envelope).
- A transmembrane protein is drawn in front of the bilayer strip at the same height, which reads as embedded, or in a gap in the heads made with `skip`.

**Cells and tissue.** A cell is a soft outline (`membraneLoop`, plus a `wall` band for plants) filled with the cytosol tint, with organelles drawn as cut-open bodies inside. Tissue is cells side by side with real air spaces where there are any. Cut faces of a block show the layers in their own tint.

**Arrows and reactions.**
- `arrow(points, { flow: true })` draws a flow along its real path: H⁺ through a channel, e⁻ along a chain, water up a vessel.
- `arrow(points)` draws a dark motion arrow; `arcPoints` gives a rotation arc around an axis.
- Write a reaction as text with a curved arrow beside the site, never inside a body.

**Shapes that merge.** Fusion, budding and division change topology. Draw them from one distance field per pair, rendered with the swatch's gradient, so the two bodies run together without a seam.

## 6. Getting it right: counts, handedness, polarity, compartments

Most errors a biologist finds are not about how the figure looks. They are about these four things, and each one can be checked.

- **Counts.** Legs, segments, wings, gill arches, chambers, valves, petals, protofilaments, subunits, stator units, cristae and grana are all counted in the build, from named constants, and the same constants feed the readout and caption. An insect with eight legs or a microtubule with 12 protofilaments is a wrong figure, however well shaded.
- **Handedness.** B-DNA and the α-helix are right-handed. Build helices from an explicit handedness (`doubleHelix` does), and check it in a close-up: a right-handed helix turns clockwise as it runs away from the viewer. The kit's camera is mirror-handed: seen from above, a turn from +x toward +y looks clockwise on screen. So a helix that is right-handed in ordinary world maths is drawn left-handed, and a rotation that should look anticlockwise from above must run from +y toward +x (a decreasing angle). Check every helix and rotation on screen, never in the maths alone.
- **Polarity and direction.** DNA strands are antiparallel; polymerases add only at the 3′ end; mRNA is read 5′→3′ and protein made N→C; microtubules have plus and minus ends, kinesin walks to plus and dynein to minus; DNA runs to the anode in a gel; protons in a mitochondrion flow from the intermembrane space into the matrix through ATP synthase. Put every direction into the model as a signed quantity and drive the motion from it.
- **Compartments.** Every part sits in the compartment where it really lives: F1 heads in the matrix, the Calvin cycle in the stroma, cytoplasmic ribosomes free in the cytosol or on the rough ER, never translating in the nucleus (though their subunits are built in the nucleolus), and the smaller ribosomes of mitochondria and chloroplasts in the matrix and stroma; a plant cell has a wall and an animal cell does not; a Gram-negative envelope has two membranes. When in doubt, tint the compartments and name them.
- **Taxon.** State the organism, and draw that organism: an E. coli motor, a bovine ATP synthase, a eudicot leaf, a honeybee, a zebrafish. Mixing features from different taxa (a monocot flower with a eudicot leaf, a mammal heart with a fish's chambers) is a common error.


## 7. Colour conventions

Every colour is a swatch in `SWATCHES` (base, highlight, shadow and edge), rendered as a gradient and an outline. Never type a colour into a figure. Keep one colour per kind of structure across a set of figures, and follow the conventions readers already know:

| Structure | Colour |
|---|---|
| Membrane heads and tails | Orange heads, pale cream tails |
| Cytosol, matrix, stroma, lumen, extracellular space | Pale tints, each different: blue-grey, lilac, pale green, cream |
| Chlorophyll, chloroplasts, photosystems | Green |
| Mitochondria (cell scale) | Warm orange-pink with paler cristae |
| Nucleus and chromatin | Lilac or purple |
| DNA backbone and bases | Blue backbone; A, T, G and C in four distinct colours, with the key in the caption or a label |
| RNA | Orange or red backbone |
| Protons | Red spheres marked H⁺ |
| Electrons | Small dark or yellow dots marked e⁻ |
| ATP and ADP | Green and pale green |
| Oxygenated and deoxygenated blood | Red and blue |
| Plant cell wall | Yellow-green |
| Stains and tags | The colour the stain really gives: Gram purple and pink, H&E pink and purple, GFP green |
| Subunits of one complex | Distinct hues for distinct roles (rotor, stator, catalytic), and two shades of one hue for related subunits (α pale, β dark) |

Text is dark grey, leaders mid grey, compartment names in a lighter grey, and flow arrows in the flow red unless the flowing thing has its own colour. In the dark theme the hues stay; the ground, text and tints change.

## 8. Labels, arrows and the figure frame

Labels and arrows are where a figure most often looks broken, and where a textbook's craft shows most. Follow these rules exactly, then prove them with `scripts/labels.mjs`.

**Labels**
- **Columns.** Set labels in two aligned columns, left and right of the drawing (`label(text, anchor, { side, x })` with one `x` per column). The text is short and in sentence case: a name, and the role if it helps ("Stator: a subunit"). Wrap a long name with `\n`. Keep every label inside the figure.
- **Leaders are horizontal, or one 45° elbow then horizontal.** Never a diagonal at an arbitrary angle, never a curve, never more than one bend. Put the label at the height of its anchor so the leader is a straight horizontal line. Where that would cross something, use `drop` for a single 45° elbow into clear space (as the stator's leader does, up into the intermembrane space).
- **Anchor on a visible edge.** The leader ends in a dot on the part's visible silhouette, on the side facing the label column: the leftmost point of the ring for a left label, the right edge of the stalk for a right label. Never anchor on a part hidden behind another, on an arrow, or in empty space.
- **Nothing crosses.** A leader never crosses another leader, an arrow, an arrowhead or another label's text. It may pass over the drawing on its way to its part (over a bilayer, say), and its halo keeps it clean there. Plan the label heights before drawing: sort each column by anchor height, and space the labels at least two lines apart.
- **Compartments** are named with `region("MITOCHONDRIAL MATRIX", x, y)` in a corner of their tint, not with leaders.

**Arrows**
- **Flow arrows** (`arrow(points, { flow: true })`) follow the real path of the thing that flows, start in the compartment it comes from and end where it ends up. They never end on or inside a part the thing doesn't enter, and they stop short of other arrows.
- **Motion arrows** are dark. A rotation arrow wraps its axis: `rotationArrow` splits it into a back arc, drawn among the depth-sorted parts so the axis hides it, and a front arc with the head, drawn over everything. Run it in the direction the model turns, and check that direction on screen.
- **Reaction arrows** are one smooth curve between the reactants and the products, written beside the site: `arrow([from, to], { bend })`, a quadratic curve whose head follows the curve's tangent. Never a spline through three points; it kinks.
- **No crossings.** Arrows never cross each other or a label. Move one, shorten one, or move the rotation arrow along its axis until they are clear.
- **Moving parts keep clear too.** A proton, an ATP or a vesicle that moves never passes over a label's text or a leader it isn't anchored to. Route it into clear space and fade it before it gets there.

**Prove it.** Run the check on both themes, at rest and in motion. Both must end `labels: 0 problems`:
```sh
node scripts/labels.mjs page-light.html --reduced
node scripts/labels.mjs page-light.html --drive --frames 30 --every 250
```
Then look at 3× close-ups of every leader end, every arrowhead and every place an arrow passes a part.

**The frame.** The figure number and a one-line title go above, and the live readout and the interaction hint below, in the page's sans-serif. The caption goes under the card: what it shows, the organism, the scale, the real rate and the playback speed, and the sources.

## 9. Time and motion in living systems

Biology runs at speeds a reader can't follow: ATP synthase turns about a hundred times a second, a flagellum faster, and mitosis takes an hour. The motion must be slow enough to follow, and the numbers must stay true.

- **Show the playback rate.** Drive the motion at a chosen time scale and put it in the readout next to the real rate: `120 rev/s · shown 1/400×`, `mitosis 60 min · shown 600×`. The model runs in real time units; only the clock is scaled.
- **Molecular motion is stepwise.** Motors step and dwell: kinesin moves 8 nm at a time, ATP synthase turns in 120° steps with substeps. Model the dwell and the step, and ease each step with a short spring. A smooth, uniform spin looks mechanical in the wrong way.
- **Thermal motion is not noise.** If the idea needs Brownian motion (diffusion, binding), drive it from a seeded random walk in the model, so every run looks the same and the readout matches. Otherwise leave it out. Never jitter parts for effect.
- **The idle tour shows the mechanism once through,** then rests: one ATP cycle, one run and tumble, one codon, one stoma opening and closing.
- **Reduced motion** shows one telling still pose, such as the motor mid-step or the stoma half open.


## 10. Anti-patterns

- **Engineering look.** Base plates, posts, feet, screws, rulers, label plates, knurls, bevels, hard faceted shading, black hairline outlines, monochrome. The figure must read as biology at a glance.
- **Clip-art.** Organelles floating at random in a flat oval, a ribosome as a snowman, a membrane as one line. Simplify the real structure; don't replace it with a symbol.
- **Unlabelled or over-labelled.** No names at all, or every atom named. Label what the idea needs.
- **Broken-looking labels and arrows.** Leaders at random angles, leaders that end on nothing or on a hidden part, leaders or arrows that cross, a rotation arrow drawn over its own axis all the way round, a reaction arrow with a kink, moving parts sliding over labels. Section 8 has the rules; `scripts/labels.mjs` catches every one.
- **Arbitrary colour.** A new colour scheme in every figure, or colours that fight the conventions in section 7.
- **Wrong counts.** Six-legged spiders, eight-legged insects, a 12-protofilament microtubule, a three-subunit F1 head, five petals on a lily. Count from constants.
- **Wrong handedness or polarity.** A left-handed DNA helix, parallel strands, a polymerase moving the wrong way, a motor walking to the wrong end.
- **Scale soup.** A ribosome the size of a mitochondrion, or a virus the size of a bacterium. One level per figure; insets for the rest.
- **Blobby complexes.** A single lumpy shape for a multi-subunit complex. Build it from its subunits in their true number and symmetry.
- **Uniform spinning and jitter.** See section 9.

## 11. Biology and textbook review

Before you call it done, check the science and the look, and write the result down.

**Biology**
1. **Name it.** Would a biologist name the structure and the organism at a glance?
2. **Count it.** List every counted feature, the count drawn and the true count. They match.
3. **Orient it.** Handedness (on screen), polarity, and the direction of every flow and motion match the model and the literature.
4. **Place it.** Every part sits in its real compartment, and compartments are where textbooks put them.
5. **Scale it.** Sizes are within the published range, and the scale is stated.
6. **Source it.** Every number in the readout and caption is in `SOURCES`, and the caption cites them.
7. **Time it.** The readout shows the real rate and the playback speed.

**Textbook look**
1. Put it beside a textbook figure of the same subject. Does it belong on that page? Is there nothing engineered about it?
2. Are the bodies soft and shaded, the outlines in the body's own darker colour, the membranes bilayers and the compartments tinted?
3. Are the colours from the palette, conventional, and consistent with the set?
4. Is every label legible at 1× and on a phone, in a column outside the drawing, with a horizontal or single-elbow leader that ends on a visible edge of its part and crosses nothing? `scripts/labels.mjs` ends `labels: 0 problems` at rest and over 30 frames of motion.
5. Do the arrows follow real paths, point the right way, stop where the thing stops, cross nothing, and does every rotation arrow pass behind its axis?
6. At 3×, are there no ragged edges, gaps between parts that should touch, or overlaps drawn in the wrong order?

## 12. Design: ATP synthase

The reference, built in `examples/atp-synthase/`.

**Truth.**
- **Stoichiometry:** bovine mitochondrial ATP synthase has a c-ring of 8 (Watt et al. 2010, PNAS 107:16823). That gives 8 protons and 3 ATP per turn, about 2.7 protons per ATP.
- **Head:** the F1 head, α3β3, is about 11 nm across and faces the matrix (Abrahams et al. 1994, Nature 370:621).
- **Steps:** γ turns in 120° steps (Yasuda et al. 1998, Cell 93:1117).
- **Peripheral stalk:** one b subunit with d, F6 and OSCP (Rees et al. 2009, PNAS 106:21597).
- **Proton path:** protons enter from the intermembrane space through one a-subunit half-channel, ride the ring almost a full turn, and leave into the matrix through the other (Kühlbrandt 2019, Annu Rev Biochem 88:515).
- **Direction:** synthesis turns the rotor anticlockwise seen from F1, the opposite of hydrolysis (Noji et al. 1997; Diez et al. 2004).
- **The model:** `model.mjs` holds the counts, the rate (about 100 turns per second) and `SOURCES`.

**View.** A strip of inner membrane drawn as a bilayer, seen from the side at 16° elevation, with 1 nm = 10 units:
- The intermembrane space is tinted blue above, the matrix lilac below.
- The protein stands in front of the strip at membrane height, with the head hanging into the matrix.

**Parts.**
- **Rotor:** 8 teal capsules on a 2 nm circle, plus an orange δ/ε foot and a yellow γ stalk.
- **Stator:** a blue a-subunit beside the ring.
- **Head:** 6 ellipsoids alternating pale α and dark β.
- **Peripheral stalk:** a blue rope from the a-subunit down the side of the head to the OSCP cap.
- **Ions and products:** red H⁺ spheres, queued in the intermembrane space and riding the ring's binding sites, and green ATP leaving a β subunit.

**Labels and arrows.**
- **Labels:** "Rotor: ring of 8 c subunits", "Stator: a subunit", "H⁺ flows down its gradient", "Inner mitochondrial membrane", "Central stalk (γ, rotates)", "Catalytic head (α₃β₃)", "Peripheral stalk (stator)" and "OSCP", plus the two compartment names.
- **Arrows:** red flow arrows go into the stator from above and out into the matrix, and a dark rotation arc circles the stalk. "ADP + Pᵢ → ATP" sits beside the head.

**Motion.** The rotor steps 45° per proton and dwells, eased by a spring:
- One proton leaves the queue into the stator per step, and one leaves the ring into the matrix.
- One ATP leaves a β subunit every 120°.
- The readout reads like `24 H⁺ · 1080° · 9 ATP · 750× slower`.
- Hover drives it faster, → steps one proton and space pauses; reduced motion holds still.
