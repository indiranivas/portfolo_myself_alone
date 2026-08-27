export const profileImage =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face'

export const projectImages: Record<string, string> = {
  'AI-Powered Medical Recommendation System':
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop',
  'Speed Limit Automation':
    'https://images.unsplash.com/photo-1449965404569-eb2674f6abf0?w=1200&h=700&fit=crop',
  'Vehicle Crash Detection':
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=700&fit=crop',
}

export const experienceImages: Record<string, string> = {
  Icliniq:
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop',
  'Universiti Sains Islam Malaysia':
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
}

export const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=350&fit=crop', alt: 'AI neural network' },
  { src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=350&fit=crop', alt: 'Code on screen' },
  { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=350&fit=crop', alt: 'Healthcare tech' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=350&fit=crop', alt: 'Circuit board' },
  { src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=350&fit=crop', alt: 'Robotics' },
  { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=350&fit=crop', alt: 'Team workspace' },
  { src: 'https://images.unsplash.com/photo-1535378620166-273708bad64e?w=500&h=350&fit=crop', alt: 'Data visualization' },
  { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=350&fit=crop', alt: 'Digital globe' },
]

export const heroFloatImages = [
  {
    src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=380&fit=crop',
    className: 'top-[12%] left-[6%] w-28 md:w-36 rotate-[-8deg]',
    delay: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=380&fit=crop',
    className: 'top-[18%] right-[5%] w-32 md:w-40 rotate-[10deg]',
    delay: 0.3,
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=380&fit=crop',
    className: 'bottom-[18%] left-[8%] w-24 md:w-32 rotate-[6deg]',
    delay: 0.6,
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=380&fit=crop',
    className: 'bottom-[22%] right-[7%] w-28 md:w-36 rotate-[-12deg]',
    delay: 0.9,
  },
]

export const aboutImages = [
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&h=500&fit=crop',
  'https://images.unsplash.com/photo-1535378620166-273708bad64e?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=400&fit=crop',
]

export function getProjectImage(name: string) {
  return projectImages[name] ?? galleryImages[0].src
}
