# Portfolio E1 Design

## Direction

- Register: brand.
- Color strategy: restrained, cool pearl and navy with one controlled blue accent.
- Scene: a recruiter reviews a candidate's work on a bright laptop between interviews and needs the role, evidence and CV in under ninety seconds.
- Anchors: an engineered case-study sheet, an architectural process drawing and the supplied Daniel motion prototype.
- Voice words: measured, tactile, exact.

## Tokens

- Background: `oklch(0.977 0.008 255)`.
- Surface: `oklch(0.995 0.004 255)`.
- Ink: `oklch(0.29 0.055 255)`.
- Muted ink: `oklch(0.47 0.035 255)`.
- Accent: `oklch(0.47 0.115 255)`.
- Accent strong: `oklch(0.37 0.115 255)`.
- Border: `oklch(0.87 0.018 255)`.
- Focus: `oklch(0.61 0.17 255)`.

## Typography

Use the native `Segoe UI Variable`/system stack to keep the isolated composition offline and stable. A single family is intentional: weight, width, scale and spacing create hierarchy. Body remains 16–18px with a maximum measure of 68ch; the hero uses a bounded fluid scale.

## Grid and Components

Mobile-first 4px spacing base. The desktop hero is an asymmetric two-column grid, with copy slightly dominant and the portrait framed as evidence rather than decoration. Navigation, language switch, two CV links, one primary case, two compact client-work cards and the motion control form the E1 composition. At narrow widths the order becomes copy, actions, portrait and work evidence.

## CTA

Primary: view the selected project. Secondary: open the Spanish CV. The English CV and language switch remain visible in the header. Links state their destination and never simulate unfinished pages.

## Motion

One slow background route field built with CSS/SVG. Motion pauses manually, when the page is hidden and when the hero leaves the viewport. `prefers-reduced-motion` and save-data produce the same legible static composition. Text, portrait and CTAs never move continuously.

## Preserve and Change

Preserve Daniel's real projects, contact identity and direct CV access. Replace the old neon language, unsupported counters, text residue and anonymous `DM` avatar in E2 only, after this direction is approved. The portrait is an identity-preserving, AI-assisted studio edit derived from Daniel's user-supplied photograph.
