import type { TechAnimation } from './techModels'

export interface TechLogoConfig {
  logo: string
  color: string
  emissive: string
  animation: TechAnimation
}

const DEFAULT_LOGO = '/logos/python.svg'

export const techLogoMap: Record<string, TechLogoConfig> = {
  Python: { logo: '/logos/python.svg', color: '#3776ab', emissive: '#ffd43b', animation: 'float' },
  SQL: { logo: '/logos/sql.svg', color: '#00758f', emissive: '#00a8cc', animation: 'spin' },
  JavaScript: { logo: '/logos/javascript.svg', color: '#f7df1e', emissive: '#c9a800', animation: 'orbit' },
  TensorFlow: { logo: '/logos/tensorflow.svg', color: '#ff6f00', emissive: '#e65100', animation: 'pulse' },
  PyTorch: { logo: '/logos/pytorch.svg', color: '#ee4c2c', emissive: '#b71c1c', animation: 'spin' },
  'Scikit-learn': { logo: '/logos/scikitlearn.svg', color: '#f7931e', emissive: '#e65100', animation: 'float' },
  Keras: { logo: '/logos/keras.svg', color: '#d00000', emissive: '#9b0000', animation: 'wobble' },
  OpenCV: { logo: '/logos/opencv.svg', color: '#5cb85c', emissive: '#2e7d32', animation: 'spin' },
  'Hugging Face': { logo: '/logos/huggingface.svg', color: '#ffbd59', emissive: '#f9a825', animation: 'pulse' },
  MySQL: { logo: '/logos/mysql.svg', color: '#00758f', emissive: '#004d66', animation: 'float' },
  DBMS: { logo: '/logos/postgresql.svg', color: '#546e7a', emissive: '#37474f', animation: 'spin' },
  Pandas: { logo: '/logos/pandas.svg', color: '#150458', emissive: '#e70488', animation: 'orbit' },
  NumPy: { logo: '/logos/numpy.svg', color: '#4d77cf', emissive: '#013243', animation: 'spin' },
  Matplotlib: { logo: '/logos/matplotlib.svg', color: '#11557c', emissive: '#0d3d56', animation: 'float' },
  'Power BI': { logo: '/logos/powerbi.svg', color: '#f2c811', emissive: '#b8960b', animation: 'spin' },
  Tableau: { logo: '/logos/tableau.svg', color: '#e97627', emissive: '#b85c14', animation: 'pulse' },
}

export function getTechLogo(name: string): TechLogoConfig {
  if (techLogoMap[name]) return techLogoMap[name]
  const hue = Math.abs(hash(name)) % 360
  return {
    logo: DEFAULT_LOGO,
    color: `hsl(${hue}, 65%, 55%)`,
    emissive: `hsl(${hue}, 65%, 35%)`,
    animation: 'float',
  }
}

function hash(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return h
}
