import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei'
import { ParticleField } from './ParticleField'
import { NeuralNetwork } from './NeuralNetwork'
import { FloatingOrb } from './FloatingOrb'
import * as THREE from 'three'

interface HeroSceneProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

function Ring() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = Math.PI / 2
    ref.current.rotation.z = state.clock.elapsedTime * 0.3
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.5, 0.02, 16, 100]} />
      <meshStandardMaterial color="#a78bfa" emissive="#6366f1" emissiveIntensity={1} toneMapped={false} />
    </mesh>
  )
}

function SceneContent({ mouse }: HeroSceneProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#818cf8" />
      <pointLight position={[-10, -5, -5]} intensity={0.5} color="#6366f1" />
      <Stars radius={50} depth={50} count={3000} factor={3} saturation={0} fade speed={1} />
      <ParticleField count={1500} />
      <NeuralNetwork />
      <FloatingOrb mouse={mouse} />
      <Ring />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </>
  )
}

export function HeroScene({ mouse }: HeroSceneProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
