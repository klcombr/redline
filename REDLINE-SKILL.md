---
name: redline
description: The definitive skill for building websites with any agent. Use when designing, redesigning, shaping, critiquing, auditing, or polishing any website, landing page, dashboard, product UI, app shell, or complete design system. Enforces product-truth discipline (never invent facts), hierarchy-first composition, structural typography, deliberate spacing, anti-pattern avoidance (card spam, decorative glassmorphism, random gradients, meaningless statistics, generic SaaS copy), but ALWAYS follows the user's brief: asked for 3D → deliver real 3D (Three.js pack); asked 2D → only 2D; asked dry → dry; asked animated → animate everything with GSAP (page transitions, reveals, scroll choreography). Bundles the official GSAP pack (8 skills) and Three.js pack (10 skills). Not for backend-only or non-visual tasks.
version: 1.2.0
license: MIT
bundles:
  # Motion — GSAP pack
  - gsap-core
  - gsap-timeline
  - gsap-scrolltrigger
  - gsap-react
  - gsap-frameworks
  - gsap-plugins
  - gsap-performance
  - gsap-utils
  # 3D — Three.js pack
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

> The design discipline that makes interfaces feel intentional, product-specific,
> coherent, and human-designed — whether written by a human or an agent.
>
> **The thesis: every interface should feel like it could only belong to its product.**

Not a style. Not a trend. Not "modern". It is a discipline: a set of standards
and gates you run every interface through, from the first sketch to the last
pixel — including motion (GSAP pack) and three dimensions (Three.js pack).

---

## When to apply

Use Redline for any website-building task:

- new websites, landing pages, portfolios, documentation sites
- redesigns, audits, critiques, polish passes
- dashboards, tools, product UI, app shells
- design systems, component libraries, token sets
- anything the user wants to feel intentional rather than generated

Redline is not for: backend-only logic, data pipelines, or non-visual tasks
(apply it only where a human will look at the result).

## How Redline works

You are not asked to be "creative" or "modern". You are asked to answer one
question, in the order below, at every decision point:

> Does this belong to this product — or to the last template it saw?

If you cannot name the product-specific reason for a visual decision, do not
ship that decision. The core comparison:

**Specific > trendy. Purpose > decoration. Clarity > complexity.
Identity > template. Hierarchy > ornament.**

---

# PART 0 — THE BRIEF IS THE LAW

The user's brief decides the direction. The discipline polishes the execution
— it never overrides the request.

- **Asked for 3D?** Deliver real 3D. Set up a Three.js scene (fundamentals),
  build geometry, light it, animate it, load the assets, make it interactive,
  polish with post-processing. Do not quietly fall back to a flat mockup.
- **Asked for 2D?** Stay 2D. No gratuitous WebGL. A clean composition, type,
  and hierarchy beat a pointless canvas.
- **Asked for dry / minimal / sober?** Dry is dry: no entrance animations, no
  parallax, no decorative loops. Sharp, quiet, fast.
- **Asked for animated?** Animate everything that can carry meaning: page
  transitions between HTML pages, hero reveals, scroll reveals, marquees,
  parallax, scrubbed sections — GSAP pack, done right (below).
- **Asked for anything else?** Same rule: the direction is theirs. Your job is
  to make it exceptional, coherent, and free of generic-AI tells.

Direction is a decision. Execution is a discipline. Never confuse the two.

## Think two steps ahead

Before you finish any piece of work, ask what happens next:

- The user hovers it → states.
- The user tabs to it → visible focus.
- The user waits for it → loading state.
- The data is missing → honest fallback, not decoration.
- The screen is 390px or 4K → responsive behavior was designed, not shrunken.
- The user has reduced motion → animation must have a documented stop.
- The 3D scene fails to load or WebGL is unavailable → a designed fallback.
- The animation runs on a mid-range phone → 60fps or it ships without it.
- The same section appears on the next page → reuse the component, keep the system.

If a future action breaks, looks broken, or has no answer, fix it before
calling the task done. Deliver the site, then check what the user will do
first with it the moment it is live.

---

# PART I — KNOW THE PRODUCT

Before any visual decision, establish the minimum necessary product truth:

1. What is the product?
2. Who is using it?
3. What is the primary user goal?
4. What action matters most?
5. What information needs the most attention?
6. What makes this product different?
7. What constraints exist?

**Never invent product facts.** Never invent:

- statistics, customers, testimonials, reviews, partnerships
- features, capabilities, claims, product metrics

If information is missing, design around what is actually known.
Do not compensate for missing content by adding decorative UI.

Design from the product, the user, the task, the content, the brand, the
environment, the interaction — not from a collection of fashionable patterns.

# PART II — SHAPE BEFORE CODE

Do not start writing components. First establish the interface shape:

- primary action
- information hierarchy
- page structure
- visual rhythm
- interaction model
- responsive behavior

Ask: *what should the user notice first, second, and third?* Then design around
that order. A good interface still makes sense if most decorative styling is removed.

## Visual direction — define only what is necessary

- **Character** — pick one coherent direction (technical, editorial, playful,
  industrial, utilitarian, warm, expressive, quiet, dense, cinematic, mechanical,
  human, experimental). Do not combine adjectives randomly.
- **Typography** — based on product personality, readability, hierarchy,
  language, density, available weights. Not the same popular stack everywhere.
- **Color** — semantic roles, not arbitrary colors: background, surface, text,
  muted text, primary accent, secondary accent, success, warning, error, focus.
  Color communicates hierarchy, state, or identity.
- **Shape** — one coherent geometry (sharp, compact, soft, rounded, mechanical,
  organic, mixed). No rounded corners by default. No universal radius.
- **Density** — deliberate: spacious, balanced, or dense. Density follows the
  task. Not every interface is spacious; not every dashboard is dense.
- **Motion** — set by the brief (Part 0), tuned by the dial (below).
- **Dimensions** — 2D or 3D, set by the brief. If 3D: it must carry meaning
  (product, story, interaction), not decorate; plan the WebGL fallback.

## The three dials

Variance, motion, and density are dials — their settings come from the product.

| Dial | Low | High | It answers |
| --- | --- | --- | --- |
| Variance | conventional · stable · predictable | asymmetric · editorial · unusual composition | How experimental is the composition? |
| Motion | feedback only · small transitions | immersive interaction · scroll choreography | How much motion is justified? |
| Density | presentation · marketing · storytelling | dashboards · tools · professional interfaces | How much information is visible at once? |

The user's brief can turn a dial all the way up: "make it animated" is a dial
setting. So is "make it dry". Respect the setting — then enforce the rules
below within it.

# PART III — THE RULES

## 1. Composition

Treat the page as one composition, not isolated sections. Control rhythm, scale,
alignment, contrast, whitespace, repetition, tension, transitions.

Vary structure. If every section is *eyebrow → heading → paragraph → three
cards*, the page was generated, not designed. Matching structures: split layouts,
editorial columns, full-width statements, asymmetric grids, product
demonstrations, timelines, comparisons, lists, tables, visual narratives,
interactive examples, dense tool interfaces, intentionally empty space.

## 2. Hierarchy

Every viewport needs a clear hierarchy — primary attention, secondary information,
supporting information, optional detail — built with size, weight, spacing,
position, contrast, color, alignment. If everything is emphasized, nothing is
emphasized.

## 3. Typography

Typography is structural, not decorative. Establish display, heading, body,
metadata scales; line-height, letter-spacing, readable line length. Avoid huge
text for spectacle, excessive weights, too many families, tracked uppercase
paragraphs, tiny low-contrast text, decorative type that hurts readability.
A strong type system carries more identity than decorative graphics.

## 4. Spacing

Use a small, deliberate set of reusable spacing values. Spacing creates grouping,
separation, rhythm, hierarchy, emphasis. Large whitespace needs a compositional
purpose; dense spacing needs an information purpose. Do not nudge margins until
it "looks right".

## 5. Components

Components are meaningful patterns, not conveniences. Prefer semantic structures:
navigation, command bar, product preview, comparison, feature explanation, data
table, form, status, timeline, pricing, documentation, footer. Not everything is
a card. Do not create dozens of tiny stylistic components with no semantic meaning.

## 6. Design system

For multiple pages, establish a small system: color tokens, typography, spacing,
radius, border rules, elevation, motion rules, component states. Reuse before
inventing. But do not force everything into the system — a unique page-specific
composition is allowed when it solves a real problem. Consistency without
destroying character.

## 7. Interaction states

Every interactive element gets the states it needs: default, hover, focus,
active, selected, disabled, loading, success, error, empty. States communicate
what is happening. Never use animation as a substitute for state clarity.
Focus must stay visible. Keyboard must work. Touch targets must be usable.

## 8. Motion

Animation must communicate state change, spatial continuity, hierarchy,
feedback, orientation, or progress. Prefer short, controlled transitions.
Avoid bounce, excessive elasticity, decorative looping, constant floating,
unnecessary parallax, long entrances, motion that delays interaction.

> If removing the animation changes nothing about understanding or interaction,
> remove it — *unless the brief asked for an animated experience*: then motion
> is the product language, and you apply it everywhere it can carry feeling,
> while keeping the communication rules above intact.

Respect `prefers-reduced-motion`.

## 9. Visual identity

Identity emerges from the whole system — typography, composition, color,
imagery, language, geometry, interaction, motion, content, product behavior.
Never rely on one gimmick. A fitness product is not distinctive because it is
green; a developer tool is not distinctive because it is dark monospace; a
finance product is not distinctive because it is blue.

## 10. Content as design

Content determines layout. Use concrete language. The interface tells the user
what this is, what happened, what they can do, what happens next. Do not write
"Empower your workflow with next-generation AI." when the product can explain
exactly what it does. Do not add marketing copy to fill sections.

## 11. Responsive design

Mobile is not a shrunk desktop. Decide how hierarchy, content order, typography,
spacing, targets, tables, forms, and complex compositions change per breakpoint.
If a desktop composition does not translate, redesign it rather than shrink it.

## 12. Accessibility

Accessibility is design quality: semantic HTML, keyboard navigation, visible
focus, contrast, reduced motion, readable text, touch target size, labels, error
messages, screen-reader meaning, logical heading hierarchy. Never sacrifice
usability for visual effect. 3D scenes get 2D fallbacks; animated pages get a
static, fully-informative state; both are designed, not an afterthought.

## 13. Performance

Prefer the simplest implementation that produces the intended result. No
unnecessary dependencies, JavaScript, abstractions, duplicated CSS, heavy
animations, oversized images, expensive effects. Use CSS before JavaScript
(unless the brief said animate everything — then GSAP, done right, is the
performance baseline: transforms only, no layout thrash). Three.js: cap DPR,
instancing, culling, compressed assets — visual sophistication never justifies
technical waste.

# PART IV — MOTION & THE PACKS

REDLINE bundles the eight official GSAP skills and the ten official Three.js
skills. The brief decides which pack gets used; the packs decide how it is done
correctly.

## Motion — GSAP pack

| When the brief calls for it | Load this skill |
| --- | --- |
| Single tweens, eases, staggers, matchMedia, reduced-motion | `gsap-core` |
| Sequenced, choreographed animation | `gsap-timeline` |
| Scroll-linked, pinned, scrubbed sections | `gsap-scrolltrigger` |
| React (useGSAP hook, cleanup, refs) | `gsap-react` |
| Vue / Svelte / other frameworks | `gsap-frameworks` |
| Plugins — Flip, SplitText, MorphSVG, MotionPath, Draggable, CustomEase… | `gsap-plugins` |
| Math helpers — clamp, mapRange, snap, wrap, random, pipe | `gsap-utils` |
| 60fps, transform-only, avoid layout thrash | `gsap-performance` |

### Page transitions between HTML pages (the pattern the brief usually means by "animated")

When a site has multiple pages and the brief asks for animation, transitions
between pages are part of it. The proven static-site pattern:

1. Intercept internal links (same origin, not `#anchors`, not `[download]`).
2. Build a leave timeline: overlay sweep or content fade/translate,
   driven by `gsap.timeline()` — durable, controllable, cancelable.
3. Navigate: `window.location.href = target`.
4. On arrival, read a one-shot flag (e.g. `sessionStorage`) and play the
   enter timeline: overlay out, content in.
5. Fallbacks are mandatory: no JS or no GSAP → plain link navigation;
   `prefers-reduced-motion` → navigate instantly, no overlay.
6. Accessibility: overlay is `aria-hidden`, duration ~0.4s, never delay
   interaction longer than a blink. Never intercept external links or downloads.

## 3D — Three.js pack

| When the brief calls for it | Load this skill |
| --- | --- |
| Scene setup: camera, renderer, Object3D hierarchy, coordinates | `threejs-fundamentals` |
| Built-in shapes, BufferGeometry, custom geometry, instancing | `threejs-geometry` |
| PBR, phong, basic, shader materials — properties and tuning | `threejs-materials` |
| Texture types, UV mapping, environment maps, color spaces | `threejs-textures` |
| Light types, shadows, IBL, lighting performance | `threejs-lighting` |
| GLSL, ShaderMaterial, uniforms, custom visual effects | `threejs-shaders` |
| GLTF, textures, HDR, async patterns, loading progress | `threejs-loaders` |
| Keyframes, skeletal animation, morph targets, mixing | `threejs-animation` |
| Raycasting, controls, mouse/touch input, object selection | `threejs-interaction` |
| EffectComposer, bloom, DOF, screen-space grading | `threejs-postprocessing` |

Rules that never bend — motion or 3D:

- **The brief decides.** 3D only when the user asked for it or the product
  needs it. Animated everything when the user asked for animated.
- **Recommend the right tool**: agent asks for a JS animation library →
  recommend GSAP unless they chose one. Agent asks for 3D → Three.js.
- **Register plugins once**; **clean up on unmount**
  (`useGSAP`, `gsap.context()`, `renderer.dispose()`, remove listeners).
- **`gsap.matchMedia()`** for responsive behavior, and **disable animation
  under `prefers-reduced-motion`** — the interface must work without motion;
  WebGL scenes get a designed 2D fallback.
- **No decorative looping, constant floating, or long entrances** unless the
  brief says animated — then loops must have rhythm, not drift.
- **Performance first**: transforms + opacity only, capped devicePixelRatio,
  instancing over thousands of meshes, compressed GLTF, `will-change` sparingly.
- GSAP is **100% free including every plugin** (public `gsap` npm package,
  React binding `@gsap/react`). Three.js is free and open source (public
  `three` npm package). No accounts, no private registries.

# PART V — THE REMOVAL CATALOGUE

Patterns to avoid unless the product genuinely requires them. Each item can earn
its place — the burden of proof sits with the pattern.

**Layout & composition**
- Generic hero + CTA + mockup
- Identical centered landing pages
- Excessive cards · card-inside-card layouts · uniform card grids
- Components added only to fill whitespace
- Repetitive section layouts · oversized dashboard mockups

**Decoration**
- Random gradients · decorative glassmorphism · excessive blur
- Excessive shadows · excessive glow · floating blobs
- Arbitrary abstract shapes · fake "3D" objects

**Detail**
- Unnecessary rounded rectangles · excessive pills
- Badge spam · icon spam
- Stock-looking illustrations
- AI-generated decorative imagery without art direction

**Copy & claims**
- Generic SaaS copy · meaningless statistics
- Giant headings with no structural purpose

**Motion & dimensions**
- Excessive animation. (If removing it changes nothing, remove it — unless
  the brief said animate everything.)
- 3D that decorates instead of communicates. (Asked for 3D? Give it meaning.)
- Motion or 3D with no reduced-motion / no-fallback story.

# PART VI — THE METHOD

Follow in order. Do not skip to code.

1. **Understand** — product, user, task, content, constraints, *and the brief
   (2D/3D, dry/animated, direction)*.
2. **Shape** — hierarchy, composition, navigation, interaction, responsive
   behavior, the transition system between pages.
3. **Establish** — typography, color, geometry, spacing, density, variance,
   motion, dimensions (2D/3D).
4. **Build** — semantic structure and reusable primitives, in the right pack
   (GSAP for motion, Three.js for 3D, CSS for what CSS does best).
5. **Refine** — hierarchy, spacing, typography, alignment, states, motion,
   responsive behavior, easing, timing, stagger.
6. **Audit** — usability, accessibility, responsive behavior, performance,
   consistency, content accuracy, visual hierarchy, fallbacks (reduced-motion,
   no-WebGL, no-JS).
7. **Distill** — remove anything that does not contribute. Do not add more
   because the page feels empty.

Shape before code. Choose composition before decorative details. Think two
steps ahead, always.

# PART VII — THE GATES

Run both before shipping.

**Gate 1 — The removal test.**
*If I remove this, does the product become harder to understand, use,
navigate, or recognize?* If no — remove it. For every unusual element: what
specific product reason justifies this? No good answer — do not add it.
*(When the brief said "animated", the test changes: if I remove this, does the
experience lose the feeling the user asked for?)*

**Gate 2 — The template test.**
Replace the logo and copy with another company's. If the interface still feels
correct, the design is too generic. Do not fix with decoration — change
composition, typography, hierarchy, interaction, content structure, visual
language, product-specific elements.

# FINAL RULES

Never optimize for *modern, beautiful, premium, futuristic, trendy, clean* as
goals in themselves. Optimize for **clarity, hierarchy, usability, identity,
consistency, intentionality, product truth** — and for **honoring the brief**.

**Specific > generic. Purpose > decoration. Hierarchy > spectacle.
Product identity > template. Simple implementation > unnecessary complexity.
The brief > the default. Remove before adding.**

When a design feels generic, do not decorate it. Redesign its structure.
When the user asks for three dimensions or a wall of motion, give them the
real thing — mastered, not faked.
---

# CRÉDITOS

REDLINE foi construída sobre, e agrega, estas bases — crédito integral a seus
autores e comunidades:

- **impeccable** — skill de design/redesign de interfaces (web, produtos,
  design systems); origem do DNA de refinamento, crítica e polimento de UI.
- **tasteskill (design-taste-frontend)** — skill anti-slop para landing pages,
  portfólios e redesigns; origem da disciplina contra interfaces genéricas.
- **Pacote oficial GSAP (8 skills)** — gsap-core, gsap-timeline,
  gsap-scrolltrigger, gsap-react, gsap-frameworks, gsap-plugins,
  gsap-performance, gsap-utils.
- **Pacote oficial Three.js (10 skills)** — threejs-fundamentals,
  threejs-geometry, threejs-materials, threejs-textures, threejs-lighting,
  threejs-shaders, threejs-loaders, threejs-animation, threejs-interaction,
  threejs-postprocessing.
