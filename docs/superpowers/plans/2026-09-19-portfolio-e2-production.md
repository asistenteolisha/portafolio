# Portfolio E2 Production Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the published-entry source with the approved E1 portfolio direction and Daniel's user-supplied real photograph, without deploying remotely.

**Architecture:** Keep the existing static deployment model. Promote the approved isolated HTML/CSS/JS into root production files, copy the two verified CV PDFs, and create a compressed JPEG from the supplied PNG without generative edits. Keep the review composition aligned with the corrected portrait.

**Tech Stack:** HTML, CSS, browser JavaScript, Node.js standard-library assertions, PowerShell/.NET image encoding, Python loopback server for browser verification.

---

### Task 1: Add the production canary

**Files:**
- Create: `check.mjs`

- [ ] **Step 1: Write the failing structural check**

```js
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const [html, css, js] = await Promise.all([
  readFile('index.html', 'utf8'),
  readFile('styles.css', 'utf8'),
  readFile('motion.js', 'utf8')
])
assert.match(html, /Convierto procesos de negocio/)
assert.match(html, /assets\/daniel-martinez\.jpg/)
assert.match(html, /ASK Painting/)
assert.match(html, /Colegio Santa Rosa de Lima/)
assert.doesNotMatch(html, /noindex|Retrato candidato|Data Analyst & AI Agent Orchestrator/)
assert.match(css, /prefers-reduced-motion/)
assert.match(js, /IntersectionObserver/)
```

- [ ] **Step 2: Run the canary and confirm it fails before implementation**

Run: `node check.mjs`

Expected: failure because the approved root CSS/JS/photo do not exist yet.

### Task 2: Prepare the exact supplied portrait and verified documents

**Files:**
- Create: `assets/daniel-martinez.jpg`
- Create: `assets/Daniel_Martinez_CV_ES_ATS.pdf`
- Create: `assets/Daniel_Martinez_CV_EN_ATS.pdf`
- Create: `design-review/e1/assets/daniel-martinez.jpg`
- Modify: `design-review/e1/index.html`
- Modify: `design-review/e1/styles.css`

- [ ] **Step 1: Encode the supplied 1533×2048 PNG as a 960 px-wide JPEG**

Use `.NET System.Drawing` with high-quality bicubic interpolation and JPEG quality 88. Do not generate, retouch or alter facial features. Write the same encoded bytes to the production and review asset paths.

- [ ] **Step 2: Copy the already-verified CV PDFs**

```powershell
Copy-Item design-review/e1/assets/Daniel_Martinez_CV_ES_ATS.pdf assets/
Copy-Item design-review/e1/assets/Daniel_Martinez_CV_EN_ATS.pdf assets/
```

- [ ] **Step 3: Correct review copy and image semantics**

Replace the candidate portrait reference with `assets/daniel-martinez.jpg`, use `alt="Retrato de Daniel Martinez"`, remove the likeness-warning caption and change the overlay to Daniel's name and location. Preserve intrinsic image dimensions.

### Task 3: Promote the approved composition to production

**Files:**
- Modify: `index.html`
- Create: `styles.css`
- Create: `motion.js`

- [ ] **Step 1: Copy the approved CSS and motion controller**

```powershell
Copy-Item design-review/e1/styles.css styles.css
Copy-Item design-review/e1/motion.js motion.js
```

- [ ] **Step 2: Replace the production HTML with the approved composition**

Start from `design-review/e1/index.html`, remove the local-review bar and `noindex`, add production title/description/Open Graph metadata, point portrait and CV references at root `assets/`, and keep GitHub/LinkedIn links already evidenced by the previous production page. Do not add analytics, forms, APIs, libraries or remote fonts.

- [ ] **Step 3: Run the canary and syntax checks**

Run:

```powershell
node check.mjs
node --check motion.js
node design-review/e1/check.mjs
git diff --check
```

Expected: all checks pass.

### Task 4: Verify in a real browser and commit

**Files:**
- Verify all changed root and `design-review/e1/**` files.

- [ ] **Step 1: Serve only on loopback**

Run: `python -m http.server 4177 --bind 127.0.0.1`

- [ ] **Step 2: Verify responsive and accessible behavior**

Check 360, 390, 768, 1280 and 1440 px; ES/EN; PDF links; keyboard focus; no overflow; manual/offscreen motion pause; no console errors; and no non-local resource requests.

- [ ] **Step 3: Review the exact staged paths**

Only root `index.html`, `styles.css`, `motion.js`, `check.mjs`, `assets/**`, the corrected E1 portrait references/assets and this plan may change. `vercel.json` remains byte-identical.

- [ ] **Step 4: Commit locally**

```powershell
git commit -m "feat: publish approved portfolio redesign"
```

Do not push, deploy, merge or modify DNS.
