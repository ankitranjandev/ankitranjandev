# Dart Deep Dive Series — Project Brief for Claude Code

## Companion series: Swift Deep Dive

A parallel Swift deep-dive series now lives in the same `deepDives` collection
(`category: "Swift"`, `color: "#F05138"`). It follows the identical format —
7 topics, 7 quiz questions, 3–5 inline SVGs per episode — but leans harder into
history and trivia (Lattner/LLVM, the 2014 WWDC reveal, open-sourcing in 2015,
ABI stability, Tony Hoare's "billion-dollar mistake", Dave Abrahams' POP talk).
Swift learning path (subjects, in order): "Swift: The Platform", "Swift: Data
Foundations", "Swift: Primitive Computation", "Swift: Collections", "Swift: Type
System", "Swift: Concurrency". SVG palette swaps Dart blue for Swift orange
(#F05138 fill / #C7411F stroke / #FFE9E2 light). All other rules below apply
unchanged. Note: cairosvg renders blank when the root `<svg>` keeps its
`style="max-width:100%;height:auto;"` attribute — keep that attribute in the MDX
(browsers need it), but inject explicit `width`/`height` into a temp copy when
verifying with cairosvg.

## What this is

A 10+ episode Dart programming deep-dive series published on an Astro website
using MDX. Each episode is one `.mdx` file in a content collection. The series
builds from first principles (transistors → booleans → integers) toward Flutter
development. The writing style is conversational and pedagogical, not
documentation-style.

## Tech stack

- Astro + MDX content collections
- Python + cairosvg for SVG verification during development
- All episode files output as `.mdx`
- All diagram files output as `.svg`

---

## Episodes completed

| File | Episode | Title |
|---|---|---|
| `booleans-deep-dive.mdx` | 2 | Booleans in Dart |
| `integers-deep-dive.mdx` | 3 | Integers in Dart |
| `doubles-deep-dive.mdx` | 4 | Doubles in Dart — IEEE 754 |
| `doubles-edge-cases.mdx` | 4.5 | Doubles, Part 2 — Memory and Edge Cases |
| `strings-deep-dive.mdx` | 5 | Strings in Dart — Immutability, Interning, Unicode |
| `collections-deep-dive.mdx` | 6 | Collections — Lists, Sets, Maps |

Episode 1 (bits/transistors) exists as a draft but has not been written
as MDX yet.

---

## Planned series structure

### Dart Data Types (current series — nearly complete)
- Ep 1: Bits and transistors (needs MDX)
- Ep 2–6: Done (see above)
- Ep 7: Functions, closures, and first-class computation ← next

### Dart Objects (separate section — not started)
- Classes and constructors
- Inheritance, interfaces, mixins
- Modern Dart 3: records, sealed classes, extension types

### Dart Async (separate section — not started)
- Futures and async/await
- Streams
- Isolates

---

## Astro content collection schema

```typescript
const deepDives = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    color: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topics: z.array(z.object({
      id: z.string(),       // URL-friendly slug, e.g. "how-doubles-are-stored"
      title: z.string(),
      summary: z.string(),  // HTML: supports <code>, <br>, <strong>, <pre>, <svg>
    })),
    quiz: z.object({
      title: z.string(),
      description: z.string(),
      questions: z.array(z.object({
        question: z.string(),
        options: z.array(z.string()),  // exactly 4 options
        correctIndex: z.number(),      // 0–3
        explanation: z.string(),
      })),
    }),
  }),
});
```

**Established episode pattern:** 7 topics, 7 quiz questions, 3–6 inline SVG
diagrams embedded in the `summary` field. Color is always `"#0175C2"` (Dart
blue) for episodes in the data-types series.

---

## Voice and style guide

**Always:**
- Short, declarative sentences. Subject–verb–object.
- "Let's" constructions ("Let's look at how…")
- Rhetorical questions to introduce concepts ("So what happens when the
  array runs out of room?")
- "We" perspective, not "you" ("We can see that…", not "You will notice…")
- Problem-first structure: show the limitation, then show the solution
- British spellings: behaviour, colour, organise, canonicalise, memorise
- Casual transitions: "Alright then", "So,", "That's…"

**Never:**
- Emoji in body text
- "Pro tip:" callouts
- Excessive bullet points — prose is preferred
- "straightforward", "genuinely", "honestly"
- Heavy markdown headers inside topic summaries

**Grammar rules enforced:**
- Correct grammar throughout — the user explicitly requires this
- Avoid dangling modifiers
- Avoid passive voice where active is clearer

**Pedagogical pattern:**
Each topic should have: hook → concept → code example → implication.
Complex topics get a diagram between the concept and the code example.

---

## SVG diagram rules

### Dimensions and layout
- Standard viewBox: `"0 0 720 H"` where H varies by content (300–480 typical)
- Always include `style="max-width: 100%; height: auto;"` for responsive
- Always include `role="img"` and `aria-label`

### Naming conventions
- Scoped CSS class prefix per diagram to avoid collisions, e.g. `.d-cap-*`,
  `.e1-*`, `.c1-*`
- Unique marker IDs per SVG, e.g. `m-flow-mdx`, `m-hash-mdx`
- Diagram filenames use episode prefix: `c1-three-collections.svg`,
  `c9-big-o-table.svg` (Episode 6 used c1–c9)

### Color palette (always use these)




Dart blue:   #0175C2  (fill) / #0369a1 (stroke)
Green:       #10b981  (fill) / #d1fae5 (light fill)
Red:         #dc2626  (fill) / #fee2e2 (light fill)
Amber:       #f59e0b  (fill) / #fef3c7 (light fill)
Purple:      #9333ea  (fill) / #e9d5ff / #f3e8ff
Slate:       #1e293b (text), #475569 (secondary), #64748b (captions)
Border:      #cbd5e1 (light), #94a3b8 (medium)

### Fonts
Body:  -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif
Code:  "SF Mono", Menlo, Monaco, monospace


### Known rendering bugs (cairosvg)
- **NEVER use `<tspan>` inside a `<text>` that has `text-anchor="middle"`**
  — the tspan content renders at wrong position. Use separate `<text>`
  elements instead.
- Avoid text that extends beyond the viewBox width — it gets clipped.
  Use `text-anchor="end"` with x near the right edge instead of centering
  long strings.

### Verification step (mandatory before embedding)
Always verify SVGs render correctly by converting to PNG:
```bash
python3 -c "import cairosvg; cairosvg.svg2png(
  url='path/to/diagram.svg',
  write_to='previews/diagram.png',
  output_width=720
)"
```
Then view the PNG to confirm layout before embedding in MDX.

### Embedding in MDX
SVGs go inline in the `summary` YAML field. In YAML multiline strings,
each SVG must be on a **single line** (no line breaks inside the SVG tag)
or indented correctly as part of the `|` block. The summary field uses
the `|` literal block scalar.

---

## YAML validation (mandatory before presenting files)

Always run this before calling the episode done:

```python
import re, yaml

with open('path/to/episode.mdx') as f:
    content = f.read()

match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
data = yaml.safe_load(match.group(1))
print(f"Topics: {len(data['topics'])}")
print(f"Quiz questions: {len(data['quiz']['questions'])}")
for t in data['topics']:
    print(f"  {t['id']}: {t['summary'].count('<svg')} SVGs")
```

---

## Verified Dart technical facts (do not contradict these)

These were researched during the series and must be preserved:

**Strings:**
- `String.canonicalize()` does NOT exist as a public Dart method.
  Java has `String.intern()`; Dart has no equivalent public API.
  Canonicalisation in Dart is implicit, handled by the compiler for
  string literals.
- Dart strings are internally **UTF-16** (specifically WTF-16 in the VM),
  not UTF-8. The VM uses `_OneByteString` (Latin-1, 1 byte/char) or
  `_TwoByteString` (UTF-16, 2 bytes/char) selected automatically.
- `String.length` counts **UTF-16 code units**, not characters. An emoji
  like 😀 (U+1F600) has length 2 because it is a surrogate pair.
- For grapheme clusters (what humans see as characters), use the
  `package:characters` package.

**Numbers:**
- Small integers (Smi) are stored **inline in the pointer** — no heap
  allocation. The range is ±2^30 on 32-bit, ±2^62 on 64-bit.
- Large integers (Mint) are heap-allocated objects.
- **Doubles are always boxed** — there is no Smi-like trick for doubles
  because all 64 bits are needed for the IEEE 754 value.
- The 53-bit integer precision cliff: doubles cannot exactly represent
  integers above 2^53 = 9,007,199,254,740,992.
- Dart's `.round()` uses **round-half-away-from-zero**, NOT banker's
  rounding. Banker's rounding (round-half-to-even) is the IEEE 754
  default for arithmetic operations.

**Collections:**
- The default `Set()` / `{}` literal is **LinkedHashSet** — preserves
  insertion order. This is a common surprise vs other languages.
- The default `Map()` / `{key: value}` literal is **LinkedHashMap** —
  also preserves insertion order.
- Bare `{}` creates an empty `Map<dynamic, dynamic>`, NOT an empty Set.
  To create an empty Set, use `<Type>{}` or `Set<Type>()`.
- `List.add()` is **amortized O(1)** due to capacity-doubling backing
  array. `List.insert(0, x)` is O(n).
- `Set.contains` and `Map[key]` are **O(1) average** via hashing.
- `List.contains` is **O(n)**.

**Concurrency:**
- Dart isolates share **no memory** — communication is via message passing.
- The event loop processes one task at a time (cooperative, not preemptive).

---

## Standard workflow for new episodes

1. **User provides draft script** (rough notes, examples, partial code)
2. **Gap analysis** — identify: technical errors, missing concepts, voice/
   grammar issues. Present as structured analysis. Wait for approval.
3. **User says "Let's do it"** (or similar)
4. **Plan diagrams** — decide which 3–6 SVGs would most aid memorisation
5. **Build each SVG** as a standalone file
6. **Verify each SVG** via cairosvg → PNG → view
7. **Fix any rendering issues** (clip, tspan bugs, overflow)
8. **Write the MDX file** with all SVGs inlined in the summary fields
9. **Validate YAML parses** with Python yaml.safe_load
10. **Present files** — MDX + all standalone SVG files

---

## File output locations

- MDX episodes → output to the project's content directory
- SVG diagrams → output alongside MDX or in a `/diagrams` subdirectory
- Keep standalone SVG files even after embedding inline — they're useful
  for standalone reference pages and sharing

---

## Episode 7 brief (next to build)

**Title:** Functions in Dart — First-Class, Closures, and Tear-offs

**Core teaching arc:**
- Functions are objects in Dart (not just callable blocks)
- Optional positional vs optional named parameters (and required named)
- Closures capture variables by reference, not by value
- Tear-offs: `list.forEach(print)` vs `list.forEach((x) => print(x))`
- Function types: `int Function(String)` syntax
- `typedef` for naming function types
- `sync*` generators and `yield` (brief intro, links to Streams episode)
- Callback to Episode 6: `map`, `where`, `fold` are just functions
  being passed as arguments

**Suggested 7 topics:**
1. Functions are objects — assign to variables, pass as arguments, return
2. Parameters — positional, optional positional `[]`, named `{}`, required
3. Closures — what they capture, the loop variable trap
4. Tear-offs — when to use vs anonymous lambdas
5. Function types and typedef
6. Higher-order functions — the functional toolkit from Episode 6
   explained through function-type lens
7. Generators — sync* and yield (brief, sets up Streams section)

**Suggested diagrams:**
- Closure variable capture (showing the environment that travels with
  the function)
- Tear-off vs lambda side-by-side (same semantics, different syntax)
- Higher-order function pipeline (data → transform → filter → reduce)

---

## Reminder: series arc and tone

The series is building toward Flutter. Every episode should feel like
it's one step closer to writing real app code. Avoid academic detours.
Each "deep" explanation should answer a question the reader would
actually have ("why is this slower?", "what went wrong here?").

The user (Ankit) writes in a flowing, educational YouTube-script style.
The role here is to expand that draft into a technically accurate,
well-structured MDX episode while preserving his voice and examples.


### Known rendering bugs (cairosvg)
- **NEVER use `<tspan>` inside a `<text>` that has `text-anchor="middle"`**
  — the tspan content renders at wrong position. Use separate `<text>`
  elements instead.
- Avoid text that extends beyond the viewBox width — it gets clipped.
  Use `text-anchor="end"` with x near the right edge instead of centering
  long strings.

### Verification step (mandatory before embedding)
Always verify SVGs render correctly by converting to PNG:
```bash
python3 -c "import cairosvg; cairosvg.svg2png(
  url='path/to/diagram.svg',
  write_to='previews/diagram.png',
  output_width=720
)"
```
Then view the PNG to confirm layout before embedding in MDX.

### Embedding in MDX
SVGs go inline in the `summary` YAML field. In YAML multiline strings,
each SVG must be on a **single line** (no line breaks inside the SVG tag)
or indented correctly as part of the `|` block. The summary field uses
the `|` literal block scalar.

---

## YAML validation (mandatory before presenting files)

Always run this before calling the episode done:

```python
import re, yaml

with open('path/to/episode.mdx') as f:
    content = f.read()

match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
data = yaml.safe_load(match.group(1))
print(f"Topics: {len(data['topics'])}")
print(f"Quiz questions: {len(data['quiz']['questions'])}")
for t in data['topics']:
    print(f"  {t['id']}: {t['summary'].count('<svg')} SVGs")
```

---

## Verified Dart technical facts (do not contradict these)

These were researched during the series and must be preserved:

**Strings:**
- `String.canonicalize()` does NOT exist as a public Dart method.
  Java has `String.intern()`; Dart has no equivalent public API.
  Canonicalisation in Dart is implicit, handled by the compiler for
  string literals.
- Dart strings are internally **UTF-16** (specifically WTF-16 in the VM),
  not UTF-8. The VM uses `_OneByteString` (Latin-1, 1 byte/char) or
  `_TwoByteString` (UTF-16, 2 bytes/char) selected automatically.
- `String.length` counts **UTF-16 code units**, not characters. An emoji
  like 😀 (U+1F600) has length 2 because it is a surrogate pair.
- For grapheme clusters (what humans see as characters), use the
  `package:characters` package.

**Numbers:**
- Small integers (Smi) are stored **inline in the pointer** — no heap
  allocation. The range is ±2^30 on 32-bit, ±2^62 on 64-bit.
- Large integers (Mint) are heap-allocated objects.
- **Doubles are always boxed** — there is no Smi-like trick for doubles
  because all 64 bits are needed for the IEEE 754 value.
- The 53-bit integer precision cliff: doubles cannot exactly represent
  integers above 2^53 = 9,007,199,254,740,992.
- Dart's `.round()` uses **round-half-away-from-zero**, NOT banker's
  rounding. Banker's rounding (round-half-to-even) is the IEEE 754
  default for arithmetic operations.

**Collections:**
- The default `Set()` / `{}` literal is **LinkedHashSet** — preserves
  insertion order. This is a common surprise vs other languages.
- The default `Map()` / `{key: value}` literal is **LinkedHashMap** —
  also preserves insertion order.
- Bare `{}` creates an empty `Map<dynamic, dynamic>`, NOT an empty Set.
  To create an empty Set, use `<Type>{}` or `Set<Type>()`.
- `List.add()` is **amortized O(1)** due to capacity-doubling backing
  array. `List.insert(0, x)` is O(n).
- `Set.contains` and `Map[key]` are **O(1) average** via hashing.
- `List.contains` is **O(n)**.

**Concurrency:**
- Dart isolates share **no memory** — communication is via message passing.
- The event loop processes one task at a time (cooperative, not preemptive).

---

## Standard workflow for new episodes

1. **User provides draft script** (rough notes, examples, partial code)
2. **Gap analysis** — identify: technical errors, missing concepts, voice/
   grammar issues. Present as structured analysis. Wait for approval.
3. **User says "Let's do it"** (or similar)
4. **Plan diagrams** — decide which 3–6 SVGs would most aid memorisation
5. **Build each SVG** as a standalone file
6. **Verify each SVG** via cairosvg → PNG → view
7. **Fix any rendering issues** (clip, tspan bugs, overflow)
8. **Write the MDX file** with all SVGs inlined in the summary fields
9. **Validate YAML parses** with Python yaml.safe_load
10. **Present files** — MDX + all standalone SVG files

---

## File output locations

- MDX episodes → output to the project's content directory
- SVG diagrams → output alongside MDX or in a `/diagrams` subdirectory
- Keep standalone SVG files even after embedding inline — they're useful
  for standalone reference pages and sharing

---

## Episode 7 brief (next to build)

**Title:** Functions in Dart — First-Class, Closures, and Tear-offs

**Core teaching arc:**
- Functions are objects in Dart (not just callable blocks)
- Optional positional vs optional named parameters (and required named)
- Closures capture variables by reference, not by value
- Tear-offs: `list.forEach(print)` vs `list.forEach((x) => print(x))`
- Function types: `int Function(String)` syntax
- `typedef` for naming function types
- `sync*` generators and `yield` (brief intro, links to Streams episode)
- Callback to Episode 6: `map`, `where`, `fold` are just functions
  being passed as arguments

**Suggested 7 topics:**
1. Functions are objects — assign to variables, pass as arguments, return
2. Parameters — positional, optional positional `[]`, named `{}`, required
3. Closures — what they capture, the loop variable trap
4. Tear-offs — when to use vs anonymous lambdas
5. Function types and typedef
6. Higher-order functions — the functional toolkit from Episode 6
   explained through function-type lens
7. Generators — sync* and yield (brief, sets up Streams section)

**Suggested diagrams:**
- Closure variable capture (showing the environment that travels with
  the function)
- Tear-off vs lambda side-by-side (same semantics, different syntax)
- Higher-order function pipeline (data → transform → filter → reduce)

---

## Reminder: series arc and tone

The series is building toward Flutter. Every episode should feel like
it's one step closer to writing real app code. Avoid academic detours.
Each "deep" explanation should answer a question the reader would
actually have ("why is this slower?", "what went wrong here?").

The user (Ankit) writes in a flowing, educational YouTube-script style.
The role here is to expand that draft into a technically accurate,
well-structured MDX episode while preserving his voice and examples.