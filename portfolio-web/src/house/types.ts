export type RoomId =
  | 'exterior'
  | 'living'
  | 'office'
  | 'workshop'
  | 'study'
  | 'garage'
  | 'bedroom'

export type PanelId =
  | 'about'
  | 'projects'
  | 'project'
  | 'skills'
  | 'education'
  | 'experience'
  | 'awards'
  | 'contact'
  | 'interests'
  | 'architecture'
  | null

export interface CameraView {
  position: [number, number, number]
  target: [number, number, number]
  fov?: number
}

export interface RoomMeta {
  id: RoomId
  label: string
  floor: number
  description: string
}

export const ROOMS: RoomMeta[] = [
  { id: 'exterior', label: 'Outside', floor: 0, description: 'Welcome' },
  { id: 'living', label: 'Living Room', floor: 1, description: 'About Me' },
  { id: 'office', label: 'Office', floor: 1, description: 'Skills & Experience' },
  { id: 'workshop', label: 'Workshop', floor: 2, description: 'Projects' },
  { id: 'study', label: 'Study', floor: 2, description: 'Education & Awards' },
  { id: 'garage', label: 'Tech Lab', floor: 1, description: 'AI & Engineering' },
  { id: 'bedroom', label: 'Personal', floor: 2, description: 'Contact & Interests' },
]
