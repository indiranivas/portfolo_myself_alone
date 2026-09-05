import { useMemo } from 'react'
import { Float } from '@react-three/drei'
import { useHouse } from './HouseContext'
import { Interactable } from './Interactable'

export function Exterior() {
  const { enterHouse, inside } = useHouse()

  const trees = useMemo(
    () =>
      [
        [-14, -4],
        [-12, 5],
        [14, -3],
        [13, 6],
        [-8, -8],
        [10, -7],
      ] as [number, number][],
    []
  )

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#8fbc8f" />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, 0.01, 10]} receiveShadow>
        <planeGeometry args={[5, 14]} />
        <meshStandardMaterial color="#c8c8c8" />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 10]} receiveShadow>
        <planeGeometry args={[2.5, 8]} />
        <meshStandardMaterial color="#d8d0c4" />
      </mesh>

      {[-6, 6].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, 9]} receiveShadow>
          <planeGeometry args={[3, 2]} />
          <meshStandardMaterial color="#7a9e6a" />
        </mesh>
      ))}

      {trees.map(([x, z], i) => (
        <Float key={i} speed={1.2} floatIntensity={0.08}>
          <group position={[x, 0, z]}>
            <mesh position={[0, 1.2, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.28, 2.4]} />
              <meshStandardMaterial color="#6b4c30" />
            </mesh>
            <mesh position={[0, 3, 0]} castShadow>
              <coneGeometry args={[1.2, 2.5, 8]} />
              <meshStandardMaterial color="#3d7a45" />
            </mesh>
          </group>
        </Float>
      ))}

      {[-4, 4].map((x) => (
        <group key={x} position={[x, 0, 8.5]}>
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.06, 1.2]} />
            <meshStandardMaterial color="#555" />
          </mesh>
          <mesh position={[0, 1.25, 0]}>
            <sphereGeometry args={[0.12]} />
            <meshStandardMaterial color="#fff8e0" emissive="#ffcc66" emissiveIntensity={0.8} />
          </mesh>
          <pointLight position={[0, 1.2, 0]} intensity={0.8} color="#ffeedd" distance={5} />
        </group>
      ))}

      {!inside && (
        <Interactable
          position={[0, 1.1, 7.2]}
          label="Front Door"
          hint="Click to enter"
          onClick={() => enterHouse()}
        >
          <mesh visible={false}>
            <boxGeometry args={[1.6, 2.2, 0.5]} />
          </mesh>
        </Interactable>
      )}

      {inside && (
        <>
          <DoorPortal pos={[-1, 1.1, 4.5]} label="Living Room" room="living" />
          <DoorPortal pos={[2, 1.1, 0.5]} label="Office" room="office" />
          <DoorPortal pos={[7, 1.1, 0]} label="Tech Lab" room="garage" />
          <DoorPortal pos={[-1, 4.1, 4]} label="Workshop" room="workshop" />
          <DoorPortal pos={[3, 4.1, 4]} label="Study" room="study" />
          <DoorPortal pos={[-5, 4.1, 4]} label="Bedroom" room="bedroom" />
          <DoorPortal pos={[0, 1.1, 7]} label="Exit Outside" room="exterior" />
        </>
      )}
    </group>
  )
}

function DoorPortal({
  pos,
  label,
  room,
}: {
  pos: [number, number, number]
  label: string
  room: 'living' | 'office' | 'garage' | 'workshop' | 'study' | 'bedroom' | 'exterior'
}) {
  const { goToRoom } = useHouse()
  return (
    <Interactable position={pos} label={label} hint="Enter room" onClick={() => goToRoom(room)}>
      <mesh>
        <boxGeometry args={[0.8, 1.8, 0.1]} />
        <meshStandardMaterial color="#a07850" transparent opacity={0.85} />
      </mesh>
    </Interactable>
  )
}

export function RoomInteractables() {
  const { openPanel, toggleLights, toggleFan } = useHouse()

  return (
    <group>
      <Interactable
        position={[-4.5, 1.2, 2]}
        label="Smart TV"
        hint="View projects"
        onClick={() => openPanel('projects', 'tv')}
      >
        <mesh visible={false}>
          <boxGeometry args={[0.5, 1, 1.8]} />
        </mesh>
      </Interactable>

      <Interactable
        position={[-3.5, 0.8, 2]}
        label="About Me"
        hint="Introduction"
        onClick={() => openPanel('about')}
      >
        <mesh visible={false}>
          <boxGeometry args={[2, 1, 2]} />
        </mesh>
      </Interactable>

      <Interactable
        position={[-3.5, 2.8, 2]}
        label="Ceiling Fan"
        hint="Toggle fan"
        onClick={() => toggleFan()}
      >
        <mesh visible={false}>
          <boxGeometry args={[1.5, 0.5, 1.5]} />
        </mesh>
      </Interactable>

      <Interactable
        position={[-5, 1.5, 4]}
        label="Light Switch"
        hint="Toggle lights"
        onClick={() => toggleLights('living')}
      >
        <mesh>
          <boxGeometry args={[0.08, 0.12, 0.02]} />
          <meshStandardMaterial color="#eee" />
        </mesh>
      </Interactable>

      <Interactable
        position={[2.5, 0.8, -2]}
        label="Computer"
        hint="Skills & code"
        onClick={() => openPanel('skills', 'computer')}
      >
        <mesh visible={false}>
          <boxGeometry args={[1.5, 1, 1]} />
        </mesh>
      </Interactable>

      <Interactable
        position={[3.5, 1.5, -4]}
        label="Experience Board"
        hint="Work history"
        onClick={() => openPanel('experience')}
      >
        <mesh>
          <boxGeometry args={[1.2, 0.8, 0.04]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      </Interactable>

      <Interactable
        position={[-3.5, 3.6, -2]}
        label="Work Bench"
        hint="All projects"
        onClick={() => openPanel('projects', 'workbench')}
      >
        <mesh visible={false}>
          <boxGeometry args={[3, 1, 2]} />
        </mesh>
      </Interactable>

      {[-4.5, -3.5, -2.5].map((x, i) => (
        <Interactable
          key={i}
          position={[x, 3.8, -2]}
          label={`Project ${i + 1}`}
          hint="View details"
          onClick={() => openPanel('project', 'workbench', i)}
        >
          <mesh>
            <boxGeometry args={[0.45, 0.45, 0.45]} />
            <meshStandardMaterial color={['#5b8def', '#4ecdc4', '#ff6b6b'][i]} />
          </mesh>
        </Interactable>
      ))}

      <Interactable
        position={[4.5, 4.2, 2]}
        label="Bookshelf"
        hint="Education"
        onClick={() => openPanel('education', 'bookshelf')}
      >
        <mesh visible={false}>
          <boxGeometry args={[0.8, 2, 1.5]} />
        </mesh>
      </Interactable>

      <Interactable
        position={[3, 5, -1]}
        label="Awards Frame"
        hint="Achievements"
        onClick={() => openPanel('awards')}
      >
        <mesh>
          <boxGeometry args={[0.6, 0.5, 0.03]} />
          <meshStandardMaterial color="#c9a227" metalness={0.3} />
        </mesh>
      </Interactable>

      <Interactable
        position={[8.5, 1.2, -1]}
        label="Server Rack"
        hint="AI & Architecture"
        onClick={() => openPanel('architecture', 'server')}
      >
        <mesh visible={false}>
          <boxGeometry args={[1, 2.5, 1]} />
        </mesh>
      </Interactable>

      <Interactable
        position={[-4.4, 4.1, 2.8]}
        label="Phone"
        hint="Contact me"
        onClick={() => openPanel('contact', 'phone')}
      >
        <mesh visible={false}>
          <boxGeometry args={[0.3, 0.3, 0.2]} />
        </mesh>
      </Interactable>

      <Interactable
        position={[-5.5, 4.2, 2]}
        label="Personal Space"
        hint="Interests"
        onClick={() => openPanel('interests')}
      >
        <mesh visible={false}>
          <boxGeometry args={[2.5, 1, 3]} />
        </mesh>
      </Interactable>

      <Interactable
        position={[-5, 2, 7.2]}
        label="GitHub Window"
        hint="Open GitHub"
        onClick={() => window.open('https://github.com/indiranivas', '_blank')}
      >
        <mesh visible={false}>
          <boxGeometry args={[2, 2, 0.2]} />
        </mesh>
      </Interactable>

      <Interactable
        position={[3, 2, 7.2]}
        label="LinkedIn Window"
        hint="Open LinkedIn"
        onClick={() =>
          window.open('https://www.linkedin.com/in/indira-nivas-b7a869308/', '_blank')
        }
      >
        <mesh visible={false}>
          <boxGeometry args={[2, 2, 0.2]} />
        </mesh>
      </Interactable>
    </group>
  )
}
