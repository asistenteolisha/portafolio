import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const [html, css, js, portrait, cvEs, cvEn] = await Promise.all([
  readFile('index.html', 'utf8'),
  readFile('styles.css', 'utf8'),
  readFile('motion.js', 'utf8'),
  readFile('assets/daniel-martinez-studio.jpg'),
  readFile('assets/Daniel_Martinez_CV_ES_ATS.pdf'),
  readFile('assets/Daniel_Martinez_CV_EN_ATS.pdf')
])

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex')

assert.match(html, /Convierto procesos de negocio/)
assert.match(html, /assets\/daniel-martinez-studio\.jpg/)
assert.match(html, /<link rel="canonical" href="https:\/\/agenciadia\.tech\/">/)
assert.match(html, /ASK Painting/)
assert.match(html, /Colegio Santa Rosa de Lima/)
assert.doesNotMatch(html, /noindex|Retrato candidato|Data Analyst & AI Agent Orchestrator/)
assert.match(css, /prefers-reduced-motion/)
assert.match(js, /IntersectionObserver/)
assert.doesNotMatch(`${html}\n${js}`, /fetch\s*\(|XMLHttpRequest|sendBeacon|\/api\//)
assert.equal(sha256(cvEs), '45bfd45e86ec63b52225102118892594f345aa547958753413ae308707c74675')
assert.equal(sha256(cvEn), 'af1a98dee75bb03a5480618ab880586221b363d7ed88df6fd6daeb7df8eeb553')
assert.equal(sha256(portrait), 'beb1cba3a4e0aa12861752415946c1527ce02c94889f1c802149bd3bb8792db4')
assert.ok(portrait.length > 100_000)

console.log('Portfolio production self-check passed.')
