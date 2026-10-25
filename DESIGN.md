---
version: alpha
name: Roboflow
description: |
  Roboflow's design system projects precision and modernity for a
  developer-first data labeling platform. The visual language combines a
  sophisticated dark ink base (#161026) with a soft, warm neutral canvas
  (#F4F2EC) that grounds the interface in clarity and accessibility. Accent
  colors (#8033EB for primary actions) punctuate workflows with energy, while a
  carefully calibrated typographic hierarchy using the humanist sans-serif
  Suisse and monospace GeistMono establishes clear information hierarchy. The
  system embraces micro-interactions through layered shadows and focus states,
  supporting rapid annotation and complex computer vision workflows without
  visual overwhelm. Depth is achieved through subtle color blocking and soft
  shadow layers rather than dramatic elevation, maintaining focus on content and
  task completion.
source:
  url: "https://roboflow.com/annotate"
  pagesAnalyzed: 1
  extractedAt: 2026-10-22
  tokensMeasured: true
colors:
  primary: "#161026"
  canvas: "#F4F2EC"
  surface-alt: "#ECEAE6"
  ink: "#161026"
  hairline: "#C29AF6"
  accent-1: "#9EE3BB"
  accent-2: "#251742"
  accent-3: "#8033EB"
  neutral-1: "#131312"
  neutral-2: "#FFFFFF"
  neutral-3: "#686766"
  neutral-4: "#E1DFDC"
  neutral-5: "#CAC9C8"
typography:
  display-lg:
    fontFamily: suisse
    fontSize: 56px
    fontWeight: 450
    lineHeight: 1.05
    letterSpacing: -1.68px
  display-md:
    fontFamily: suisse
    fontSize: 44px
    fontWeight: 450
    lineHeight: 1.05
    letterSpacing: -1.1px
  heading:
    fontFamily: suisse
    fontSize: 24px
    fontWeight: 450
    lineHeight: 1.2
    letterSpacing: -0.48px
  body-lg:
    fontFamily: suisse
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0px
  body-lg-strong:
    fontFamily: suisse
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0px
  body-md:
    fontFamily: suisse
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: -0.07px
  body-sm:
    fontFamily: suisse
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0px
  body-xs:
    fontFamily: suisse
    fontSize: 12.7788px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: 0px
  button-md:
    fontFamily: suisse
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  button-sm:
    fontFamily: suisse
    fontSize: 15px
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: 0px
  caption-lg:
    fontFamily: suisse
    fontSize: 9.94402px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0px
  caption-lg-strong:
    fontFamily: suisse
    fontSize: 9.94402px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0px
  caption-md:
    fontFamily: suisse
    fontSize: 9.17333px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0px
  caption-md-tight:
    fontFamily: suisse
    fontSize: 9.17333px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0px
  caption-sm:
    fontFamily: suisse
    fontSize: 8.6016px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0px
  caption-xs:
    fontFamily: suisse
    fontSize: 7.74144px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0px
  code-xl:
    fontFamily: GeistMono
    fontSize: 13px
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: 0px
    textTransform: uppercase
  code-lg:
    fontFamily: GeistMono
    fontSize: 12px
    fontWeight: 450
    lineHeight: 0.95
    letterSpacing: 0.12px
    textTransform: uppercase
  code-md:
    fontFamily: GeistMono
    fontSize: 11.3284px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0px
  code-md-uppercase:
    fontFamily: GeistMono
    fontSize: 11.3284px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.34px
    textTransform: uppercase
  code-sm:
    fontFamily: GeistMono
    fontSize: 11.2896px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0px
  code-xs:
    fontFamily: GeistMono
    fontSize: 6.4512px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0px
rounded:
  none: 0px
  xs: 4px
  sm: 4.00546px
  md: 5.352px
  lg: 7px
  xl: 8.028px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 28px
  xxxl: 32px
  section: 40px
  band: 48px
borderWidths:
  thin: 1px
shadows:
  sm: "color(srgb 0.0705882 0.0666667 0.0627451 / 0.1) 0px 0px 65.8024px 0px"
  md: "color(srgb 0.0745098 0.0745098 0.0705882 / 0.1) 0px 2px 8px 0px"
  lg: "rgba(0, 0, 0, 0.08) 0px 0px 32px 0px"
elevationStrategy: layered-micro
themes:
  derived: dark   # the other theme is the site's measured palette
  light:
    bg: "#F4F2EC"
    surface: "#ECEAE6"
    surfaceRaised: "#E3E1DE"
    text: "#161026"
    textMuted: "#645F6B"
    border: "#C29AF6"
    accent: "#161026"
    accentFg: "#FFFFFF"
    focusRing: "#161026"
    elevation: shadow
  dark:
    bg: "#0F0D11"
    surface: "#1D1C1F"
    surfaceRaised: "#29282B"
    text: "#F6F5F6"
    textMuted: "#9E9D9F"
    border: "#353437"
    accent: "#8E79C6"
    accentFg: "#0B0B0C"
    focusRing: "#6A4EB4"
    elevation: "border+surface"
components:
  button-filled:
    typography: "{typography.code-xl}"
    textColor: "{colors.canvas}"
    height: 36px
    padding: "0px 20px 0px 20px"
    rounded: "{rounded.xs}"
    backgroundColor: "{colors.accent-3}"
  button-primary:
    typography: "{typography.code-xl}"
    textColor: "{colors.canvas}"
    height: 36px
    padding: "0px 20px 0px 20px"
    rounded: "{rounded.xs}"
    backgroundColor: "{colors.primary}"
  button-filled-2:
    typography: "{typography.code-xl}"
    textColor: "{colors.canvas}"
    height: 36px
    padding: "0px 20px 0px 20px"
    rounded: "{rounded.xs}"
    backgroundColor: "{colors.accent-2}"
  button-icon:
    typography: "{typography.button-md}"
    textColor: "{colors.neutral-2}"
    height: 28px
    rounded: "{rounded.xs}"
    backgroundColor: "oklab(0.999994 0.0000455678 0.0000200868 / 0.25)"
  button-text:
    typography: "{typography.button-md}"
    textColor: "{colors.ink}"
    height: 68.7969px
    padding: "20px 0px 20px 0px"
  button-outline:
    typography: "{typography.code-xl}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.neutral-5}"
    height: 36px
    padding: "0px 20px 0px 20px"
    rounded: "{rounded.xs}"
  navigation:
    typography: "{typography.button-md}"
    textColor: "{colors.ink}"
    height: 68px
  footer:
    typography: "{typography.button-md}"
    textColor: "{colors.canvas}"
    border: "1px solid rgb(62, 33, 107)"
    backgroundColor: "{colors.primary}"
  link:
    typography: "{typography.button-md}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.xs}"
    backgroundColor: "rgb(62, 33, 107)"
  link-sm:
    typography: "{typography.button-sm}"
    textColor: "{colors.ink}"
    padding: "6px 8px 6px 8px"
    rounded: "{rounded.xs}"
states:
  other-focus-visible:
    target: other
    state: focus-visible
    boxShadow: "rgba(128, 51, 235, 0.2) 0px 0px 0px 10px"
  other-hover:
    target: other
    state: hover
    opacity: 1
    transform: "translateY(-8%)"
  other-disabled:
    target: other
    state: disabled
    opacity: 0.2
breakpoints:
  - width: 375
    containerWidth: 343
    gridColumns: 4
    navLinksVisible: 40
    menuToggleVisible: true
    headingPx: 36
    bodyPx: 16
    sectionPaddingX: 16
  - width: 768
    containerWidth: 720
    gridColumns: 5
    navLinksVisible: 42
    menuToggleVisible: true
    headingPx: 48
    bodyPx: 16
    sectionPaddingX: 24
  - width: 1024
    containerWidth: 960
    gridColumns: 5
    navLinksVisible: 42
    menuToggleVisible: true
    headingPx: 56
    bodyPx: 16
    sectionPaddingX: 32
  - width: 1280
    containerWidth: 1216
    gridColumns: 3
    navLinksVisible: 44
    menuToggleVisible: true
    headingPx: 56
    bodyPx: 16
    sectionPaddingX: 32
  - width: 1440
    containerWidth: 1376
    gridColumns: 3
    navLinksVisible: 44
    menuToggleVisible: true
    headingPx: 56
    bodyPx: 16
    sectionPaddingX: 32
coverage:
  statesFound: 61
  gradientsFound: 0
  rolesUnassigned: 8
  archetypesUnnamed: 0
  archetypesDetected: 0
  responsiveMeasured: true
  stylesheetsBlocked: false
  semanticRampDeclared: false
---

# Design System Inspired by Roboflow

tokens:
  colors:
    primary: "#161026"
    accent-1: "#9EE3BB"
    accent-2: "#251742"
    accent-3: "#8033EB"
    canvas: "#F4F2EC"
    surface-alt: "#ECEAE6"
    hairline: "#C29AF6"
    neutral-1: "#131312"
    neutral-2: "#FFFFFF"
    neutral-3: "#686766"
    neutral-4: "#E1DFDC"
    neutral-5: "#CAC9C8"
  typography:
    display-lg: { size: "56px", weight: 450, lineHeight: 1.05, letterSpacing: "-1.68px", family: "suisse" }
    display-md: { size: "44px", weight: 450, lineHeight: 1.05, letterSpacing: "-1.1px", family: "suisse" }
    heading: { size: "24px", weight: 450, lineHeight: 1.2, letterSpacing: "-0.48px", family: "suisse" }
    body-lg: { size: "18px", weight: 400, lineHeight: 1.4, letterSpacing: "0px", family: "suisse" }
    body-lg-strong: { size: "18px", weight: 500, lineHeight: 1.4, letterSpacing: "0px", family: "suisse" }
    body-md: { size: "15px", weight: 400, lineHeight: 1.35, letterSpacing: "-0.07px", family: "suisse" }
    body-sm: { size: "14px", weight: 400, lineHeight: 1.35, letterSpacing: "0px", family: "suisse" }
    body-xs: { size: "12.78px", weight: 500, lineHeight: 1.1, letterSpacing: "0px", family: "suisse" }
    button-md: { size: "16px", weight: 400, lineHeight: 1.5, letterSpacing: "0px", family: "suisse" }
    button-sm: { size: "15px", weight: 400, lineHeight: 0.95, letterSpacing: "0px", family: "suisse" }
    caption-lg: { size: "9.94px", weight: 400, lineHeight: 1.4, letterSpacing: "0px", family: "suisse" }
    caption-lg-strong: { size: "9.94px", weight: 500, lineHeight: 1.3, letterSpacing: "0px", family: "suisse" }
    caption-md: { size: "9.17px", weight: 400, lineHeight: 1.4, letterSpacing: "0px", family: "suisse" }
    caption-md-tight: { size: "9.17px", weight: 400, lineHeight: 1.3, letterSpacing: "0px", family: "suisse" }
    caption-sm: { size: "8.60px", weight: 400, lineHeight: 1.2, letterSpacing: "0px", family: "suisse" }
    caption-xs: { size: "7.74px", weight: 500, lineHeight: 1.3, letterSpacing: "0px", family: "suisse" }
    code-xl: { size: "13px", weight: 500, lineHeight: 0.95, letterSpacing: "0px", family: "GeistMono", textTransform: "uppercase" }
    code-lg: { size: "12px", weight: 450, lineHeight: 0.95, letterSpacing: "0.12px", family: "GeistMono", textTransform: "uppercase" }
    code-md: { size: "11.33px", weight: 500, lineHeight: 1.5, letterSpacing: "0px", family: "GeistMono" }
    code-md-uppercase: { size: "11.33px", weight: 500, lineHeight: 1, letterSpacing: "0.34px", family: "GeistMono", textTransform: "uppercase" }
    code-sm: { size: "11.29px", weight: 400, lineHeight: 1.3, letterSpacing: "0px", family: "GeistMono" }
    code-xs: { size: "6.45px", weight: 400, lineHeight: 1.3, letterSpacing: "0px", family: "GeistMono" }
  spacing:
    xxs: "4px"
    xs: "8px"
    sm: "12px"
    md: "16px"
    lg: "20px"
    xl: "24px"
    xxl: "28px"
    xxxl: "32px"
    section: "40px"
    band: "48px"
  rounded:
    none: "0px"
    xs: "4px"
    sm: "4.01px"
    md: "5.35px"
    lg: "7px"
    xl: "8.03px"
    full: "9999px"
  shadows:
    sm: "color(srgb 0.0705882 0.0666667 0.0627451 / 0.1) 0px 0px 65.8024px 0px"
    md: "color(srgb 0.0745098 0.0745098 0.0705882 / 0.1) 0px 2px 8px 0px"
    lg: "rgba(0, 0, 0, 0.08) 0px 0px 32px 0px"
  borderWidths:
    thin: "1px"
  opacity:
    disabled: 0.2
    hover-soft: 0.5
    hover-medium: 0.6
    hover-strong: 0.9
    overlay: 0.14
  zIndex:
    base: 1
    dropdown: 10
    toast: 999999

## 1. Visual Theme & Atmosphere

Roboflow's design system projects precision and modernity for a developer-first data labeling platform. The visual language combines a sophisticated dark ink base (`{colors.primary}` — `#161026`) with a soft, warm neutral canvas (`{colors.canvas}` — `#F4F2EC`) that grounds the interface in clarity and accessibility. Accent colors (`{colors.accent-3}` — `#8033EB` for primary actions) punctuate workflows with energy, while a carefully calibrated typographic hierarchy using the humanist sans-serif Suisse and monospace GeistMono establishes clear information hierarchy. The system embraces micro-interactions through layered shadows and focus states, supporting rapid annotation and complex computer vision workflows without visual overwhelm. Depth is achieved through subtle color blocking and soft shadow layers rather than dramatic elevation, maintaining focus on content and task completion.

**Key Characteristics**

- Warm, neutral canvas background (`{colors.canvas}` — `#F4F2EC`) contrasts with dark primary ink for legibility
- Brand accent in vibrant purple (`{colors.accent-3}` — `#8033EB`) for CTAs and interactive highlights
- Precision typography: negative letter-spacing on display sizes, monospace code treatments
- Rounded button and card corners (`{rounded.xs}` to `{rounded.lg}`) create approachable, modern feel
- Layered micro-shadows enable depth without distraction
- Color-blocking strategy: surfaces shift hue slightly rather than rely solely on shadows
- Accessible 1.35+ line heights support readability across all scales
- Decorative accent colors (`{colors.accent-1}`, `{colors.accent-2}`) employed for visual richness without functional roles

## 2. Color Palette & Roles

### Primary

- **Primary / Brand Ink** (`{colors.primary}` — `#161026`): Dominates headings, primary text, and primary button fills. Serves as the high-contrast anchor for the entire system. Also applied to logo mark and active/selected states.

### Accent Colors

- **Purple Accent** (`{colors.accent-3}` — `#8033EB`): Primary call-to-action button background, brand highlight, focus ring color. Signals primary user intent (e.g., "Get Started", "Find Objects").
- **Sage Accent** (`{colors.accent-1}` — `#9EE3BB`): Decorative; no measured functional role. Employed in hero imagery and accent bands for visual richness.
- **Deep Purple Accent** (`{colors.accent-2}` — `#251742`): Decorative; no measured functional role. Complements brand identity and gradient overlays.

### Interactive

- **Purple Brand Strong** (`{colors.accent-3}` — `#8033EB`): Primary button hover and active states.

### Neutral Scale

- **Canvas / Page Background** (`{colors.canvas}` — `#F4F2EC`): Default page and section background. Warm off-white establishes legible baseline.
- **Surface Alt / Band** (`{colors.surface-alt}` — `#ECEAE6`): Alternating section bands; subtle contrast without harsh division.
- **Neutral – Darkest** (`{colors.neutral-1}` — `#131312`): Rarely applied; near-black fallback for extreme contrast needs.
- **Neutral – Lightest** (`{colors.neutral-2}` — `#FFFFFF`): Pure white. Applied to component surfaces and link/footer backgrounds.
- **Neutral – Medium** (`{colors.neutral-3}` — `#686766`): Secondary text, muted labels, disabled state fallback.
- **Neutral – Light** (`{colors.neutral-4}` — `#E1DFDC`): Input borders, secondary dividers, soft background fills.
- **Neutral – Lighter** (`{colors.neutral-5}` — `#CAC9C8`): Subtle dividers, faint borders on light backgrounds.

### Surface & Borders

- **Hairline / Border** (`{colors.hairline}` — `#C29AF6`): 1px borders and subtle dividers. Light purple tint softens divisions while maintaining edge definition.

## 3. Typography Rules

### Font Family

**Primary:** Suisse (humanist sans-serif) — `font-family: suisse, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

**Secondary:** GeistMono (monospace) — `font-family: GeistMono, "Courier New", monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Display Large | Suisse | 56px | 450 | 1.05 | -1.68px | Hero headlines; h1 |
| Display Medium | Suisse | 44px | 450 | 1.05 | -1.1px | Section headings; h3 |
| Heading | Suisse | 24px | 450 | 1.2 | -0.48px | Subsection titles; h2/h4 |
| Body Large | Suisse | 18px | 400 | 1.4 | 0px | Feature descriptions, intro paragraphs |
| Body Large Strong | Suisse | 18px | 500 | 1.4 | 0px | Emphasis within body-lg contexts |
| Body Medium | Suisse | 15px | 400 | 1.35 | -0.07px | Primary body text; default paragraph |
| Body Small | Suisse | 14px | 400 | 1.35 | 0px | Secondary text, small labels |
| Body XS | Suisse | 12.78px | 500 | 1.1 | 0px | Fine print, metadata |
| Button Medium | Suisse | 16px | 400 | 1.5 | 0px | Standard button labels |
| Button Small | Suisse | 15px | 400 | 0.95 | 0px | Compact button labels (GeistMono code-like) |
| Caption Large | Suisse | 9.94px | 400 | 1.4 | 0px | Captions, fine annotations |
| Caption Large Strong | Suisse | 9.94px | 500 | 1.3 | 0px | Emphasized captions |
| Caption Medium | Suisse | 9.17px | 400 | 1.4 | 0px | Small captions |
| Caption Medium Tight | Suisse | 9.17px | 400 | 1.3 | 0px | Dense captions, reduced line-height |
| Caption Small | Suisse | 8.60px | 400 | 1.2 | 0px | Minimal captions |
| Caption XS | Suisse | 7.74px | 500 | 1.3 | 0px | Tiny labels, tags |
| Code XL | GeistMono | 13px | 500 | 0.95 | 0px | Uppercase, large code snippets |
| Code Large | GeistMono | 12px | 450 | 0.95 | 0.12px | Uppercase, medium code; ANNOTATE labels |
| Code Medium | GeistMono | 11.33px | 500 | 1.5 | 0px | Standard inline code |
| Code Medium Uppercase | GeistMono | 11.33px | 500 | 1 | 0.34px | Uppercase code tokens |
| Code Small | GeistMono | 11.29px | 400 | 1.3 | 0px | Small code, UI tokens |
| Code XS | GeistMono | 6.45px | 400 | 1.3 | 0px | Minimal code |

### Principles

- **Negative tracking on display sizes** (`-1.68px` on 56px, `-1.1px` on 44px) creates authoritative, premium presence. Do not normalize to 0.
- **Monospace for action labels**: Code-family (GeistMono) used sparingly on button and UI labels to signal technical precision and developer-first sensibility.
- **High line heights (1.3–1.5)** ensure readability across small to medium sizes, especially on warm canvas backgrounds.
- **Weight progression**: 400 (regular) for body; 450 for headings; 500 for emphasis and code. Do not exceed 500 in this system.
- **Minimal letter-spacing on body**: Most body text uses 0px or very slight negative tracking (`-0.07px`) to maintain warmth and flow.

## 4. Component Stylings

### Buttons

#### Primary CTA (Filled Purple)

- **Background**: `{colors.accent-3}` (`#8033EB`)
- **Text Color**: `{colors.canvas}` (`#F4F2EC`)
- **Padding**: `{spacing.md}` (`16px`) horizontal, `0px` vertical (height: 36px)
- **Font**: GeistMono, `{typography.button-sm}` (15px, weight 400, line-height 0.95)
- **Border**: None
- **Border Radius**: `{rounded.xs}` (`4px`)
- **Box Shadow**: None
- **Hover State**: Background darkens to `#6B2AB8` (80% opacity of original); outline none; color remains `{colors.canvas}`
- **Focus State**: Outline `1.5px solid {colors.accent-3}`, ring shadow `rgba(128, 51, 235, 0.2) 0px 0px 0px 10px`
- **Disabled State**: Opacity `0.2`

#### Secondary (Dark Ink Fill)

- **Background**: `{colors.primary}` (`#161026`)
- **Text Color**: `{colors.canvas}` (`#F4F2EC`)
- **Padding**: `{spacing.md}` horizontal
- **Font**: GeistMono, `{typography.button-sm}`
- **Border**: None
- **Border Radius**: `{rounded.xs}`
- **Hover State**: Background lightens slightly; color remains light
- **Focus State**: Outline ring as primary CTA

#### Tertiary (Outlined)

- **Background**: Transparent
- **Text Color**: `{colors.primary}` (`#161026`)
- **Border**: `1px solid {colors.neutral-5}` (`#CAC9C8`)
- **Padding**: `{spacing.md}` horizontal
- **Font**: GeistMono, `{typography.button-sm}`
- **Border Radius**: `{rounded.xs}`
- **Hover State**: Border color shifts to `color-mix(in oklab, {colors.accent-3} 50%, transparent)` (~50% opacity purple); background remains transparent or very light
- **Focus State**: Outline and ring as primary buttons

#### Text Button

- **Background**: Transparent
- **Text Color**: `{colors.primary}` (`#161026`)
- **Border**: None
- **Padding**: `{spacing.md}` horizontal, `{spacing.lg}` (`20px`) vertical
- **Font**: Suisse, `{typography.button-md}` (16px, weight 400, line-height 1.5)
- **Border Radius**: `{rounded.none}` (0px — no rounded corners on text buttons)
- **Hover State**: Color shifts toward `{colors.accent-3}` or text lifts slightly (`transform: translateY(-8%)`)
- **Focus State**: Focus ring applied; no outline width change

#### Icon Button

- **Background**: `oklab(0.999994 0.0000455678 0.0000200868 / 0.25)` (translucent white)
- **Text Color**: `{colors.neutral-2}` (`#FFFFFF`)
- **Dimensions**: 28px × 28px
- **Padding**: 0px
- **Font**: Suisse, 16px, weight 400
- **Border Radius**: `{rounded.xs}`
- **Hover State**: Opacity increases to 1.0; slight lift
- **Focus State**: Standard focus ring

### Cards & Containers

#### Standard Card

- **Background**: `{colors.neutral-2}` (`#FFFFFF`)
- **Border**: None or `1px solid {colors.neutral-4}` (`#E1DFDC`)
- **Border Radius**: `{rounded.lg}` (`7px`)
- **Box Shadow**: `{shadows.sm}` — `color(srgb 0.0705882 0.0666667 0.0627451 / 0.1) 0px 0px 65.8024px 0px` (soft diffuse shadow for depth)
- **Padding**: `{spacing.lg}` to `{spacing.xl}` (`20px–24px`)
- **Hover State**: Slight scale or shadow increase; opacity `1.0`

#### Band / Section Container

- **Background**: `{colors.surface-alt}` (`#ECEAE6`) (alternating) or `{colors.canvas}` (default)
- **Border**: None
- **Border Radius**: `{rounded.none}`
- **Padding**: `{spacing.band}` (`48px`) vertical; `{spacing.section}` (`40px`) horizontal (responsive: `{spacing.md}` on mobile)
- **Box Shadow**: None (flat design on bands)

#### Modal / Overlay

- **Background**: `{colors.neutral-2}` with overlay backdrop at `0.14` opacity
- **Border Radius**: `{rounded.md}` (`5.35px`)
- **Box Shadow**: `{shadows.lg}` — `rgba(0, 0, 0, 0.08) 0px 0px 32px 0px`
- **Z-Index**: 999999 (toast layer)

### Inputs & Forms

#### Text Input / Field

- **Background**: `{colors.neutral-2}` (`#FFFFFF`)
- **Border**: `1px solid {colors.neutral-4}` (`#E1DFDC`)
- **Text Color**: `{colors.primary}` (`#161026`)
- **Placeholder Color**: `{colors.neutral-3}` (`#686766`)
- **Padding**: `{spacing.md}` (`16px`)
- **Font**: Suisse, `{typography.body-md}` (15px, weight 400)
- **Border Radius**: `{rounded.xs}`
- **Focus State**: Border color becomes `{colors.accent-3}` (`#8033EB`); outline `1.5px solid {colors.accent-3}`; ring `0px 0px 0px 10px rgba(128, 51, 235, 0.2)`
- **Hover State**: Border color lightens to `color-mix(in oklab, {colors.accent-3} 50%, transparent)` or `{colors.neutral-5}`
- **Disabled State**: Opacity `0.2`; background `{colors.surface-alt}`

#### Checkbox / Radio

- **Unchecked**: Border `1px solid {colors.neutral-4}`; background transparent
- **Checked**: Background `{colors.accent-3}` (`#8033EB`); checkmark `{colors.neutral-2}`
- **Border Radius**: `{rounded.xs}` (checkboxes); `{rounded.full}` (radios)
- **Focus State**: Ring shadow `0px 0px 0px 10px rgba(128, 51, 235, 0.2)`
- **Hover State**: Border shifts to `color-mix(in oklab, {colors.accent-3} 50%, transparent)`

### Navigation

#### Header Nav

- **Background**: Transparent (overlays page, no bg color)
- **Text Color**: `{colors.primary}` (`#161026`)
- **Height**: 68px
- **Font**: Suisse, `{typography.button-md}` (16px, weight 400)
- **Padding**: 0px
- **Border**: None
- **Box Shadow**: None (flat header)
- **Link Hover**: Color shifts to `{colors.accent-3}` or text brightens
- **Focus State**: Outline ring `1.5px solid {colors.accent-3}`

#### Link (Default)

- **Background**: `{colors.accent-2}` (`#251742`)
- **Text Color**: `{colors.canvas}` (`#F4F2EC`)
- **Padding**: 0px
- **Font**: Suisse, `{typography.button-md}`
- **Border Radius**: `{rounded.xs}`
- **Hover State**: Color transitions to `{colors.primary}` or background darkens
- **Focus State**: Outline + ring as buttons

#### Link (Small, In-Text)

- **Background**: Transparent
- **Text Color**: `{colors.primary}` (`#161026`)
- **Padding**: `{spacing.xs}` (`8px`) horizontal, `{spacing.sm}` (`12px`) vertical
- **Font**: Suisse, `{typography.body-sm}` (14px, weight 400)
- **Border Radius**: `{rounded.xs}`
- **Hover State**: Color shifts toward `{colors.accent-3}` or underline appears
- **Focus State**: Outline ring

### Footer

#### Footer Container

- **Background**: `{colors.primary}` (`#161026`)
- **Text Color**: `{colors.canvas}` (`#F4F2EC`)
- **Border Top**: `1px solid {colors.accent-2}` (`#251742` — decorative purple accent)
- **Padding**: `{spacing.band}` (`48px`) vertical, `{spacing.xxxl}` (`32px`) horizontal
- **Font**: Suisse, `{typography.body-md}` (15px, weight 400)
- **Border Radius**: `{rounded.none}`

## 5. Layout Principles

### Spacing System

Roboflow employs a base unit of `4px`, scaled in increments aligned to rhythm and breathing room:

- `{spacing.xxs}` (`4px`) — Fine gutters between tight components
- `{spacing.xs}` (`8px`) — Button/input padding, compact layouts
- `{spacing.sm}` (`12px`) — Small gaps, secondary spacing
- `{spacing.md}` (`16px`) — Default padding inside buttons, form fields, standard gutters
- `{spacing.lg}` (`20px`) — Section dividers, moderate spacing
- `{spacing.xl}` (`24px`) — Component padding, larger gaps
- `{spacing.xxl}` (`28px`) — Band/section spacing
- `{spacing.xxxl}` (`32px`) — Large padding, footer columns
- `{spacing.section}` (`40px`) — Section horizontal padding on desktop
- `{spacing.band}` (`48px`) — Full-width band vertical padding

**Usage Context**: Buttons use `{spacing.md}`; cards use `{spacing.lg}–{spacing.xl}`; sections stack with `{spacing.band}` padding-y and `{spacing.section}` padding-x (responsive down to `{spacing.md}` on mobile).

### Grid & Container

- **Max Width**: 1376px content column at 1440px viewport (16px horizontal padding on each side)
- **Responsive Columns**: 
  - Mobile (375px): 343px content, 4-column grid, `{spacing.md}` padding
  - Tablet (768px): 720px content, 5-column grid, `{spacing.xl}` padding
  - Desktop (1024px+): 960px–1376px content, 3–5 column grid, `{spacing.section}` padding
- **Section Pattern**: Full-width band with alternating background (`{colors.canvas}` / `{colors.surface-alt}`), centered content container, `{spacing.band}` top/bottom padding

### Whitespace Philosophy

Spacing is generous and intentional, guiding users through annotation workflows without visual clutter. Headings float above body text with 1.2–1.4× line heights; sections breathe with ample band padding (`48px`); cards use internal `20–24px` padding. Negative space creates hierarchy: larger gaps between major sections, smaller gaps within component groups. The warm canvas background (`{colors.canvas}`) softens large whitespace areas, preventing them from feeling sterile.

### Border Radius Scale

- `{rounded.none}` (`0px`) — Text buttons, headers, full-width sections (sharp edges for structural elements)
- `{rounded.xs}` (`4px`) — Buttons, inputs, small interactive elements (default radius for actionable items)
- `{rounded.sm}` (`4.01px`) — Badges, chips (minimal roundness for tightness)
- `{rounded.md}` (`5.35px`) — Modal overlays, popovers (slightly softer for floating surfaces)
- `{rounded.lg}` (`7px`) — Cards, containers (approachable, modern feel)
- `{rounded.xl}` (`8.03px`) — Rare; 8px components or custom elevations
- `{rounded.full}` (`9999px`) — Avatars, circular elements

### Border Widths

- **Thin** (`1px` / `{rounded.thin}`): Applied to card borders, input fields, dividers, and section band top borders. Maintains visual crispness without heaviness.

## 6. Depth & Elevation

| Level | Treatment | Use | CSS Box Shadow |
|---|---|---|---|
| Flat | No shadow | Buttons, text, header, bands | None |
| Card | Sm shadow | Elevated containers, floating surfaces | `color(srgb 0.0705882 0.0666667 0.0627451 / 0.1) 0px 0px 65.8024px 0px` |
| Dropdown | Md shadow | Menus, popovers, tooltips | `color(srgb 0.0745098 0.0745098 0.0705882 / 0.1) 0px 2px 8px 0px` |
| Modal | Lg shadow | Modals, overlays, high-z surfaces | `rgba(0, 0, 0, 0.08) 0px 0px 32px 0px` |

**Shadow Philosophy**: Roboflow employs a **layered-micro** strategy. Rather than discrete shadow jumps, the system uses soft, diffuse shadows (65px blur on cards, 32px on modals) to suggest gentle lift without visual drama. Shadows use very low opacity (8–10%) and are warm-tinted, matching the brand's color temperature. This approach keeps focus on content while subtly communicating depth and layering for complex workflows like image annotation.

### Opacity Levels

- **Disabled** (`0.2` / 20%): Applied to disabled buttons, inputs, and inactive states. Signals unavailability without removing visual presence.
- **Overlay / Soft** (`0.14` / 14%): Modal backdrop, semi-transparent fills behind floating surfaces.
- **Hover Soft** (`0.5` / 50%): Hover state backgrounds; blend mode or opacity applied to create subtle interaction feedback.
- **Hover Medium** (`0.6` / 60%): Stronger hover feedback; used on text color shifts or background highlights.
- **Hover Strong** (`0.9` / 90%): Near-opaque hover fill; applied to primary CTA or high-emphasis interactions.

### Z-Index / Layering

- **Base** (`1`, `2`): Page body, static content, sections
- **Dropdown** (`10`, `20`, `50`): Menus, popovers, secondary layers above base (progressively higher for nested dropdowns)
- **Toast / Modal** (`999999`): Notifications, full-screen overlays, topmost layer

## 7. Do's and Don'ts

### Do

- **Use the purple accent** (`{colors.accent-3}` — `#8033EB`) for all primary calls-to-action (buttons, links, focus states). It signals intent and guides users through workflows.
- **Apply generous padding and line heights** across all text. Roboflow's readability comes from breathing room: 1.35+ on body, 1.4+ on large text.
- **Maintain negative letter-spacing on display sizes**. The compressed tracking (`-1.68px` on 56px, `-1.1px` on 44px) is a defining brand trait; do not normalize it.
- **Use GeistMono sparingly** for UI labels (buttons, code tokens, status labels) to reinforce technical precision. Do not apply it to body paragraphs.
- **Stack shadows subtly**: Card shadow should feel gentle (`65.80px` blur), not dramatic. Modals may be slightly more prominent (`32px` blur), but avoid harsh shadows.
- **Group interactive elements** (buttons, inputs, links) with consistent `{spacing.md}` padding and `{rounded.xs}` radius for cohesion.
- **Respect the canvas background** (`{colors.canvas}` — `#F4F2EC`). Warm off-white is the default; use `{colors.surface-alt}` for subtle contrast, not jarring division.
- **Test focus states on all interactive elements.** Outline `1.5px solid {colors.accent-3}` with ring shadow `rgba(128, 51, 235, 0.2) 0px 0px 0px 10px` ensures keyboard navigation accessibility.

### Don't

- **Do not invent new colors outside the palette.** Every color must come from the extracted set (primary, accent-1–3, canvas, surface-alt, hairline, neutral-1–5).
- **Do not use status-based colors (red/green/yellow) for error/success/warning states.** The brand does not expose a semantic status ramp; use opacity, shape, or text alone to signal state.
- **Do not apply heavy shadows** to all components. Reserve `{shadows.sm}` for cards, `{shadows.md}` for dropdowns, `{shadows.lg}` for modals. Buttons remain flat (no shadow).
- **Do not mix serif and sans-serif.** Suisse is primary; GeistMono is accent. Never introduce a third typeface.
- **Do not use `{rounded.none}`** on interactive elements like buttons or inputs. The sharp edge belongs to headers and structural sections.
- **Do not exceed weight 500** in typography. The system uses 400 (regular), 450 (headings), and 500 (bold/emphasis). Heavier weights feel out of brand.
- **Do not round letter-spacing on display sizes.** The negative tracking (`-1.68px`, `-1.1px`) is precise; approximate values damage the premium feel.
- **Do not skip hover/focus states.** Interactive elements must respond to user input with color, opacity, or transform shifts. Flat, non-responsive UI feels incomplete.

## 8. Responsive Behavior

### Breakpoints

| Viewport | Content Width | Grid Columns | Nav Visible | Menu Toggle | Display Large | Body Md | Section Padding-X |
|---|---|---|---|---|---|---|---|
| 375px (Mobile) | 343px | 4 | 40 chars | Yes | 36px | 16px | 16px |
| 768px (Tablet) | 720px | 5 | 42 chars | Yes | 48px | 16px | 24px |
| 1024px (Desktop) | 960px | 5 | 42 chars | Yes | 56px | 16px | 32px |
| 1280px+ (Large Desktop) | 1216px | 3 | 44 chars | Yes | 56px | 16px | 32px |
| 1440px+ (XL) | 1376px | 3 | 44 chars | Yes | 56px | 16px | 32px |

**Key Changes by Breakpoint**:
- **375px→768px**: Content column grows from 343px to 720px; display heading shrinks 56px→48px; section padding-x increases from 16px to 24px.
- **768px→1024px**: Display heading grows back to 56px; grid stabilizes at 5 columns; padding-x increases to 32px.
- **1024px→1280px+**: Content stabilizes at 1216–1376px; grid tightens to 3 columns; nav remains consistent.

### Touch Targets

- **Minimum interactive size**: 36px × 36px (buttons, icon buttons)
- **Compact interactive**: 28px × 28px (icon buttons in tight contexts, e.g., toolbar)
- **Link spacing**: 12px–16px vertical padding to ensure tappable area

### Collapsing Strategy

- **Typography**: Display Large (`56px`) collapses to `36px` on mobile; Body Medium (`15px`) remains stable across breakpoints.
- **Spacing**: Section padding-x collapses from `{spacing.section}` (`40px`) to `{spacing.md}` (`16px`) below 768px.
- **Grid**: Mobile (375px) uses 4 columns; tablet/desktop expand to 5–3 columns. Single-column layouts are introduced for full-width card stacks.
- **Navigation**: Header nav remains visible at all breakpoints; menu toggle always present (though link count fluctuates slightly).
- **Cards**: Card padding remains `{spacing.lg}–{spacing.xl}` across all sizes; width scales proportionally to viewport.

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA / Interactive**: Purple Accent (`{colors.accent-3}` — `#8033EB`)
- **Page Background**: Canvas (`{colors.canvas}` — `#F4F2EC`)
- **Heading / Primary Text**: Primary Ink (`{colors.primary}` — `#161026`)
- **Borders / Dividers**: Hairline (`{colors.hairline}` — `#C29AF6`)
- **Secondary Surfaces**: White (`{colors.neutral-2}` — `#FFFFFF`)
- **Disabled / Muted**: Neutral-3 (`{colors.neutral-3}` — `#686766`)
- **Decorative Accent**: Sage (`{colors.accent-1}` — `#9EE3BB`), Deep Purple (`{colors.accent-2}` — `#251742`)

### Iteration Guide

1. **All buttons use** `{spacing.md}` padding and `{rounded.xs}` border-radius. Primary CTA is always `{colors.accent-3}` background with `{colors.canvas}` text. Hover state darkens the background; focus state adds outline ring `1.5px solid` + `10px` shadow.

2. **Headings and display text apply negative letter-spacing precisely**: `{typography.display-lg}` is `-1.68px`, `{typography.display-md}` is `-1.1px`. Do not round or omit; this is a brand signature.

3. **GeistMono is reserved for UI labels** (button text, code tokens, status badges). Body paragraphs always use Suisse. Monospace conveys technical precision; humanist serif-free fonts convey clarity.

4. **Card shadows use `{shadows.sm}`** with `65.8024px` blur and 10% opacity. Modal/overlay shadows use `{shadows.lg}` with `32px` blur and 8% opacity. Buttons remain flat (no shadow).

5. **Spacing between sections is `{spacing.band}` (48px)** vertical; padding within sections is `{spacing.section}` (40px) horizontal, collapsing to `{spacing.md}` (16px) on mobile. Compact component spacing is `{spacing.md}` (16px).

6. **All interactive elements (buttons, inputs, links) have focus states**: outline `1.5px solid {colors.accent-3}`, ring shadow `rgba(128, 51, 235, 0.2) 0px 0px 0px 10px`. These are mandatory for accessibility.

7. **Opacity levels for states**:
   - Disabled: `0.2`
   - Overlay: `0.14`
   - Hover soft: `0.5`
   - Hover medium: `0.6`

8. **Backgrounds alternate between `{colors.canvas}` and `{colors.surface-alt}`** across full-width bands. Do not introduce new background colors; contrast comes from subtle hue shift, not dramatic color swaps.

## 10. Known Gaps

- **No semantic status colors**: The site does not expose error, success, warning, or info states. Do not invent a red/green/yellow ramp; rely on text, icons, or opacity to signal state.
- **No gradients or mesh overlays detected**: The design system is built on solid colors and color-blocking. If gradients appear in marketing imagery, they are decorative, not part of the component library.
- **Interaction states (active, disabled, focus)**: Full state behavior (e.g., "active" button styling, multi-step disabled feedback) was not completely captured from the live site; hover and focus states are documented, but subtle press/active states may exist beyond extraction scope.
- **Dark mode not observed**: Only one theme (light, warm canvas) was measured. If a dark variant exists, it is either behind authentication or not deployed on the homepage.
- **8 decorative colors with no functional role**: `{colors.accent-1}`, `{colors.accent-2}`, and several neutral values have no measured use case in buttons, form states, or feedback. They appear in hero imagery or band overlays but are not assigned semantic meaning.
- **Component coverage limited to homepage**: Extraction analyzed only the public Roboflow Annotate landing page. Complex interior UI (e.g., the annotation canvas, advanced settings, admin panels) was not visited.
- **Sub-pixel typography values**: Several sizes (e.g., 12.78px, 8.60px, 9.17px) were measured but are non-standard. Implement as specified; rounding may degrade hierarchy.
- **Opacity and blend modes**: The system uses opacity shifts for state feedback, but detailed blend mode behavior (e.g., `mix-blend-mode`) was not extracted; document as observed or omit if unsupported.