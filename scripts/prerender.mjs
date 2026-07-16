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

const SITE_URL = process.env.VITE_SITE_URL || 'https://atlas-center.com'

const seoConfig = {
  '/': { priority: 1.0, changefreq: 'weekly' },
  '/equipo': { priority: 0.8, changefreq: 'monthly' },
  '/fisioterapia': { priority: 0.8, changefreq: 'monthly' },
  '/pilates-zenn': { priority: 0.8, changefreq: 'monthly' },
  '/tarifas-horarios': { priority: 0.9, changefreq: 'weekly' },
  '/contacto': { priority: 0.9, changefreq: 'weekly' },
}

const lastmodISO = new Date().toISOString().slice(0, 10)

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

// Regenerar sitemap.xml con lastmod dinámico
const sitemapUrls = routes
  .filter((route) => route !== '/404')
  .map((route) => {
    const config = seoConfig[route] ?? { priority: 0.5, changefreq: 'monthly' }
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}/`
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmodISO}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority.toFixed(1)}</priority>
  </url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`

writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap, 'utf-8')
console.log(`✓ sitemap.xml regenerado (lastmod=${lastmodISO})`)

console.log('Prerendering completado.')
