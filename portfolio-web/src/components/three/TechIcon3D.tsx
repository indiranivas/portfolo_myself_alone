import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useInView } from 'react-intersection-observer'
import { getTechLogo } from '../../data/techLogos'
import { TechLogoMesh } from './TechLogoMesh'

interface TechIcon3DProps {
  name: string
  className?: string
}

function Scene({ name }: { name: string }) {
  const config = getTechLogo(name)
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 3, 4]} intensity={1.2} />
      <pointLight position={[-2, 1, 2]} intensity={0.6} color={config.color} />
      <pointLight position={[2, -1, 1]} intensity={0.4} color={config.emissive} />
      <TechLogoMesh config={config} />
    </>
  )
}

export function TechIcon3D({ name, className = '' }: TechIcon3DProps) {
  const config = getTechLogo(name)
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '100px' })

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        className="absolute inset-0 rounded-full blur-md"
        style={{ background: `radial-gradient(circle, ${config.color}30, transparent)` }}
      />
      {inView ? (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 2.4], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene name={name} />
          </Suspense>
        </Canvas>
      ) : (
        <div
          className="w-full h-full rounded-full"
          style={{ background: `radial-gradient(circle, ${config.color}40, transparent)` }}
        />
      )}
    </div>
  )
}
