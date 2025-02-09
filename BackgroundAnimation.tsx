'use client'

import { useEffect, useState, useCallback, useRef } from "react"

const easeOutQuad = (t: number) => t * (2 - t)

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t

const generateSineWave = (index: number, total: number, scrollOffset: number) => {
  const baseAmplitude = 20
  const scrollFactor = 0.0005
  const amplitude = baseAmplitude + scrollOffset * scrollFactor
  const frequency = 2
  const phase = index * 0.5 + easeOutQuad(scrollOffset * 0.001)
  const yOffset = (1000 / total) * (index + 0.5)

  let d = `M 0 ${yOffset}`
  for (let x = 0; x <= 1000; x += 10) {
    const y = yOffset + Math.sin((x / 1000) * Math.PI * frequency + phase) * amplitude
    d += ` L ${x} ${y}`
  }
  return d
}

const CurvedBackground = () => {
  const [curves, setCurves] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const prevScrollOffset = useRef(0)
  const animationFrameId = useRef<number | null>(null)

  const updateCurves = useCallback((offset: number) => {
    const totalCurves = 30
    const newCurves = Array.from({ length: totalCurves }, (_, i) => 
      generateSineWave(i, totalCurves, offset)
    )
    setCurves(newCurves)
  }, [])

  const animateScroll = useCallback(() => {
    const currentScrollOffset = window.pageYOffset
    const lerpFactor = 0.1 // Adjust this value to control the delay (0.1 = smooth, 1 = no delay)
    const lerpedScrollOffset = lerp(prevScrollOffset.current, currentScrollOffset, lerpFactor)
    
    updateCurves(lerpedScrollOffset)
    
    prevScrollOffset.current = lerpedScrollOffset
    
    animationFrameId.current = requestAnimationFrame(animateScroll)
  }, [updateCurves])

  useEffect(() => {
    setMounted(true)
    animationFrameId.current = requestAnimationFrame(animateScroll)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [animateScroll])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      <svg
        className="w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        {curves.map((curve, index) => (
          <path
            key={index}
            d={curve}
            fill="none"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  )
}

export default CurvedBackground