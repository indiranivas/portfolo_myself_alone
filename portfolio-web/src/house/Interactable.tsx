import { useState } from 'react'
import { Html } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'

interface InteractableProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  label: string
  hint?: string
  onClick?: (e: ThreeEvent<MouseEvent>) => void
  children: React.ReactNode
}

export function Interactable({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  label,
  hint,
  onClick,
  children,
}: InteractableProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(e)
      }}
    >
      <group scale={hovered ? 1.04 : 1}>{children}</group>
      {hovered && (
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div className="house-tooltip">
            <span>{label}</span>
            {hint && <small>{hint}</small>}
          </div>
        </Html>
      )}
    </group>
  )
}
