import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const [html, css, js, portrait, cvEs, cvEn] = await Promise.all([
  readFile('index.html', 'utf8'),
  readFile('styles.css', 'utf8'),
  readFile('motion.js', 'utf8'),
  readFile('assets/daniel-martinez.jpg'),
  readFile('assets/Daniel_Martinez_CV_ES_ATS.pdf'),
  readFile('assets/Daniel_Martinez_CV_EN_ATS.pdf')
])

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex')

assert.match(html, /Convierto procesos de negocio/)
assert.match(html, /assets\/daniel-martinez\.jpg/)
assert.match(html, /ASK Painting/)
assert.match(html, /Colegio Santa Rosa de Lima/)
assert.doesNotMatch(html, /noindex|Retrato candidato|Data Analyst & AI Agent Orchestrator/)
assert.match(css, /prefers-reduced-motion/)
assert.match(js, /IntersectionObserver/)
assert.doesNotMatch(`${html}\n${js}`, /fetch\s*\(|XMLHttpRequest|sendBeacon|\/api\//)
assert.equal(sha256(cvEs), '1bb5f430887b763e0b1a0d1bb053bd625140e50105c454f5ffa7fe72cb6dd089')
assert.equal(sha256(cvEn), '7f7a48b230a7698b27ebc628d3e500c1acbe728276ae822607eddf6ae969d6ad')
assert.equal(sha256(portrait), '3b4efded5f76178624bb93f4d6e3c2f9db21f8cc77bc37299901c5723cbff9d1')
assert.ok(portrait.length > 100_000)

console.log('Portfolio production self-check passed.')
