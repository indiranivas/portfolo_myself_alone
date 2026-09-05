import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useHouse } from './HouseContext'

export function CameraRig() {
  const { camera } = useThree()
  const { camera: target } = useHouse()
  const lookAt = useRef(new THREE.Vector3(...target.target))
  const goal = useRef(new THREE.Vector3(...target.position))

  useFrame((_, delta) => {
    goal.current.set(...target.position)
    lookAt.current.set(...target.target)

    camera.position.lerp(goal.current, 1 - Math.exp(-4 * delta))
    if ('fov' in camera && target.fov) {
      const persp = camera as THREE.PerspectiveCamera
      persp.fov = THREE.MathUtils.lerp(persp.fov, target.fov, 1 - Math.exp(-4 * delta))
      persp.updateProjectionMatrix()
    }

    const currentLook = new THREE.Vector3()
    camera.getWorldDirection(currentLook)
    const desired = lookAt.current.clone().sub(camera.position).normalize()
    currentLook.lerp(desired, 1 - Math.exp(-5 * delta))
    const newTarget = camera.position.clone().add(currentLook)
    camera.lookAt(newTarget)
  })

  return null
}
