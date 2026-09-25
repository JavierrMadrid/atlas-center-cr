import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

const isVisible = (element) =>
  Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length)

/**
 * Trap de foco genérico para diálogos y cajones.
 *
 * - Mueve el foco al abrir y lo devuelve al elemento que lo abrió al cerrar.
 * - Cicla Tab/Shift+Tab dentro del contenedor.
 * - Escape llama a `onClose`.
 * - Bloquea el scroll del body (`lockScroll`).
 *
 * Las opciones se leen de una ref para que callbacks inline no reinicien el
 * efecto (y robaran el foco en cada render).
 */
export function useFocusTrap(containerRef, options = {}) {
  const optionsRef = useRef(options)

  // Se sincroniza en un efecto declarado antes del trap: así el cleanup del
  // trap siempre lee las opciones de la última renderización en la que estuvo
  // activo, sin escribir refs durante el render.
  useEffect(() => {
    optionsRef.current = options
  })

  const { active = false } = options

  useEffect(() => {
    if (!active) {
      return undefined
    }

    const container = containerRef.current

    if (!container) {
      return undefined
    }

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const frameId = window.requestAnimationFrame(() => {
      const {
        initialFocusRef,
      } = optionsRef.current
      const target =
        initialFocusRef?.current ?? container.querySelector(FOCUSABLE_SELECTOR) ?? container

      if (typeof target.focus === 'function') {
        target.focus()
      }
    })

    const getFocusables = () =>
      [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(isVisible)

    const onKeyDown = (event) => {
      const { onClose } = optionsRef.current

      if (event.key === 'Escape') {
        event.preventDefault()
        onClose?.()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusables = getFocusables()

      if (!focusables.length) {
        event.preventDefault()
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const current = document.activeElement

      if (event.shiftKey && (current === first || !container.contains(current))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (current === last || !container.contains(current))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)

    return () => {
      window.cancelAnimationFrame(frameId)
      document.removeEventListener('keydown', onKeyDown, true)
      document.body.style.overflow = previousOverflow

      const { restoreFocus = true, restoreFocusRef } = optionsRef.current
      const restoreTarget =
        restoreFocusRef?.current instanceof HTMLElement ? restoreFocusRef.current : previousFocus

      if (restoreFocus && restoreTarget instanceof HTMLElement && document.contains(restoreTarget)) {
        restoreTarget.focus()
      }
    }
    // El hook se reinicia solo al alternar `active`: las opciones van por ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
}
