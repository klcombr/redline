---
name: redline
description: The master skill for building exceptional websites and frontend products. Use for new sites, redesigns, landing pages, portfolios, documentation, dashboards, product UI, app shells, design systems, responsive behavior, accessibility, motion, interaction, 2D/3D, and visual audits. It enforces product truth, hierarchy-first composition, responsive and accessible UX, performance, purposeful animation, and real Three.js when 3D is requested. It integrates Motion, Anime.js v4, GSAP, and the Three.js specialist skills into one router and quality system.
version: 2.0.0
license: MIT
bundles:
  - motion
  - animejs
  - gsap-core
  - gsap-timeline
  - gsap-scrolltrigger
  - gsap-react
  - gsap-frameworks
  - gsap-plugins
  - gsap-performance
  - gsap-utils
  - threejs-fundamentals
  - threejs-geometry
  - threejs-materials
  - threejs-textures
  - threejs-lighting
  - threejs-shaders
  - threejs-loaders
  - threejs-animation
  - threejs-interaction
  - threejs-postprocessing
---

# REDLINE

Build interfaces that feel as if they could only belong to this product.

Redline is not a visual style, a component library, or a demand for maximal
effects. It is a repeatable system for understanding the product, choosing a
clear direction, building the right interaction, and removing everything that
does not earn its place.

The operating thesis is:

> **Specific > generic. Purpose > decoration. Clarity > complexity.
> Identity > template. Hierarchy > ornament.**

## 1. The brief is the contract

The user's request outranks personal taste. Never override an explicit request
because a different direction seems more fashionable.

- Asked for **3D**? Build real 3D with Three.js, not a flat imitation.
- Asked for **2D**? Stay 2D. Do not add WebGL for decoration.
- Asked for **dry, minimal, sober, or fast**? Remove decorative motion and visual noise.
- Asked for **animated**? Use motion as part of the product language, while keeping it controlled and accessible.
- Asked for a **dashboard**? Optimize for scanning, comparison, density, and task completion.
- Asked for a **landing page**? Optimize for understanding, trust, and the next action.
- Asked for a **portfolio or showcase**? Let the work lead; the interface should not compete with it.
- Asked for **documentation**? Optimize for comprehension, scanning, search, and progressive disclosure.
- Asked for a specific brand, era, material, palette, or aesthetic? Preserve it precisely.

If information is missing, do not invent product facts, customers, metrics,
testimonials, partnerships, features, or claims. Design around the truth that
is available and make missing content explicit when it matters.

## 2. Choose the surface mode

Classify the surface before designing it:

| Mode | User goal | Design priority |
|---|---|---|
| **Persuade** | Decide, understand, and act | Clear value, trust, narrative, and one strong next step |
| **Operate** | Complete a task efficiently | Scanability, predictable structure, density, states, and speed |
| **Read** | Understand and find information | Hierarchy, legibility, navigation, search, and progressive disclosure |
| **Experience** | Explore or appreciate the work | Artifact-first composition, spatial expression, and memorable interaction |

Do not apply marketing-page conventions to an editor, documentation, or dense
tool. Do not make a portfolio look like a generic SaaS dashboard.

## 3. Workflow: understand before implementation

For every visual task, follow this order:

### A. Inspect the real product

Read the relevant source, routes, components, styles, content, assets, and
project conventions before designing. In an existing product, treat the
incumbent visual language as evidence, not automatically as the correct
answer. Preserve unrelated behavior and product truth.

Look for:

- the primary user and their context;
- the main task and the next action;
- existing content and vocabulary;
- brand assets, typography, tokens, and components;
- responsive behavior and interaction states;
- loading, empty, error, disabled, and permission states;
- performance and accessibility constraints.

### B. Establish product truth

Write down, at least internally:

1. What is this product or surface?
2. Who uses it and in what situation?
3. What must the user understand in the first viewport?
4. What is the one most important action?
5. What information deserves attention first, second, and third?
6. What makes this product different?
7. What must remain true for the implementation to be useful?

### C. Shape the interface

Before writing components, decide:

- page or route structure;
- content order and information hierarchy;
- primary and secondary actions;
- layout rhythm, density, and whitespace;
- visual direction: character, typography, color, shape, and texture;
- interaction and state model;
- mobile transformation;
- motion and 2D/3D direction;
- loading, empty, error, and fallback behavior.

A good interface remains understandable when the decoration is removed.

## 4. Visual direction

Define a coherent point of view instead of collecting fashionable patterns.
Choose only the dimensions that solve a product problem.

### Character

Examples: technical, editorial, industrial, utilitarian, warm, expressive,
quiet, cinematic, playful, human, mechanical, experimental, premium, or raw.
Choose one primary character and let the details support it.

### Typography

Typography is structural, not decoration. Establish a small type system for:

- display and editorial emphasis;
- headings;
- body copy;
- labels and metadata;
- code or data when relevant.

Control line-height, measure, weight, size contrast, and letter spacing.
Choose a typeface that supports the product's voice and reading conditions.
Do not use a huge heading, an excessive font family, or all-caps text merely
to fill space.

### Color and shape

Use semantic color roles:

- background and surface;
- primary and secondary text;
- muted/supporting text;
- primary action and secondary action;
- success, warning, error, and focus;
- selection and active states.

Color must communicate hierarchy, state, interaction, or identity. Do not add
random gradients, glassmorphism, glow, floating blobs, or excessive shadows
as a substitute for composition.

Choose one coherent geometry system. Do not apply a universal radius, pill
shape, or card treatment to everything.

### Density

Choose density based on the user's task:

- spacious for presentation and storytelling;
- balanced for marketing and product explanation;
- dense for professional tools and repeated work.

Whitespace is a compositional tool, not a requirement to make every page
minimal. Dense UI still needs grouping and hierarchy.

## 5. Composition and hierarchy

Treat the page as one composition, not a stack of disconnected sections.

Use varied structures when the content calls for them:

- split layouts;
- editorial columns;
- full-width statements;
- asymmetric grids;
- product demonstrations;
- timelines and comparisons;
- tables and data views;
- interactive examples;
- dense tool interfaces;
- intentional empty space.

Avoid repeating this formula everywhere:

> eyebrow → centered heading → paragraph → three equal cards

Every viewport needs a clear order of attention. Use size, weight, position,
contrast, spacing, and alignment to create hierarchy. If everything is
emphasized, nothing is emphasized.

Prefer semantic components over card spam. A card is a meaningful grouping
pattern, not a default container. Avoid card-inside-card layouts and dozens
of tiny components that add visual noise without improving comprehension.

## 6. Interaction and state quality

Every interactive element needs the states required by its behavior:

- default;
- hover;
- focus-visible;
- active;
- selected;
- disabled;
- loading;
- success;
- error;
- empty.

Motion cannot replace state clarity. Users must always know what happened,
what is happening, and what they can do next.

For forms and actions:

- use clear labels and instructions;
- validate at an appropriate time;
- preserve user input after errors;
- identify the field and the recovery path;
- prevent duplicate submissions;
- provide useful success and empty states;
- make touch targets large enough and keyboard operation reliable.

## 7. Responsive design

Mobile is not a compressed desktop. Redesign the composition for narrow
screens instead of merely hiding columns or shrinking type.

Check:

- first viewport and primary action;
- content order and reading flow;
- typography measure and line-height;
- touch targets and hover-dependent behavior;
- tables, charts, editors, timelines, and dense data;
- navigation, drawers, dialogs, and overlays;
- 4K and ultra-wide layouts;
- safe areas and viewport units where relevant;
- no horizontal scroll caused by decorative elements.

A responsive layout is successful only when its hierarchy and task flow survive
the change.

## 8. Motion router: use the right library

Motion is a product behavior, not a decoration layer. Select the simplest
tool that expresses the requested interaction.

| Need | Default route | Load |
|---|---|---|
| Simple hover, color, opacity, or state transition | CSS | No JS library unless needed |
| React/Vue state-driven UI, gestures, layout animation, presence | **Motion** | `motion` |
| Complex choreography, timelines, interruption, reversal, SVG morphing | **GSAP** | `gsap-core`, `gsap-timeline` |
| Scroll-linked, pinned, scrubbed, or progress-driven sections | **GSAP ScrollTrigger** or Motion scroll APIs | `gsap-scrolltrigger` or `motion` |
| Lightweight DOM/CSS/SVG sequences and stagger | **Anime.js v4** | `animejs` |
| Small one-off sequences with a compact API | **Anime.js** | `animejs` |
| Real 3D scenes, WebGL, geometry, materials, interaction | **Three.js** | relevant `threejs-*` skills |
| Complex 3D animation and mixing | **Three.js AnimationMixer** | `threejs-animation` |

Rules:

1. Respect a library explicitly chosen by the user.
2. Do not add GSAP, Motion, Anime.js, and Three.js together by default.
3. Do not use Anime.js v3 APIs when Anime.js v4 is selected.
4. Do not add a JavaScript animation library for a simple CSS transition.
5. Use one animation system per interaction unless there is a concrete reason
   to combine systems.
6. Load the relevant specialist skill before writing non-trivial code.
7. Use current library documentation when APIs or versions may have changed.

### Motion

Use Motion for React/Vue declarative animation, gestures, layout transitions,
presence, scroll-linked UI, and spring-based interactions. Prefer Motion when
state and UI structure are naturally expressed as components.

Typical patterns:

- `motion` components with `initial`, `animate`, `exit`, and transitions;
- `AnimatePresence` for intentional enter/exit transitions;
- layout animation for size, position, and shared visual continuity;
- gestures with pointer, keyboard, and touch support;
- `useReducedMotion` or equivalent to honor user preferences.

### GSAP

Use GSAP when the animation needs precise timeline choreography, interruption,
reversal, SVG path work, scroll progress, pinning, scrubbing, or coordinated
motion across many elements.

Required discipline:

- register plugins once;
- scope selectors to the component or page;
- use `gsap.context()` or framework lifecycle helpers;
- revert contexts and ScrollTriggers on unmount;
- use `gsap.matchMedia()` for breakpoints and reduced motion;
- prefer transforms and opacity over layout-heavy properties;
- avoid long chained delays when a timeline expresses the sequence clearly.

### Anime.js v4

Use Anime.js v4 for compact DOM, CSS, SVG, and JavaScript-object animation,
especially stagger effects and short choreographed sequences.

Required discipline:

- import from `animejs` using v4 module syntax;
- use `animate`, `createTimeline`, and `stagger` rather than v3 `anime.timeline`;
- store the returned animation when it needs playback control;
- call `pause()` and `revert()` on teardown;
- remove event listeners and avoid orphaned animations;
- use `prefers-reduced-motion` and a static fallback.

### Three.js

Use Three.js only when the brief asks for 3D or when 3D directly communicates
the product, story, or interaction. A fake 3D card, random floating primitive,
or decorative canvas is not a 3D experience.

Route by concern:

- scene, camera, renderer, hierarchy → `threejs-fundamentals`;
- shapes and geometry → `threejs-geometry`;
- PBR and shader materials → `threejs-materials`;
- textures and environment maps → `threejs-textures`;
- lights and shadows → `threejs-lighting`;
- GLSL and custom effects → `threejs-shaders`;
- GLTF, HDR, textures, and progress → `threejs-loaders`;
- skeletal, keyframe, and morph animation → `threejs-animation`;
- raycasting, controls, and selection → `threejs-interaction`;
- bloom, depth of field, and grading → `threejs-postprocessing`.

Every WebGL experience needs:

- a deliberate camera and composition;
- a meaningful reason for the 3D;
- a loading and error state;
- a 2D fallback when WebGL fails or is unavailable;
- capped device pixel ratio;
- resize handling;
- disposal or cleanup when the scene is replaced;
- an interaction path that works with mouse, touch, and keyboard where relevant;
- a reduced-motion strategy.

## 9. Performance

Prefer the simplest implementation that produces the intended experience.

- Use CSS before JavaScript for simple transitions.
- Avoid unnecessary dependencies and duplicated animation systems.
- Prefer transforms and opacity for frequent motion.
- Keep `will-change` short-lived and intentional.
- Cap Three.js pixel ratio, reuse geometries and materials, and dispose them.
- Compress and size images and models correctly.
- Lazy-load below-the-fold media and heavy 3D assets when appropriate.
- Avoid layout thrashing and repeated DOM reads inside animation loops.
- Do not block first interaction behind decorative loading or animation.
- Measure on a mid-range mobile device, not only a desktop GPU.

Visual sophistication never justifies technical waste.

## 10. Accessibility and resilience

Treat accessibility as part of the design, not a final checklist.

- Use semantic HTML first.
- Maintain a logical heading structure and landmark structure.
- Provide visible keyboard focus.
- Ensure keyboard and touch behavior works.
- Maintain sufficient contrast.
- Label controls and errors correctly.
- Do not communicate meaning through color or animation alone.
- Respect `prefers-reduced-motion`.
- Provide a fully informative state without animation.
- Provide a fallback for no JavaScript, no WebGL, slow assets, and failed assets.
- Avoid focus traps, accidental overlays, and content hidden behind animation.

If motion is removed, the user must still understand the page and complete the
task. If 3D is removed, the user must still understand the content.

## 11. Anti-pattern removal gate

Before shipping, remove patterns that have no product-specific reason.

### Layout

- generic hero plus CTA plus mockup;
- identical centered landing-page sections;
- excessive cards or uniform card grids;
- card-inside-card layouts;
- adding components to fill whitespace;
- repetitive section structures;
- fake dashboard screenshots used instead of real product truth.

### Decoration

- random gradients;
- decorative glassmorphism;
- excessive blur and glow;
- floating blobs;
- arbitrary abstract shapes;
- fake 3D objects;
- stock-looking illustrations;
- badges, pills, and icons without meaning;
- AI-looking imagery without art direction.

### Copy and claims

- generic SaaS copy;
- meaningless statistics;
- invented testimonials or customers;
- giant headings with no structural purpose;
- claims that the product does not substantiate.

### Motion and 3D

- animation that communicates nothing;
- excessive bounce, elasticity, or looping;
- long entrances that delay interaction;
- constant floating;
- unnecessary parallax;
- 3D that decorates instead of communicates;
- motion or 3D with no reduced-motion or fallback strategy.

## 12. Verification gates

Run a bounded verification pass before declaring the work complete.

### Product and content

- No invented facts or claims.
- The primary action and user goal are obvious.
- Copy matches the product voice and actual content.
- Empty, loading, error, and success states are designed.

### Visual

- First, second, and third attention order are clear.
- Layout is coherent at desktop, mobile, and wide sizes.
- Typography and spacing form a system rather than one-off adjustments.
- The template test passes: replacing the logo and copy should make the
  interface feel wrong for this product.

### Interaction

- Hover, focus, active, disabled, loading, and error states work.
- Keyboard navigation is complete.
- Touch interactions are usable.
- No important content is blocked by overlays or motion.
- Transitions communicate state, hierarchy, orientation, or progress.

### Technical

- No console errors.
- No avoidable layout thrash.
- No unnecessary dependency or animation library.
- Animation and WebGL clean up on unmount and route changes.
- Reduced motion and fallback states work.
- The final build or relevant checks pass.

## Final operating rule

Shape before code. Choose composition before decoration. Use the right
specialist skill for the right layer. Add only what the product needs, then
remove what does not.

When the user asks for something ambitious, deliver it for real. When the user
asks for something quiet, make the quietness precise. In every case:

> **Make it specific, make it usable, make it fast, and make it unmistakably
> this product.**
