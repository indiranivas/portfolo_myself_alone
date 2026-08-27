export type TechShape =
  | 'sphere'
  | 'box'
  | 'torus'
  | 'octahedron'
  | 'icosahedron'
  | 'cylinder'
  | 'cone'
  | 'torusKnot'
  | 'dodecahedron'
  | 'ring'

export type TechAnimation = 'spin' | 'float' | 'pulse' | 'wobble' | 'orbit'

export interface TechModelConfig {
  color: string
  emissive: string
  shape: TechShape
  animation: TechAnimation
  metalness?: number
  wireframe?: boolean
  scale?: number
}

const DEFAULT: TechModelConfig = {
  color: '#6366f1',
  emissive: '#4338ca',
  shape: 'icosahedron',
  animation: 'float',
  metalness: 0.6,
}

export const techModelMap: Record<string, TechModelConfig> = {
  Python: {
    color: '#3776ab',
    emissive: '#ffd43b',
    shape: 'torusKnot',
    animation: 'wobble',
    metalness: 0.4,
  },
  SQL: {
    color: '#00758f',
    emissive: '#00a8cc',
    shape: 'cylinder',
    animation: 'spin',
    metalness: 0.7,
  },
  JavaScript: {
    color: '#f7df1e',
    emissive: '#c9a800',
    shape: 'dodecahedron',
    animation: 'orbit',
    metalness: 0.5,
  },
  TensorFlow: {
    color: '#ff6f00',
    emissive: '#e65100',
    shape: 'octahedron',
    animation: 'pulse',
    metalness: 0.8,
  },
  PyTorch: {
    color: '#ee4c2c',
    emissive: '#b71c1c',
    shape: 'torus',
    animation: 'spin',
    metalness: 0.6,
  },
  'Scikit-learn': {
    color: '#f7931e',
    emissive: '#e65100',
    shape: 'box',
    animation: 'float',
    metalness: 0.3,
  },
  Keras: {
    color: '#d00000',
    emissive: '#9b0000',
    shape: 'cone',
    animation: 'wobble',
    metalness: 0.5,
  },
  OpenCV: {
    color: '#5cb85c',
    emissive: '#2e7d32',
    shape: 'box',
    animation: 'spin',
    metalness: 0.4,
    wireframe: true,
  },
  'Hugging Face': {
    color: '#ffbd59',
    emissive: '#f9a825',
    shape: 'sphere',
    animation: 'pulse',
    metalness: 0.2,
  },
  MySQL: {
    color: '#00758f',
    emissive: '#004d66',
    shape: 'cylinder',
    animation: 'float',
    metalness: 0.75,
    scale: 0.9,
  },
  DBMS: {
    color: '#546e7a',
    emissive: '#37474f',
    shape: 'box',
    animation: 'spin',
    metalness: 0.6,
  },
  Pandas: {
    color: '#150458',
    emissive: '#e70488',
    shape: 'torus',
    animation: 'orbit',
    metalness: 0.5,
  },
  NumPy: {
    color: '#4d77cf',
    emissive: '#013243',
    shape: 'icosahedron',
    animation: 'spin',
    metalness: 0.7,
  },
  Matplotlib: {
    color: '#11557c',
    emissive: '#0d3d56',
    shape: 'cone',
    animation: 'float',
    metalness: 0.4,
  },
  'Power BI': {
    color: '#f2c811',
    emissive: '#b8960b',
    shape: 'ring',
    animation: 'spin',
    metalness: 0.8,
  },
  Tableau: {
    color: '#e97627',
    emissive: '#b85c14',
    shape: 'octahedron',
    animation: 'pulse',
    metalness: 0.6,
  },
}

export function getTechModel(name: string): TechModelConfig {
  return techModelMap[name] ?? { ...DEFAULT, color: hashColor(name) }
}

function hashColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 65%, 55%)`
}
