# Visual asset provenance

Prepared in September 2026 for Daniel Martinez's portfolio. Asset filenames below are relative to `assets/`.

## Original illustration

`studio-workshop.webp` is an original image generated with the built-in image generation tool for this portfolio. It is not a photograph of a real office or a client project.

Generation brief, summarized: a warm, tactile miniature technology workshop with a wooden desk, monitor, laptop, books, plants, and a pegboard connecting commerce, data, AI, code, and automation symbols. Use cream, terracotta, olive, and dark blue materials, soft studio light, and a clean background.

Original output: `C:/Users/Rolito/.codex/generated_images/01a0b9fd-06ab-71b0-a336-ad91528f3949/exec-80e2b2ea-024b-4708-be66-7f27547dee33.png` (1448 × 1086). The web asset uses WebP quality 83, with no cropping, overlays, or compositional edits. No assets or code from David Heckhoff were copied.

## Project screenshots

These are real browser captures supplied through the computer-use workflow. They are not generated mockups. Original captures remain in `tmp/screenshots/`; their filenames end in `.png`, but the captured payloads are JPEG. They were decoded by format detection and encoded as WebP at quality 82, proportionally reduced only where needed to a maximum width of 1265 pixels. No crop, retouching, or content substitution was applied.

| Web asset | Capture | Source | Dimensions | Bytes |
| --- | --- | --- | --- | ---: |
| `studio-workshop.webp` | Original generated illustration | Local original described above | 1448 × 1086 | 173,400 |
| `horus-preview.webp` | `tmp/screenshots/horus.png` | [Horus Optic](https://www.horusoptic.com.co/) | 1265 × 712 | 54,346 |
| `agenc-preview.webp` | `tmp/screenshots/agenc.png` | [Agenc-IA](https://agenc-ia.com.co/) | 1265 × 711 | 46,088 |
| `ask-preview.webp` | `tmp/screenshots/ask.png` | [ASK Painting](https://askpainting.com.au/) | 1265 × 712 | 48,430 |
| `colegio-preview.webp` | `tmp/screenshots/colegio.png` | [Colegio Santa Rosa de Lima](https://www.colegiosantarosadelimasoacha.edu.co/) | 1265 × 712 | 86,048 |

Existing approved portrait assets and CV PDFs were not modified.

## Full illustration prompt

Use case: stylized-concept. Asset type: original hero illustration for a full-stack developer portfolio, not a screenshot or UI mockup. Primary request: an inviting miniature 3D digital workshop for a developer who builds ecommerce, business systems and AI integrations. Scene: an original sculptural, isometric desk vignette on a seamless warm ivory background #f6f1e8. Subject: broad rounded walnut desk on a small softly rounded terracotta platform, one beautiful dark navy monitor displaying tiny abstract cream and sage interface blocks (no readable text), a slim open laptop beside it, a cream mechanical keyboard, a small notebook and coffee cup. Behind the desk a three-dimensional pegboard with a few connected terracotta and sage modules evokes APIs and agent workflows. One potted architectural leafy plant balances the scene. Empty chair with deep navy upholstery, no people or characters. Style: high-end tactile 3D clay miniature, physical crafted materials, softly beveled edges, realistic soft global illumination, playful but mature, natural shadows, beautiful composition. Composition: isolated whole vignette, three-quarter view from above, landscape 4:3, all objects fully in frame with generous clean margins, scene fills 80% of frame. Palette warm ivory, walnut, burnt orange, sage green, deep ink navy. No neon, no glassmorphism, no lettering, no logos, no watermarks. Must be entirely original, do not reproduce another designer's room or assets.

## Self-hosted fonts

The variable WOFF2 files were downloaded from the official Google Fonts distribution. Only the Latin and Latin Extended subsets are included; these cover the site's Spanish and English text. The portfolio can serve these assets without contacting Google Fonts at runtime.

[Official CSS request](https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400..800&family=Manrope:wght@400..700&display=swap)

| Local file | Weight range | Bytes | Official binary |
| --- | --- | ---: | --- |
| `bricolage-grotesque-latin.woff2` | 400–800 | 41,344 | [Google Fonts](https://fonts.gstatic.com/s/bricolagegrotesque/v9/3y9H6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiawA1Xp.woff2) |
| `bricolage-grotesque-latin-ext.woff2` | 400–800 | 18,668 | [Google Fonts](https://fonts.gstatic.com/s/bricolagegrotesque/v9/3y9H6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiawDVXplDs.woff2) |
| `manrope-latin.woff2` | 400–700 | 24,836 | [Google Fonts](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2) |
| `manrope-latin-ext.woff2` | 400–700 | 15,120 | [Google Fonts](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggmxSuXd.woff2) |

Both families use the SIL Open Font License 1.1. Exact upstream license texts are included in `assets/BRICOLAGE-GROTESQUE-OFL.txt` and `assets/MANROPE-OFL.txt`:

- [Bricolage Grotesque upstream OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/OFL.txt), copyright 2022 The Bricolage Grotesque Project Authors.
- [Manrope upstream OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt), copyright 2018 The Manrope Project Authors.

Font-face declarations for a stylesheet in the project root:

```css
@font-face {
  font-family: "Bricolage Grotesque";
  font-style: normal;
  font-weight: 400 800;
  font-stretch: 100%;
  font-display: swap;
  src: url("assets/bricolage-grotesque-latin-ext.woff2") format("woff2");
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
  font-family: "Bricolage Grotesque";
  font-style: normal;
  font-weight: 400 800;
  font-stretch: 100%;
  font-display: swap;
  src: url("assets/bricolage-grotesque-latin.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url("assets/manrope-latin-ext.woff2") format("woff2");
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url("assets/manrope-latin.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

## Verification

All five WebP outputs were decoded successfully with Sharp, and their dimensions and byte sizes were checked. The hero is below the 350 KB target. Each font has the `wOF2` signature and its declared binary length matches its downloaded byte length. No image-processing dependency was added to this project; conversion used the existing bundled Sharp runtime.
