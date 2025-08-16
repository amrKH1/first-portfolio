'use client'

import { useCallback } from 'react'

interface TransitionOptions {
  duration?: number
  easing?: string
  type?: 'fade' | 'ripple' | 'slide' | 'none'
  origin?: { x: number; y: number } | 'auto'
}

export function useThemeTransition() {
  const createTransition = useCallback((
    newTheme: 'light' | 'dark',
    options: TransitionOptions = {}
  ) => {
    const {
      duration = 500,
      easing = 'ease-out',
      type = 'ripple',
      origin = 'auto'
    } = options

    // Skip transition if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return Promise.resolve()
    }

    return new Promise<void>((resolve) => {
      if (type === 'none') {
        resolve()
        return
      }

      const overlay = document.createElement('div')
      overlay.className = 'fixed inset-0 pointer-events-none z-[9999]'
      overlay.style.transition = `all ${duration}ms ${easing}`

      let centerX = window.innerWidth / 2
      let centerY = 100

      // Auto-detect origin from active element (theme toggle button)
      if (origin === 'auto') {
        const activeElement = document.activeElement as HTMLElement
        if (activeElement) {
          const rect = activeElement.getBoundingClientRect()
          centerX = rect.left + rect.width / 2
          centerY = rect.top + rect.height / 2
        }
      } else if (origin) {
        centerX = origin.x
        centerY = origin.y
      }

      switch (type) {
        case 'ripple':
          const maxRadius = Math.sqrt(
            Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
          )
          
          overlay.style.background = newTheme === 'dark'
            ? `radial-gradient(circle at ${centerX}px ${centerY}px, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, transparent 70%)`
            : `radial-gradient(circle at ${centerX}px ${centerY}px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 40%, transparent 70%)`
          
          overlay.style.clipPath = `circle(0px at ${centerX}px ${centerY}px)`
          
          document.body.appendChild(overlay)
          
          requestAnimationFrame(() => {
            overlay.style.clipPath = `circle(${maxRadius}px at ${centerX}px ${centerY}px)`
            
            setTimeout(() => {
              overlay.style.opacity = '0'
              setTimeout(() => {
                overlay.remove()
                resolve()
              }, 200)
            }, duration * 0.6)
          })
          break

        case 'slide':
          overlay.style.background = newTheme === 'dark'
            ? 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)'
          
          overlay.style.transform = 'translateX(-100%)'
          
          document.body.appendChild(overlay)
          
          requestAnimationFrame(() => {
            overlay.style.transform = 'translateX(100%)'
            
            setTimeout(() => {
              overlay.remove()
              resolve()
            }, duration)
          })
          break

        case 'fade':
        default:
          overlay.style.backgroundColor = newTheme === 'dark'
            ? 'rgba(0,0,0,0.3)'
            : 'rgba(255,255,255,0.3)'
          
          overlay.style.opacity = '0'
          
          document.body.appendChild(overlay)
          
          requestAnimationFrame(() => {
            overlay.style.opacity = '1'
            
            setTimeout(() => {
              overlay.style.opacity = '0'
              setTimeout(() => {
                overlay.remove()
                resolve()
              }, 200)
            }, duration * 0.5)
          })
          break
      }
    })
  }, [])

  return { createTransition }
}
