import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingOrbProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

export function FloatingOrb({ mouse }: FloatingOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      mouse.current.x * 0.5,
      0.05
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      mouse.current.y * 0.3,
      0.05
    )
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#4338ca"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </mesh>
      <mesh scale={2.2}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.08} />
      </mesh>
    </Float>
  )
}
