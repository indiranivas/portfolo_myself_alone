import { existsSync, readdirSync } from 'fs'
import { join } from 'path'

const dist = join(process.cwd(), 'dist')
const assets = join(dist, 'assets')

if (!existsSync(join(dist, 'index.html'))) {
  console.error('verify-dist: missing dist/index.html')
  process.exit(1)
}

const js = readdirSync(assets).filter((f) => f.endsWith('.js'))
if (!js.length) {
  console.error('verify-dist: no JS bundle in dist/assets')
  process.exit(1)
}

console.log('verify-dist: ok', js[0])
