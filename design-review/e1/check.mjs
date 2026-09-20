import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const read = path => readFile(resolve(root, path))
const [htmlBuffer, cssBuffer, jsBuffer, portrait, esCv, enCv] = await Promise.all([
  read('index.html'), read('styles.css'), read('motion.js'),
  read('assets/daniel-martinez-studio.jpg'),
  read('assets/Daniel_Martinez_CV_ES_ATS.pdf'), read('assets/Daniel_Martinez_CV_EN_ATS.pdf')
])
const html = htmlBuffer.toString('utf8')
const css = cssBuffer.toString('utf8')
const js = jsBuffer.toString('utf8')

assert.match(html, /<meta name="viewport"/)
assert.match(html, /<h1 id="hero-title">/)
assert.match(html, /data-language="es"/)
assert.match(html, /Daniel_Martinez_CV_ES_ATS\.pdf/)
assert.match(`${html}\n${js}`, /Daniel_Martinez_CV_EN_ATS\.pdf/)
assert.match(html, /ASK Painting/)
assert.match(html, /Colegio Santa Rosa de Lima/)
assert.match(html, /assets\/daniel-martinez-studio\.jpg/)
assert.match(html, /alt="Retrato de Daniel Martinez"/)
assert.match(html, /askpainting\.com\.au/)
assert.match(html, /colegiosantarosadelimasoacha\.edu\.co/)
assert.doesNotMatch(html, /candidat|candidato|likeness|semejanza/i)
assert.match(css, /prefers-reduced-motion/)
assert.match(js, /IntersectionObserver/)
assert.doesNotMatch(`${html}\n${js}`, /fetch\(|XMLHttpRequest|sendBeacon|\/api\//)
assert.equal(createHash('sha256').update(portrait).digest('hex'), 'beb1cba3a4e0aa12861752415946c1527ce02c94889f1c802149bd3bb8792db4')
assert.equal(createHash('sha256').update(esCv).digest('hex'), '45bfd45e86ec63b52225102118892594f345aa547958753413ae308707c74675')
assert.equal(createHash('sha256').update(enCv).digest('hex'), 'af1a98dee75bb03a5480618ab880586221b363d7ed88df6fd6daeb7df8eeb553')
console.log('Portfolio E1 self-check passed.')
