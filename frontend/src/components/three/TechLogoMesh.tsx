import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import type { TechLogoConfig } from '../../data/techLogos'

interface TechLogoMeshProps {
  config: TechLogoConfig
}

export function TechLogoMesh({ config }: TechLogoMeshProps) {
  const groupRef = useRef<THREE.Group>(null)
  const texture = useTexture(config.logo)

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
  }, [texture])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    switch (config.animation) {
      case 'spin':
        groupRef.current.rotation.y = t * 0.8
        groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.15
        break
      case 'float':
        groupRef.current.position.y = Math.sin(t * 1.5) * 0.1
        groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.3
        break
      case 'pulse': {
        const s = 1 + Math.sin(t * 2) * 0.06
        groupRef.current.scale.setScalar(s)
        groupRef.current.rotation.y = t * 0.5
        break
      }
      case 'wobble':
        groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.25
        groupRef.current.rotation.z = Math.sin(t * 1.1) * 0.2
        break
      case 'orbit':
        groupRef.current.position.x = Math.sin(t * 1.2) * 0.1
        groupRef.current.position.z = Math.cos(t * 1.2) * 0.1
        groupRef.current.rotation.y = t * 0.6
        break
    }
  })

  return (
    <group ref={groupRef}>
      {/* Glowing base platform */}
      <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial color={config.emissive} transparent opacity={0.15} />
      </mesh>

      {/* 3D backing slab with brand color */}
      <RoundedBox args={[1.05, 1.05, 0.18]} radius={0.08} smoothness={4} position={[0, 0, -0.04]}>
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={0.25}
          metalness={0.55}
          roughness={0.3}
        />
      </RoundedBox>

      {/* White logo plate for contrast */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[0.88, 0.88]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Logo face */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[0.82, 0.82]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.05}
          roughness={0.4}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Front edge highlight */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[0.86, 0.86]} />
        <meshBasicMaterial color={config.emissive} wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  )
}
