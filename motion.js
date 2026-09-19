(() => {
  'use strict'
  const body = document.body
  const toggle = document.querySelector('#motion-toggle')
  const hero = document.querySelector('.hero')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const connection = navigator.connection
  let pausedByUser = false
  let heroVisible = true

  function updateCvLinks(language) {
    const file = language === 'en' ? 'assets/Daniel_Martinez_CV_EN_ATS.pdf' : 'assets/Daniel_Martinez_CV_ES_ATS.pdf'
    document.querySelectorAll('[data-cv-link], [data-cv-primary]').forEach(link => link.setAttribute('href', file))
  }

  function updateMotion() {
    const motionOff = reduced.matches || Boolean(connection && connection.saveData)
    body.classList.toggle('motion-off', motionOff)
    body.classList.toggle('motion-paused', pausedByUser || document.hidden || !heroVisible)
    toggle.disabled = motionOff
    toggle.setAttribute('aria-pressed', String(motionOff || pausedByUser))
    const spanish = body.dataset.lang !== 'en'
    toggle.querySelector('[data-copy="es"]').textContent = motionOff ? 'Movimiento reducido' : pausedByUser ? 'Activar movimiento' : 'Pausar movimiento'
    toggle.querySelector('[data-copy="en"]').textContent = motionOff ? 'Reduced motion' : pausedByUser ? 'Resume motion' : 'Pause motion'
    toggle.setAttribute('aria-label', spanish ? toggle.querySelector('[data-copy="es"]').textContent : toggle.querySelector('[data-copy="en"]').textContent)
  }

  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      const language = button.dataset.language === 'en' ? 'en' : 'es'
      body.dataset.lang = language
      document.documentElement.lang = language
      document.querySelectorAll('[data-language]').forEach(item => item.setAttribute('aria-pressed', String(item === button)))
      updateCvLinks(language)
      updateMotion()
    })
  })

  toggle.addEventListener('click', () => { pausedByUser = !pausedByUser; updateMotion() })
  reduced.addEventListener('change', updateMotion)
  document.addEventListener('visibilitychange', updateMotion)
  if (connection && connection.addEventListener) connection.addEventListener('change', updateMotion)
  if ('IntersectionObserver' in window && hero) {
    const observer = new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; updateMotion() }, { threshold: 0.05 })
    observer.observe(hero)
  }
  updateCvLinks('es')
  updateMotion()
})()
