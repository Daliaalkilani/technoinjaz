# "Faceted Summit" Typography Theme

Production-ready, mathematically measured typography theme derived directly from the **Techno Enjaz** brand logo (`Asset-1@4x.png`).

Every display word behaves as if cut from the brand symbol:
1. **Vertical Body Gradient (60%):** `#0AEEC3` (Mint apex) → `#1AD3C1` → `#26BFBE` (Anchor Teal) → `#3A9DBF` → `#4E7FBD` (Base Slate).
2. **Angled Facet Slices (29%):** Sliced at 150° and 210° (~30° from vertical, matching the logo legs) from `#4193BD` to `#5A6CBC`, separated by a `1.5px` hairline slit in the page background color.
3. **Accent Circle Dot (11%):** Diagonal 45° `#5D54F2` → `#14BCA3` with a 1px ring whose gradient is reversed (`#5361E8` → `#15BAA5`).

---

## 1. Quick Start

Include the theme stylesheets in your HTML:

```html
<link rel="stylesheet" href="theme/tokens.css">
<link rel="stylesheet" href="theme/faceted-text.css">
<link rel="stylesheet" href="theme/accent-dot.css">
<script src="theme/faceted-text.js" defer></script>
```

Or import them in your main CSS / JavaScript entry:

```css
@import './theme/tokens.css';
@import './theme/faceted-text.css';
@import './theme/accent-dot.css';
```

---

## 2. Typography Tiers

| Tier | Class | Elements | Treatment | Min Font Size |
|---|---|---|---|---|
| **Tier 1** | `.fx-text.fx-1` | Hero Title, H1, H2, Hero Numbers | Body gradient + both angled facets + hairlines + trailing period accent circle | 28px |
| **Tier 2** | `.fx-text.fx-2` | H3, H4, Buttons, Navigation Brand | Vertical body gradient only | 18px |
| **Tier 3** | `.fx-3` | Paragraphs, captions, forms | Flat WCAG-compliant text (`#B8E8E4` dark / `#1B6484` light) | 14px |

### Example Usage:

```html
<!-- Tier 1: Hero heading with trailing dot -->
<h1 class="fx-text fx-1" data-fx>Transforming Engineering Vision.</h1>

<!-- Tier 1 Arabic -->
<h2 class="fx-text fx-1" data-fx>نحوّل الفكرة الهندسية إلى واقع تقني.</h2>

<!-- Tier 2: Section header or button -->
<h3 class="fx-text fx-2" data-fx>الأنظمة السحابية والذكاء الاصطناعي</h3>
<button class="fx-text fx-2">استكشف أعمالنا</button>

<!-- Tier 3: Paragraph with high contrast emphasis -->
<p class="fx-3">
  نبني منظومات برمجية استثنائية تعتمد على <strong class="fx-strong">خوارزميات فائقة الدقة</strong>.
</p>

<!-- List with accent circle markers -->
<ul class="fx-list">
  <li>بنية برمجية موزعة عالية التوافر</li>
  <li>خوارزميات الرؤية الحاسوبية والتحقق البيومتري</li>
  <li>تشفير متعدد الطبقات وحماية متقدمة</li>
</ul>
```

---

## 3. Tuned Geometric Values

| Property | Tuned Value | Description |
|---|---|---|
| `--facet-angle` | `150deg` | Angle clockwise from vertical matching the logo's right leg. Mirrored facet is `210deg`. |
| `--facet-start` | `62%` | Coverage measured at **27.4%** of glyph surface area (within 25-30% spec). |
| `--facet-gap` | `1.5px` | Hairline slit gap painted in `var(--bg)`. |
| Hover Shift | `2px -2px, -2px -2px, 0 0` | Diagonal plane movement on hover/focus. |

---

## 4. Accessibility & Contrast (WCAG Compliance)

- **Dark Surface (`#0B1626`):** Body text `#B8E8E4` gives **13.6:1** contrast. Emphasis `#26BFBE` gives **8.0:1** contrast.
- **Light Surface (`#F6FBFB`):** Body text `#1B6484` gives **6.3:1** contrast.
- **Screen Readers:** Trailing period converted to `.fx-dot` preserves accessible `<span class="fx-sr-only">.</span>` so punctuation is announced normally.
- **High Contrast:** `forced-colors: active` falls back to `CanvasText`.
- **Reduced Motion:** `prefers-reduced-motion: reduce` disables hover transitions.
