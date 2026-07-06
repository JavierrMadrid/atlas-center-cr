import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const distDir = resolve(rootDir, 'dist')

const { render } = await import('../dist/server/entry-server.js')

const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8')

const routes = [
  '/',
  '/equipo',
  '/fisioterapia',
  '/pilates-zenn',
  '/tarifas-horarios',
  '/contacto',
  '/404',
]

// En react-helmet-async v3 + React 19, el componente <Helmet> pinta las
// etiquetas SEO como nodos JSX dentro del árbol. Como renderToString no las
// hoistea al <head> (eso solo pasa en cliente), las extraemos del body y
// las reubicamos en <head> para evitar duplicados y que la herramienta de
// SEO solo vea una etiqueta por tipo.
const extractHelmetTags = (markup) => {
  const collected = []
  let cleaned = markup

  const titleMatch = cleaned.match(/<title[^>]*>[\s\S]*?<\/title>/i)
  if (titleMatch) {
    collected.push(titleMatch[0])
    cleaned = cleaned.replace(titleMatch[0], '')
  }

  const collectAndStrip = (regex) => {
    for (const match of [...cleaned.matchAll(regex)]) {
      collected.push(match[0])
    }
    cleaned = cleaned.replace(regex, '')
  }

  collectAndStrip(/<meta[^>]*\/?>/gi)
  collectAndStrip(/<link[^>]*\/?>/gi)
  collectAndStrip(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi)

  return { collected, cleaned }
}

for (const route of routes) {
  const { html } = render(route)
  const { collected, cleaned } = extractHelmetTags(html)
  const headHtml = collected.join('\n    ')

  const finalHtml = template
    .replace('</head>', `    ${headHtml}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${cleaned}</div>`)

  if (route === '/404') {
    writeFileSync(resolve(distDir, '404.html'), finalHtml)
    console.log('✓ Prerendered /404.html')
    continue
  }

  const outputDir = route === '/' ? distDir : resolve(distDir, route.slice(1))
  mkdirSync(outputDir, { recursive: true })
  writeFileSync(resolve(outputDir, 'index.html'), finalHtml)

  console.log(`✓ Prerendered ${route}`)
}

// Limpiar bundle SSR temporal
rmSync(resolve(distDir, 'server'), { recursive: true, force: true })

console.log('Prerendering completado.')
