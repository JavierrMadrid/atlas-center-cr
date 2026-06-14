import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const distDir = resolve(rootDir, 'dist')

const { render, getHeadHtml } = await import('../dist/server/entry-server.js')

const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8')

const routes = [
  '/',
  '/equipo',
  '/fisioterapia',
  '/pilates-zenn',
  '/tarifas-horarios',
  '/contacto',
]

for (const route of routes) {
  const { html } = render(route)
  const headTags = getHeadHtml(route)

  const finalHtml = template
    .replace('</head>', `    ${headTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  const outputDir = route === '/' ? distDir : resolve(distDir, route.slice(1))
  mkdirSync(outputDir, { recursive: true })
  writeFileSync(resolve(outputDir, 'index.html'), finalHtml)

  console.log(`✓ Prerendered ${route}`)
}

// Limpiar bundle SSR temporal
rmSync(resolve(distDir, 'server'), { recursive: true, force: true })

console.log('Prerendering completado.')
