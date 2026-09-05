import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 40

function generateNodes() {
  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    const angle = (i / NODE_COUNT) * Math.PI * 2
    const radius = 2.5 + Math.sin(i * 0.7) * 0.8
    const y = (Math.random() - 0.5) * 3
    nodes.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      )
    )
  }
  return nodes
}

export function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const nodes = useMemo(() => generateNodes(), [])

  const connections = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.5) {
          lines.push([nodes[i], nodes[j]])
        }
      }
    }
    return lines
  }, [nodes])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })

  return (
    <group ref={groupRef}>
      {connections.map(([start, end], i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
        </line>
      ))}
      {nodes.map((node, i) => (
        <mesh key={i} position={node}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#6366f1"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}
