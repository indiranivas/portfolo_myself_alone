import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import type { TechModelConfig } from '../../data/techModels'

interface TechMeshProps {
  config: TechModelConfig
}

function Geometry({ shape }: { shape: TechModelConfig['shape'] }) {
  switch (shape) {
    case 'sphere':
      return <sphereGeometry args={[0.55, 32, 32]} />
    case 'box':
      return <boxGeometry args={[0.9, 0.9, 0.9]} />
    case 'torus':
      return <torusGeometry args={[0.45, 0.18, 16, 48]} />
    case 'octahedron':
      return <octahedronGeometry args={[0.65]} />
    case 'icosahedron':
      return <icosahedronGeometry args={[0.6, 1]} />
    case 'cylinder':
      return <cylinderGeometry args={[0.4, 0.4, 0.9, 24]} />
    case 'cone':
      return <coneGeometry args={[0.5, 0.95, 24]} />
    case 'torusKnot':
      return <torusKnotGeometry args={[0.38, 0.12, 100, 16]} />
    case 'dodecahedron':
      return <dodecahedronGeometry args={[0.55]} />
    case 'ring':
      return <torusGeometry args={[0.5, 0.08, 16, 64]} />
    default:
      return <icosahedronGeometry args={[0.6, 1]} />
  }
}

export function TechMesh({ config }: TechMeshProps) {
  const ref = useRef<THREE.Mesh>(null)
  const scale = config.scale ?? 1

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime

    switch (config.animation) {
      case 'spin':
        ref.current.rotation.y = t * 1.2
        ref.current.rotation.x = Math.sin(t * 0.5) * 0.2
        break
      case 'float':
        ref.current.position.y = Math.sin(t * 1.5) * 0.12
        ref.current.rotation.y = t * 0.4
        break
      case 'pulse': {
        const s = 1 + Math.sin(t * 2) * 0.08
        ref.current.scale.setScalar(scale * s)
        ref.current.rotation.y = t * 0.6
        break
      }
      case 'wobble':
        ref.current.rotation.x = t * 0.8
        ref.current.rotation.z = Math.sin(t) * 0.3
        break
      case 'orbit':
        ref.current.position.x = Math.sin(t * 1.2) * 0.15
        ref.current.position.z = Math.cos(t * 1.2) * 0.15
        ref.current.rotation.y = t
        break
    }
  })

  if (config.animation === 'wobble') {
    return (
      <mesh ref={ref} scale={scale}>
        <Geometry shape={config.shape} />
        <MeshDistortMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={config.metalness ?? 0.5}
          distort={0.35}
          speed={2.5}
        />
      </mesh>
    )
  }

  return (
    <mesh ref={ref} scale={scale}>
      <Geometry shape={config.shape} />
      <meshStandardMaterial
        color={config.color}
        emissive={config.emissive}
        emissiveIntensity={0.35}
        roughness={0.25}
        metalness={config.metalness ?? 0.5}
        wireframe={config.wireframe}
      />
    </mesh>
  )
}
