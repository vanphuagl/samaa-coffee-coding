import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface CustomCursorProps {
  isLeftHalf: boolean
  position: { x: number; y: number }
  isHidden?: boolean
  invertColor?: boolean
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isLeftHalf, position, isHidden = false, invertColor = false }) => {
  const cursorRef = useRef<HTMLDivElement>(null)

  // ===== smooth cursor =====
  useEffect(() => {
    if (!cursorRef.current) return

    gsap.to(cursorRef.current, {
      x: position.x,
      y: position.y,
      duration: 0.15,
      ease: 'power2.out'
    })
  }, [position])

  // ===== show/hide cursor =====
  useEffect(() => {
    if (!cursorRef.current) return

    gsap.to(cursorRef.current, {
      opacity: isHidden ? 0 : 1,
      duration: 0.15,
      ease: 'power2.out'
    })
  }, [isHidden])

  const strokeColor = invertColor ? '#ffffff' : '#e03c31'

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 999,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {isLeftHalf ? (
        <svg xmlns='http://www.w3.org/2000/svg' width='52.414' height='22.828' viewBox='0 0 52.414 22.828'>
          <g transform='translate(1.414 1.414)'>
            <line
              x1='50'
              transform='translate(0 10)'
              fill='none'
              stroke={strokeColor}
              strokeLinecap='round'
              strokeWidth='2'
            />
            <line x1='10' y2='10' fill='none' stroke={strokeColor} strokeLinecap='round' strokeWidth='2' />
            <line
              x1='10'
              y1='10'
              transform='translate(0 10)'
              fill='none'
              stroke={strokeColor}
              strokeLinecap='round'
              strokeWidth='2'
            />
          </g>
        </svg>
      ) : (
        <svg xmlns='http://www.w3.org/2000/svg' width='52.414' height='22.828' viewBox='0 0 52.414 22.828'>
          <g transform='translate(-1187 -707.586)'>
            <line
              x2='50'
              transform='translate(1188 719)'
              fill='none'
              stroke={strokeColor}
              strokeLinecap='round'
              strokeWidth='2'
            />
            <line
              x2='10'
              y2='10'
              transform='translate(1228 709)'
              fill='none'
              stroke={strokeColor}
              strokeLinecap='round'
              strokeWidth='2'
            />
            <line
              y1='10'
              x2='10'
              transform='translate(1228 719)'
              fill='none'
              stroke={strokeColor}
              strokeLinecap='round'
              strokeWidth='2'
            />
          </g>
        </svg>
      )}
    </div>
  )
}

export default CustomCursor
