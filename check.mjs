import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { runInNewContext } from 'node:vm'

const [html, css, js, portrait, cvEs, cvEn] = await Promise.all([
  readFile('index.html', 'utf8'),
  readFile('styles.css', 'utf8'),
  readFile('motion.js', 'utf8'),
  readFile('assets/daniel-martinez-studio.jpg'),
  readFile('assets/Daniel_Martinez_CV_ES_ATS.pdf'),
  readFile('assets/Daniel_Martinez_CV_EN_ATS.pdf')
])

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex')

assert.match(html, /Daniel<br>Martinez/)
assert.match(html, /Horus Optic/)
assert.match(html, /horusoptic\.com\.co/)
assert.match(html, /demo local de alquileres/)
assert.equal((html.match(/class="project-card"/g) || []).length, 4)
assert.equal((html.match(/class="project-detail"/g) || []).length, 4)
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

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
assert.equal(ids.length, new Set(ids).size, 'IDs must be unique')
for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(target), `Missing anchor: ${target}`)
for (const [, asset] of html.matchAll(/(?:src|href)="(assets\/[^"?#]+)"/g)) assert.ok((await readFile(asset)).length > 0, asset)
for (const [, asset] of css.matchAll(/url\(['"]?(assets\/[^)'"?#]+)/g)) assert.ok((await readFile(asset)).length > 0, asset)
for (const [link] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(link, /rel="noopener noreferrer"/)
assert.ok((await readFile('assets/studio-workshop.webp')).length < 350_000)

// ponytail: small DOM stand-ins exercise behaviour without adding a test framework.
function element(dataset = {}, attrs = {}) {
  const listeners = {}, classes = new Set(), properties = {}
  return { dataset, attrs, listeners, hidden: false, textContent: '', style: { setProperty: (key, value) => { properties[key] = value }, properties },
    classList: { toggle: (name, on) => on ? classes.add(name) : classes.delete(name), contains: name => classes.has(name) },
    setAttribute: (key, value) => { attrs[key] = value }, getAttribute: key => attrs[key], removeAttribute: key => { delete attrs[key] },
    addEventListener: (name, fn) => { listeners[name] = fn }, getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }) }
}
function exercise({ reduced = false, saved = null, blocked = false, saveData = false } = {}) {
  const body = element({ lang: 'es' }), scene = element(), toggle = element(), alternate = element(), es = element(), en = element()
  toggle.querySelector = selector => selector.includes('"es"') ? es : en
  const languages = ['es', 'en'].map(language => element({ language })), cv = [element(), element()]
  const image = element({ altEs: 'Estudio', altEn: 'Workshop' }), label = element({ labelEs: 'Principal', labelEn: 'Main' })
  const systems = ['erp', 'agents', 'apis'].map(system => element({ system }))
  const panels = systems.map(item => element({ systemPanel: item.dataset.system }))
  const sections = ['proyecto', 'laboratorio', 'perfil'].map(id => ({ ...element(), id }))
  const links = sections.map(section => element({}, { href: `#${section.id}` }))
  const media = { matches: reduced, addEventListener() {} }, observers = []
  const document = { body, documentElement: {}, hidden: false, addEventListener() {},
    querySelector: selector => ({ '#motion-toggle': toggle, '.hero': element(), '.studio-scene': scene, '[data-cv-alternate]': alternate }[selector] || sections.find(section => `#${section.id}` === selector)),
    querySelectorAll: selector => ({ '[data-language]': languages, '[data-cv-link], [data-cv-primary]': cv, '[data-system]': systems, '[data-system-panel]': panels, '.nav-pill a': links, '[data-alt-en]': [image], '[data-label-en]': [label] }[selector] || []) }
  class Observer { constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this) } observe() {} }
  const storage = { getItem() { if (blocked) throw Error('blocked'); return saved }, setItem() { if (blocked) throw Error('blocked') } }
  runInNewContext(js, { document, navigator: { connection: { saveData } }, window: { matchMedia: query => query.includes('reduced') ? media : { matches: true, addEventListener() {} }, IntersectionObserver: Observer }, IntersectionObserver: Observer, localStorage: storage })
  assert.equal(body.dataset.lang, saved === 'en' ? 'en' : 'es')
  languages[1].listeners.click()
  assert.equal(document.documentElement.lang, 'en')
  assert.equal(image.attrs.alt, 'Workshop')
  assert.equal(label.attrs['aria-label'], 'Main')
  assert.equal(cv[0].attrs.href, 'assets/Daniel_Martinez_CV_EN_ATS.pdf')
  assert.equal(alternate.href, 'assets/Daniel_Martinez_CV_ES_ATS.pdf')
  assert.equal(languages[1].attrs['aria-pressed'], 'true')
  languages[0].listeners.click()
  assert.equal(image.attrs.alt, 'Estudio')
  assert.equal(cv[1].attrs.href, 'assets/Daniel_Martinez_CV_ES_ATS.pdf')
  for (const button of systems) {
    button.listeners.click()
    assert.equal(panels.filter(panel => !panel.hidden).length, 1)
    assert.equal(panels.find(panel => !panel.hidden).dataset.systemPanel, button.dataset.system)
    assert.equal(button.attrs['aria-pressed'], 'true')
  }
  scene.listeners.pointermove({ clientX: 100, clientY: 100 })
  assert.equal(scene.style.properties['--tilt-x'] || '0deg', reduced || saveData ? '0deg' : '2.5deg')
  toggle.listeners.click()
  assert.equal(toggle.attrs['aria-pressed'], 'true')
  assert.equal(scene.style.properties['--tilt-x'], '0deg')
  assert.equal(toggle.disabled, reduced || saveData)
  toggle.listeners.click()
  assert.equal(body.classList.contains('motion-paused'), false)
  observers[0].callback([{ isIntersecting: false }])
  assert.equal(body.classList.contains('motion-paused'), true)
  observers[1].callback([{ target: sections[1], isIntersecting: true }])
  assert.doesNotMatch(observers[1].options.rootMargin, /%/, 'Vertical percentage margins can collapse the observer on wide screens')
  assert.equal(links[1].attrs['aria-current'], 'location')
  observers[1].callback([{ target: sections[1], isIntersecting: false }])
  assert.equal(links[1].attrs['aria-current'], undefined)
}
exercise()
exercise({ reduced: true, saved: 'en' })
exercise({ blocked: true, saveData: true })

console.log('Portfolio self-check passed: assets, identity, links, ES/EN, panels, motion, storage and navigation.')
