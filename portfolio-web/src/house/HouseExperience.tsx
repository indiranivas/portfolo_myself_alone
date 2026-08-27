import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky, ContactShadows, Environment } from '@react-three/drei'
import { Building } from './Building'
import { Exterior, RoomInteractables } from './Exterior'
import { CameraRig } from './CameraRig'
import { useHouse } from './HouseContext'

function Scene() {
  const { isMobile } = useHouse()

  return (
    <>
      <Sky sunPosition={[8, 12, 4]} turbidity={2} rayleigh={1.5} mieCoefficient={0.005} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[10, 18, 8]}
        intensity={1.4}
        castShadow
        shadow-mapSize={isMobile ? [1024, 1024] : [2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <hemisphereLight args={['#dce8f5', '#8fbc8f', 0.35]} />

      <Building />
      <Exterior />
      <RoomInteractables />

      <ContactShadows position={[0, 0.02, 0]} opacity={0.35} scale={30} blur={2.5} far={20} />
      <Environment preset="apartment" />
      <CameraRig />
    </>
  )
}

export function HouseExperience() {
  const { isMobile } = useHouse()

  return (
    <div className="house-canvas-wrap">
      <Canvas
        shadows
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 6, 24], fov: 48, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#dce8f5']} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
