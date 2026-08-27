import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { PanelId, RoomId } from './types'
import { CAMERA_VIEWS, FOCUS_VIEWS } from './cameraPositions'
import type { CameraView } from './types'

interface HouseState {
  room: RoomId
  panel: PanelId
  focusKey: string | null
  inside: boolean
  doorOpen: boolean
  lightsOn: Record<RoomId, boolean>
  tvOn: boolean
  fanOn: boolean
  selectedProject: number
  isMobile: boolean
  camera: CameraView
  goToRoom: (room: RoomId) => void
  openPanel: (panel: PanelId, focus?: string, projectIndex?: number) => void
  closePanel: () => void
  enterHouse: () => void
  toggleLights: (room: RoomId) => void
  toggleTv: () => void
  toggleFan: () => void
  setMobile: (v: boolean) => void
}

const defaultLights: Record<RoomId, boolean> = {
  exterior: true,
  living: true,
  office: true,
  workshop: true,
  study: true,
  garage: true,
  bedroom: true,
}

const HouseContext = createContext<HouseState | null>(null)

export function HouseProvider({ children }: { children: ReactNode }) {
  const [room, setRoom] = useState<RoomId>('exterior')
  const [panel, setPanel] = useState<PanelId>(null)
  const [focusKey, setFocusKey] = useState<string | null>(null)
  const [inside, setInside] = useState(false)
  const [doorOpen, setDoorOpen] = useState(false)
  const [lightsOn, setLightsOn] = useState(defaultLights)
  const [tvOn, setTvOn] = useState(false)
  const [fanOn, setFanOn] = useState(true)
  const [selectedProject, setSelectedProject] = useState(0)
  const [isMobile, setMobile] = useState(false)

  const camera = useMemo(() => {
    if (focusKey && FOCUS_VIEWS[focusKey]) return FOCUS_VIEWS[focusKey]!
    return CAMERA_VIEWS[room]
  }, [room, focusKey])

  const goToRoom = useCallback((next: RoomId) => {
    setPanel(null)
    setFocusKey(null)
    setRoom(next)
    if (next !== 'exterior') setInside(true)
  }, [])

  const openPanel = useCallback((p: PanelId, focus?: string, projectIndex = 0) => {
    setPanel(p)
    setFocusKey(focus ?? null)
    setSelectedProject(projectIndex)
    if (p === 'projects') setTvOn(true)
  }, [])

  const closePanel = useCallback(() => {
    setPanel(null)
    setFocusKey(null)
  }, [])

  const enterHouse = useCallback(() => {
    setDoorOpen(true)
    setTimeout(() => {
      setInside(true)
      setRoom('living')
    }, 900)
  }, [])

  const toggleLights = useCallback((r: RoomId) => {
    setLightsOn((prev) => ({ ...prev, [r]: !prev[r] }))
  }, [])

  const toggleTv = useCallback(() => setTvOn((v) => !v), [])
  const toggleFan = useCallback(() => setFanOn((v) => !v), [])

  const value = useMemo(
    () => ({
      room,
      panel,
      focusKey,
      inside,
      doorOpen,
      lightsOn,
      tvOn,
      fanOn,
      selectedProject,
      isMobile,
      camera,
      goToRoom,
      openPanel,
      closePanel,
      enterHouse,
      toggleLights,
      toggleTv,
      toggleFan,
      setMobile,
    }),
    [
      room,
      panel,
      focusKey,
      inside,
      doorOpen,
      lightsOn,
      tvOn,
      fanOn,
      selectedProject,
      isMobile,
      camera,
      goToRoom,
      openPanel,
      closePanel,
      enterHouse,
      toggleLights,
      toggleTv,
      toggleFan,
    ]
  )

  return <HouseContext.Provider value={value}>{children}</HouseContext.Provider>
}

export function useHouse() {
  const ctx = useContext(HouseContext)
  if (!ctx) throw new Error('useHouse must be used within HouseProvider')
  return ctx
}
