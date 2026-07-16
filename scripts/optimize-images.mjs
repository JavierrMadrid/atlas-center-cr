/**
 * Convierte todas las imágenes JPG/PNG de public/imagenes a WebP.
 * Mantiene los originales para compatibilidad; genera .webp junto a cada fichero.
 * Máximo 1600px de ancho para fotos generales, 800px para logos.
 */

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, '..', 'public', 'imagenes')

const QUALITY_PHOTO = 82
const QUALITY_UI = 88   // logos, tarifas, iconos
const MAX_W_PHOTO = 1600
const MAX_W_UI = 1400

const isUiImage = (filePath) =>
  /tarifas|logo|equipo/i.test(filePath)

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await listImages(full)))
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

const files = await listImages(imagesDir)

let converted = 0
let skipped = 0
let totalSavedBytes = 0

for (const file of files) {
  const ext = extname(file)
  const webpPath = file.slice(0, -ext.length) + '.webp'

  const ui = isUiImage(file)
  const quality = ui ? QUALITY_UI : QUALITY_PHOTO
  const maxWidth = ui ? MAX_W_UI : MAX_W_PHOTO

  try {
    const original = await stat(file)
    const meta = await sharp(file).metadata()
    const needsResize = meta.width > maxWidth

    const pipeline = sharp(file)
    if (needsResize) pipeline.resize({ width: maxWidth, withoutEnlargement: true })

    const webpBuffer = await pipeline
      .webp({ quality, effort: 4 })
      .toBuffer()

    const savedBytes = original.size - webpBuffer.length
    totalSavedBytes += savedBytes

    await sharp(webpBuffer).toFile(webpPath)

    const origKB = (original.size / 1024).toFixed(1)
    const newKB = (webpBuffer.length / 1024).toFixed(1)
    console.log(`✓ ${basename(file).padEnd(48)} ${origKB.padStart(8)} KB → ${newKB.padStart(7)} KB WebP  (${savedBytes > 0 ? '-' : '+'}${(Math.abs(savedBytes) / 1024).toFixed(0)} KB)`)
    converted++
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`)
    skipped++
  }
}

const savedMB = (totalSavedBytes / 1024 / 1024).toFixed(1)
console.log(`\nConvertidas: ${converted} | Omitidas: ${skipped} | Ahorro total: ${savedMB} MB`)

// Aviso si quedan JPGs referenciados por el código sin su versión .webp
const { readFileSync } = await import('fs')
const referencedJpgs = new Set()
const collectFromFile = (filePath) => {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const matches = content.matchAll(/\/imagenes\/([a-z0-9_-]+)\.jpg\b/gi)
    for (const match of matches) {
      referencedJpgs.add(match[1])
    }
  } catch {}
}
collectFromFile(resolve(rootDir, 'src/App.jsx'))
for (const page of ['HomePage', 'FisioterapiaPage', 'PilatesYogaPage', 'PricingPage', 'TeamPage', 'ContactPage']) {
  collectFromFile(resolve(rootDir, 'src/pages', `${page}.jsx`))
}

const missingWebp = []
for (const name of referencedJpgs) {
  const webp = resolve(imagesDir, `${name}.webp`)
  try {
    await stat(webp)
  } catch {
    missingWebp.push(name)
  }
}

if (missingWebp.length) {
  console.log(`\n⚠ JPGs referenciados sin .webp: ${missingWebp.join(', ')}. Vuelve a correr el script para regenerarlos.`)
}
