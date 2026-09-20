# Portfolio visual refresh — 20 September 2026

## Direction and scope

Daniel requested a more expressive portfolio inspired visually by David Heckhoff's site, adding his Horus Optic ecommerce and better representing ERP/agent work. This supersedes the earlier E1 restraint. The archived E1 remains unchanged.

The new direction is a tactile digital workshop: oversized personal name, warm paper, terracotta and sage, an original studio illustration, actual project captures, expandable case descriptions, a dark interactive systems section, the approved portrait and direct bilingual CV access. Bricolage Grotesque supplies a rounded, expressive display voice; Manrope provides a quieter reading voice. Both are self-hosted.

The inspiration is compositional, not source reuse: [reference site](https://david-hckh.com/), [reference repository and license](https://github.com/davidhckh/portfolio-2025/blob/main/license.md). No reference code, models, fonts, sounds, shaders or images were copied. The illustration is not a live 3D scene. Native CSS perspective, anchors and controls provide light interaction without introducing a framework or animation dependency.

## Evidence and content

- Horus Optic: published ecommerce, Next.js, TypeScript, Supabase, Wompi; catalogue, admin panel, cart, checkout, appointment and transactional-email code confirmed in the existing Horus repository and delivery documentation.
- Agenc-IA: published Vue/TypeScript site, public AI adviser, forms and APIs. Its CRM is a scoped pilot, not a claim of universal production readiness.
- ASK Painting: published Next.js site for Melbourne services, service-area pages, comparisons and quote journeys. No ranking or conversion result claimed.
- Colegio Santa Rosa de Lima: published React/TypeScript institutional site. Google Workspace responsibility preserved from Daniel's prior portfolio.
- Rental ERP: local Odoo demo with reservations by serial, delivery notes, deliveries and returns. Not live customer production. No client data or private ERP screenshots exposed.
- Hermes/CRM integration: deployed pilot documented 15 September, acceptance still scoped. Do not imply every workflow has final acceptance.

Four project screenshots were captured from their current public homepages through the browser on 20 September. See [asset provenance](visual-assets.md).

## Implementation and launch checks

1. Preserve portrait and both CV hashes, current domains and contact details.
2. Implement the gallery, native details, bilingual system selectors and language persistence.
3. Verify native anchors, accessible names, keyboard operation, images, fonts and no horizontal overflow at mobile/tablet/desktop widths.
4. Exercise language/CV switching, system panels, pause, reduced-motion, save-data and blocked-storage paths with `node check.mjs`.
5. Review preview, then deploy the linked portfolio project and check apex/www HTTPS plus live assets. Do not change DNS, environment variables or other sites.

The deployment contains only the public site and assets. `.vercelignore` excludes review archives, documents, output, temporary captures and checks.

## Local verification

- `node check.mjs` passed: asset existence, preserved CV/portrait hashes, four cases, anchor targets, external link safety, language/CV switching, accessible-label translations, system panels, motion preferences, blocked storage and navigation state.
- `node --check motion.js` and `git diff --check` passed.
- Browser reviewed at 320, 390, 768 and 1440px. Both languages fit without horizontal page or heading overflow. The 320px name scale was corrected during review.
- Native project details work by click and Enter; agent/API selectors show the corresponding content; navigation highlights the observed section; manual pause reports an actual paused animation state.
- All seven image instances load; browser console reports no warnings or errors. Reduced-motion and save-data branches are covered by the runnable check; reduced motion also has a CSS media fallback.
- Local screenshots are kept outside deployment in `tmp/screenshots/portfolio-desktop.jpg` and `tmp/screenshots/portfolio-full.jpg`.
