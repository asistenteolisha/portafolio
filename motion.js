(() => {
  'use strict'
  const body = document.body
  const toggle = document.querySelector('#motion-toggle')
  const hero = document.querySelector('.hero')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const connection = navigator.connection
  let pausedByUser = false
  let heroVisible = true
  const scene = document.querySelector('.studio-scene')
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')

  function updateCvLinks(language) {
    const file = language === 'en' ? 'assets/Daniel_Martinez_CV_EN_ATS.pdf' : 'assets/Daniel_Martinez_CV_ES_ATS.pdf'
    document.querySelectorAll('[data-cv-link], [data-cv-primary]').forEach(link => link.setAttribute('href', file))
    const alternate = document.querySelector('[data-cv-alternate]')
    alternate.href = language === 'en' ? 'assets/Daniel_Martinez_CV_ES_ATS.pdf' : 'assets/Daniel_Martinez_CV_EN_ATS.pdf'
    alternate.textContent = language === 'en' ? 'CV en español ↗' : 'CV in English ↗'
  }

  function updateMotion() {
    const motionOff = reduced.matches || Boolean(connection && connection.saveData)
    body.classList.toggle('motion-off', motionOff)
    body.classList.toggle('motion-paused', pausedByUser || document.hidden || !heroVisible)
    body.classList.toggle('motion-user-paused', pausedByUser)
    toggle.disabled = motionOff
    toggle.setAttribute('aria-pressed', String(motionOff || pausedByUser))
    const spanish = body.dataset.lang !== 'en'
    toggle.querySelector('[data-copy="es"]').textContent = motionOff ? 'Movimiento reducido' : pausedByUser ? 'Activar movimiento' : 'Pausar movimiento'
    toggle.querySelector('[data-copy="en"]').textContent = motionOff ? 'Reduced motion' : pausedByUser ? 'Resume motion' : 'Pause motion'
    toggle.setAttribute('aria-label', spanish ? toggle.querySelector('[data-copy="es"]').textContent : toggle.querySelector('[data-copy="en"]').textContent)
    if (motionOff || pausedByUser || !heroVisible || document.hidden) resetTilt()
  }

  function resetTilt() {
    scene.style.setProperty('--tilt-x', '0deg')
    scene.style.setProperty('--tilt-y', '0deg')
  }

  function setLanguage(language) {
    body.dataset.lang = language
    document.documentElement.lang = language
    document.querySelectorAll('[data-alt-en]').forEach(item => item.setAttribute('alt', language === 'en' ? item.dataset.altEn : item.dataset.altEs))
    document.querySelectorAll('[data-label-en]').forEach(item => item.setAttribute('aria-label', language === 'en' ? item.dataset.labelEn : item.dataset.labelEs))
    document.querySelectorAll('[data-language]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.language === language)))
    updateCvLinks(language)
    updateMotion()
    // ponytail: preferences are optional; blocked storage must never break navigation.
    try { localStorage.setItem('portfolio-language', language) } catch {}
  }

  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.language === 'en' ? 'en' : 'es'))
  })

  document.querySelectorAll('[data-system]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-system]').forEach(item => item.setAttribute('aria-pressed', String(item === button)))
      document.querySelectorAll('[data-system-panel]').forEach(panel => { panel.hidden = panel.dataset.systemPanel !== button.dataset.system })
    })
  })

  // ponytail: a light CSS tilt gives the illustration depth without a WebGL runtime.
  scene.addEventListener('pointermove', event => {
    if (!pointer.matches || reduced.matches || connection?.saveData || pausedByUser || document.hidden || !heroVisible) return
    const rect = scene.getBoundingClientRect()
    scene.style.setProperty('--tilt-x', `${((event.clientX - rect.left) / rect.width - 0.5) * 5}deg`)
    scene.style.setProperty('--tilt-y', `${((event.clientY - rect.top) / rect.height - 0.5) * -4}deg`)
  })
  scene.addEventListener('pointerleave', resetTilt)
  pointer.addEventListener('change', resetTilt)
  toggle.addEventListener('click', () => { pausedByUser = !pausedByUser; updateMotion() })
  reduced.addEventListener('change', updateMotion)
  document.addEventListener('visibilitychange', updateMotion)
  if (connection && connection.addEventListener) connection.addEventListener('change', updateMotion)
  if ('IntersectionObserver' in window && hero) {
    const observer = new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; updateMotion() }, { threshold: 0.05 })
    observer.observe(hero)
    const navLinks = [...document.querySelectorAll('.nav-pill a')]
    const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')))
    const active = new Set()
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? active.add(entry.target.id) : active.delete(entry.target.id))
      const current = sections.find(section => active.has(section.id))
      navLinks.forEach(link => {
        if (current && link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      })
    }, { rootMargin: '-110px 0px -140px 0px' })
    sections.forEach(section => navObserver.observe(section))
  }
  let savedLanguage = 'es'
  try { if (localStorage.getItem('portfolio-language') === 'en') savedLanguage = 'en' } catch {}
  setLanguage(savedLanguage)
})()
