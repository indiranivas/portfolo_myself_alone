import type { CameraView, RoomId } from './types'

export const CAMERA_VIEWS: Record<RoomId, CameraView> = {
  exterior: { position: [0, 6, 24], target: [0, 4, 0], fov: 48 },
  living: { position: [-3.5, 1.7, 5.5], target: [-3.5, 1.3, 1.5], fov: 42 },
  office: { position: [2.5, 1.7, 3.5], target: [2.5, 1.3, -1], fov: 42 },
  workshop: { position: [-3, 4.8, 4], target: [-3, 4.3, 0], fov: 40 },
  study: { position: [3.5, 4.8, 4.5], target: [3.5, 4.3, 1], fov: 40 },
  garage: { position: [7.5, 1.7, 2], target: [9, 1.2, 0], fov: 44 },
  bedroom: { position: [-5.5, 4.8, 4], target: [-5.5, 4.3, 1], fov: 40 },
}

export const FOCUS_VIEWS: Partial<Record<string, CameraView>> = {
  tv: { position: [-4.2, 1.9, 3.2], target: [-4.5, 1.6, 2.2], fov: 38 },
  computer: { position: [3.2, 1.9, 0.5], target: [2.8, 1.5, -2.5], fov: 36 },
  bookshelf: { position: [4.8, 5.1, 3.5], target: [4.5, 4.6, 2], fov: 36 },
  phone: { position: [-6.2, 5.0, 3.2], target: [-6.5, 4.5, 2.5], fov: 35 },
  workbench: { position: [-2, 5.0, 0.5], target: [-3.5, 4.5, -2.5], fov: 38 },
  server: { position: [8.5, 1.9, 1], target: [9.5, 1.4, -1], fov: 36 },
}
