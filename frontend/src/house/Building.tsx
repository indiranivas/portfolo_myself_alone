import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useHouse } from './HouseContext'

const WALL = '#f5f5f0'
const WOOD = '#c8a882'
const GLASS = '#b8d4e8'

export function Building() {
  const { doorOpen, inside, lightsOn, room, tvOn, fanOn } = useHouse()
  const doorRef = useRef<THREE.Group>(null)
  const fanRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (doorRef.current) {
      const goal = doorOpen ? -Math.PI / 2.2 : 0
      doorRef.current.rotation.y = THREE.MathUtils.lerp(doorRef.current.rotation.y, goal, 1 - Math.exp(-6 * delta))
    }
    if (fanRef.current && fanOn) {
      fanRef.current.rotation.y += delta * 3
    }
  })

  const roomLight = (r: typeof room) => (lightsOn[r] ? 1 : 0.35)

  return (
    <group>
      {/* Ground floor slab */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[18, 0.1, 14]} />
        <meshStandardMaterial color="#e8e4dc" />
      </mesh>

      {/* Upper floor slab */}
      <mesh position={[0, 3.05, 0]} receiveShadow castShadow>
        <boxGeometry args={[18, 0.1, 14]} />
        <meshStandardMaterial color="#ede9e1" />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 6.15, 0]} castShadow>
        <boxGeometry args={[18.4, 0.3, 14.4]} />
        <meshStandardMaterial color="#ececec" />
      </mesh>
      <mesh position={[0, 6.5, 0]}>
        <boxGeometry args={[16, 0.15, 12]} />
        <meshStandardMaterial color="#f8f8f8" />
      </mesh>

      {/* Exterior walls */}
      <Wall pos={[-9, 3, 0]} size={[0.2, 6, 14]} />
      <Wall pos={[9, 3, 0]} size={[0.2, 6, 14]} />
      <Wall pos={[0, 3, -7]} size={[18, 6, 0.2]} />
      <Wall pos={[-5, 3, 7]} size={[8, 6, 0.2]} />
      <Wall pos={[5, 3, 7]} size={[8, 6, 0.2]} />

      {/* Large front windows */}
      <GlassPanel pos={[-5, 2, 6.95]} size={[5, 2.2, 0.05]} />
      <GlassPanel pos={[3, 2, 6.95]} size={[5, 2.2, 0.05]} />
      <GlassPanel pos={[-5, 5, 6.95]} size={[5, 2, 0.05]} />
      <GlassPanel pos={[3, 5, 6.95]} size={[5, 2, 0.05]} />

      {/* Balcony */}
      <mesh position={[0, 3.1, 7.8]} castShadow receiveShadow>
        <boxGeometry args={[10, 0.12, 1.6]} />
        <meshStandardMaterial color="#ddd" />
      </mesh>
      {[ -4, -2, 0, 2, 4 ].map((x) => (
        <mesh key={x} position={[x, 3.8, 8.4]} castShadow>
          <boxGeometry args={[0.06, 1.4, 0.06]} />
          <meshStandardMaterial color="#bbb" />
        </mesh>
      ))}

      {/* Interior walls - ground floor */}
      <Wall pos={[1, 1.5, 0]} size={[0.12, 3, 8]} />
      <Wall pos={[-1, 1.5, 2]} size={[6, 3, 0.12]} />
      <Wall pos={[5.5, 1.5, 0]} size={[0.12, 3, 10]} />

      {/* Interior walls - upper floor */}
      <Wall pos={[0, 4.5, 0]} size={[10, 3, 0.12]} />
      <Wall pos={[-1, 4.5, 2.5]} size={[0.12, 3, 5]} />

      {/* Stairs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0.5, 0.2 + i * 0.36, 3.5 - i * 0.4]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.08, 0.45]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
      ))}

      {/* Front door */}
      <group position={[0, 0, 6.9]}>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[1.6, 2.2, 0.1]} />
          <meshStandardMaterial color="#8b6b4a" />
        </mesh>
        <group ref={doorRef} position={[-0.8, 1.1, 0.06]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 2.2, 0.08]} />
            <meshStandardMaterial color={WOOD} />
          </mesh>
          <mesh position={[0.3, 0, 0.05]}>
            <sphereGeometry args={[0.04]} />
            <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Room lights */}
      <pointLight position={[-3.5, 2.6, 2]} intensity={roomLight('living') * 12} color="#fff8ee" distance={8} />
      <pointLight position={[2.5, 2.6, -2]} intensity={roomLight('office') * 12} color="#fff8ee" distance={8} />
      <pointLight position={[-3, 5.6, -2]} intensity={roomLight('workshop') * 12} color="#fff8ee" distance={8} />
      <pointLight position={[3.5, 5.6, 2]} intensity={roomLight('study') * 12} color="#fff8ee" distance={8} />
      <pointLight position={[8, 2.6, 0]} intensity={roomLight('garage') * 10} color="#f0f4ff" distance={8} />
      <pointLight position={[-5.5, 5.6, 2]} intensity={roomLight('bedroom') * 10} color="#fff5f0" distance={8} />

      {/* LIVING ROOM */}
      <group position={[-3.5, 0, 2]}>
        <RoundedBox args={[3, 0.4, 1.2]} position={[0, 0.25, 0]} radius={0.05} castShadow receiveShadow>
          <meshStandardMaterial color="#e8dfd4" />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.7, 0.5]} position={[-1.2, 0.55, 0.3]} radius={0.04} castShadow>
          <meshStandardMaterial color="#d4c8b8" />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.7, 0.5]} position={[1.2, 0.55, 0.3]} radius={0.04} castShadow>
          <meshStandardMaterial color="#d4c8b8" />
        </RoundedBox>
        {/* Coffee table */}
        <mesh position={[0, 0.35, 0.8]} castShadow>
          <boxGeometry args={[1, 0.06, 0.6]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {/* TV */}
        <group position={[-4.5, 1.2, 2]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.9, 1.6]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
          <mesh position={[0.05, 0, 0]}>
            <boxGeometry args={[0.02, 0.75, 1.4]} />
            <meshStandardMaterial
              color={tvOn ? '#1a3a5c' : '#111'}
              emissive={tvOn ? '#4488cc' : '#000'}
              emissiveIntensity={tvOn ? 0.6 : 0}
            />
          </mesh>
          <mesh position={[0, -0.55, 0]}>
            <boxGeometry args={[0.3, 0.05, 0.2]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
        {/* Ceiling fan */}
        <group position={[0, 2.85, 0]}>
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 0.3]} />
            <meshStandardMaterial color="#aaa" />
          </mesh>
          <mesh ref={fanRef} position={[0, -0.15, 0]}>
            <boxGeometry args={[1.6, 0.03, 0.15]} />
            <meshStandardMaterial color="#ccc" />
          </mesh>
        </group>
      </group>

      {/* OFFICE */}
      <group position={[2.5, 0, -2]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.08, 1]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[0, 0.65, -0.2]} castShadow>
          <boxGeometry args={[0.6, 0.5, 0.04]} />
          <meshStandardMaterial color="#1e1e1e" emissive="#3366aa" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, 0.35, -0.15]}>
          <boxGeometry args={[0.5, 0.03, 0.2]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[-0.8, 0.5, 0.2]} castShadow>
          <boxGeometry args={[0.5, 0.9, 0.5]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
      </group>

      {/* WORKSHOP (upper) */}
      <group position={[-3.5, 3, -2]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {[ -1, 0, 1 ].map((x) => (
          <mesh key={x} position={[x, 0.7, 0]} castShadow>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#6b8cae" />
          </mesh>
        ))}
      </group>

      {/* STUDY (upper) */}
      <group position={[3.5, 3, 2]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[2.5, 0.08, 0.8]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {/* Bookshelf */}
        <mesh position={[1.2, 1.2, 0]} castShadow>
          <boxGeometry args={[0.4, 2, 1.2]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <mesh
              key={`${row}-${col}`}
              position={[1.15, 0.6 + row * 0.45, -0.4 + col * 0.35]}
              castShadow
            >
              <boxGeometry args={[0.25, 0.3, 0.08]} />
              <meshStandardMaterial color={['#c45', '#48a', '#5a4', '#a84'][row]} />
            </mesh>
          ))
        )}
      </group>

      {/* GARAGE / TECH LAB */}
      <group position={[8, 0, 0]}>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[4, 0.1, 8]} />
          <meshStandardMaterial color="#d5d5d5" />
        </mesh>
        {/* Server rack */}
        <mesh position={[0.5, 1.2, -1]} castShadow>
          <boxGeometry args={[0.8, 2.2, 0.6]} />
          <meshStandardMaterial color="#2d2d2d" />
        </mesh>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0.5, 0.4 + i * 0.4, -0.65]}>
            <boxGeometry args={[0.7, 0.05, 0.02]} />
            <meshStandardMaterial color="#0f0" emissive="#0a0" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>

      {/* BEDROOM (upper) */}
      <group position={[-5.5, 3, 2]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.5, 3]} />
          <meshStandardMaterial color="#f0ebe3" />
        </mesh>
        <mesh position={[-0.8, 0.55, 0]} castShadow>
          <boxGeometry args={[0.6, 0.2, 0.4]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
        {/* Nightstand + phone */}
        <mesh position={[0.9, 0.55, 0.8]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.4]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[0.9, 0.85, 0.8]}>
          <boxGeometry args={[0.12, 0.2, 0.06]} />
          <meshStandardMaterial color="#111" emissive="#333" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Interior only visible when inside */}
      {inside && (
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[17, 3, 13]} />
          <meshStandardMaterial color="#faf9f6" side={THREE.BackSide} />
        </mesh>
      )}
      {inside && (
        <mesh position={[0, 4.5, 0]}>
          <boxGeometry args={[17, 3, 13]} />
          <meshStandardMaterial color="#faf9f6" side={THREE.BackSide} />
        </mesh>
      )}
    </group>
  )
}

function Wall({ pos, size }: { pos: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={WALL} />
    </mesh>
  )
}

function GlassPanel({ pos, size }: { pos: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color={GLASS}
        transmission={0.85}
        opacity={0.6}
        transparent
        roughness={0.05}
        thickness={0.1}
      />
    </mesh>
  )
}
