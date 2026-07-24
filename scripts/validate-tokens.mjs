#!/usr/bin/env node
// Level 1 trust: reads and reports only. No --fix mode, no edits.
// Rules checked here are documented in docs/CONVENTIONS.md and AGENTS.md.

import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const UI_DIR = path.join(ROOT, 'components/ui')
const GLOBALS_CSS = path.join(ROOT, 'app/globals.css')
const COLOR_PALETTE = path.join(ROOT, 'components/ds/color-palette.tsx')
const LAYOUT = path.join(ROOT, 'app/layout.tsx')

// Declared in :root only — theme-independent, so not expected in .dark.
const THEME_INDEPENDENT = new Set(['radius'])

const pass = (file, check) => ({ file, check, status: 'pass' })
const fail = (file, check, detail) => ({ file, check, status: 'fail', detail })
const warn = (file, check, detail) => ({ file, check, status: 'warn', detail })

/**
 * Strip comments so they can't trip the source checks. `//` is only treated as
 * a line comment when it isn't part of a URL (`https://…`), so a hex literal
 * sitting after a URL on the same line still gets seen.
 */
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')
}

/** Body of the first `<selector> { … }` block. These blocks have no nesting. */
function extractBlock(src, selectorRegex) {
  const match = selectorRegex.exec(src)
  if (!match) return null
  const start = match.index + match[0].length
  const end = src.indexOf('}', start)
  return end === -1 ? null : src.slice(start, end)
}

/** Map of custom-property name (no `--`) to its declared value. */
function declaredVars(block) {
  const out = new Map()
  for (const m of block.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) {
    out.set(m[1], m[2].trim())
  }
  return out
}

// ---------------------------------------------------------------------------
// components/ui/* source checks
// ---------------------------------------------------------------------------

function checkNoRawHex(file, src) {
  const matches = stripComments(src).match(/#[0-9a-fA-F]{3,8}\b/g)
  return matches
    ? fail(file, 'no-raw-hex', `found ${matches.join(', ')} — use a token utility`)
    : pass(file, 'no-raw-hex')
}

function checkDataSlot(file, src) {
  return /data-slot=/.test(src)
    ? pass(file, 'data-slot')
    : fail(file, 'data-slot', 'no data-slot attribute found')
}

function checkKebabFilename(file) {
  return /^[a-z][a-z0-9]*(-[a-z0-9]+)*\.tsx$/.test(file)
    ? pass(file, 'kebab-case-filename')
    : fail(file, 'kebab-case-filename', 'filename is not kebab-case')
}

// Enforced, not advisory: coverage reached 100% of components/ui, so this is
// a ratchet — a new primitive without a usage example fails the build.
function checkExampleTag(file, src) {
  return /@example/.test(src)
    ? pass(file, 'example-tag')
    : fail(file, 'example-tag', 'no @example JSDoc tag — show how the component is used')
}

// ---------------------------------------------------------------------------
// Token checks (app/globals.css)
// ---------------------------------------------------------------------------

/** Every `:root` var must have a matching `--color-*` alias in `@theme inline`. */
function checkTokenPairing(rootVars, themeBlock) {
  const aliases = new Set(
    [...themeBlock.matchAll(/--color-([a-z0-9-]+):\s*var\(--([a-z0-9-]+)\)/g)].map((m) => m[1]),
  )
  const results = []
  for (const name of rootVars.keys()) {
    if (THEME_INDEPENDENT.has(name) || name.startsWith('font-')) continue
    results.push(
      aliases.has(name)
        ? pass('app/globals.css', `token-pairing:${name}`)
        : fail(
            'app/globals.css',
            `token-pairing:${name}`,
            `--${name} is in :root but has no --color-${name} alias in @theme inline`,
          ),
    )
  }
  return results
}

/**
 * `:root`, `.dark`, and the `prefers-color-scheme` fallback must declare the
 * same set of themeable vars. Catches the most likely silent break: adding a
 * color to :root and forgetting dark mode.
 */
function checkThemeParity(rootVars, darkVars, mediaVars) {
  const expected = [...rootVars.keys()].filter(
    (n) => !THEME_INDEPENDENT.has(n) && !n.startsWith('font-'),
  )
  const results = []
  for (const [label, vars] of [
    ['dark', darkVars],
    ['media-fallback', mediaVars],
  ]) {
    const missing = expected.filter((n) => !vars.has(n))
    const extra = [...vars.keys()].filter((n) => !rootVars.has(n))
    if (missing.length === 0 && extra.length === 0) {
      results.push(pass('app/globals.css', `theme-parity:${label}`))
    } else {
      const parts = []
      if (missing.length) parts.push(`missing ${missing.map((n) => `--${n}`).join(', ')}`)
      if (extra.length) parts.push(`unexpected ${extra.map((n) => `--${n}`).join(', ')}`)
      results.push(fail('app/globals.css', `theme-parity:${label}`, parts.join('; ')))
    }
  }
  return results
}

// ---------------------------------------------------------------------------
// Drift checks — hardcoded hex that mirrors a token must stay in sync
// ---------------------------------------------------------------------------

/**
 * color-palette.tsx pairs a `token` with a display `hex`. Nothing at runtime
 * keeps them honest, so a token edit would leave a stale swatch label behind.
 */
function checkSwatchDrift(rootVars) {
  let src
  try {
    src = readFileSync(COLOR_PALETTE, 'utf8')
  } catch {
    return [warn('components/ds/color-palette.tsx', 'swatch-drift', 'file not found — skipped')]
  }

  const pairs = [...src.matchAll(/token:\s*'--([a-z0-9-]+)',\s*\n\s*hex:\s*'(#[0-9a-fA-F]{3,8})'/g)]
  if (pairs.length === 0) {
    return [
      warn(
        'components/ds/color-palette.tsx',
        'swatch-drift',
        'no {token, hex} pairs found — check the parser if swatches still exist',
      ),
    ]
  }

  return pairs.map(([, token, hex]) => {
    const actual = rootVars.get(token)
    if (!actual) {
      return fail(
        'components/ds/color-palette.tsx',
        `swatch-drift:${token}`,
        `--${token} is not declared in :root`,
      )
    }
    return actual.toLowerCase() === hex.toLowerCase()
      ? pass('components/ds/color-palette.tsx', `swatch-drift:${token}`)
      : fail(
          'components/ds/color-palette.tsx',
          `swatch-drift:${token}`,
          `swatch shows ${hex} but --${token} is ${actual}`,
        )
  })
}

/** layout.tsx themeColor duplicates --background for light and dark. */
function checkThemeColorDrift(rootVars, darkVars) {
  let src
  try {
    src = readFileSync(LAYOUT, 'utf8')
  } catch {
    return [warn('app/layout.tsx', 'theme-color-drift', 'file not found — skipped')]
  }

  const expected = [
    ['light', rootVars.get('background')],
    ['dark', darkVars.get('background')],
  ]

  return expected.map(([scheme, value]) => {
    const re = new RegExp(
      `prefers-color-scheme:\\s*${scheme}\\)['"],\\s*color:\\s*['"](#[0-9a-fA-F]{3,8})['"]`,
    )
    const found = re.exec(src)
    if (!found) {
      return warn(
        'app/layout.tsx',
        `theme-color-drift:${scheme}`,
        'could not locate themeColor entry — check the parser',
      )
    }
    return found[1].toLowerCase() === String(value).toLowerCase()
      ? pass('app/layout.tsx', `theme-color-drift:${scheme}`)
      : fail(
          'app/layout.tsx',
          `theme-color-drift:${scheme}`,
          `themeColor is ${found[1]} but --background (${scheme}) is ${value}`,
        )
  })
}

// ---------------------------------------------------------------------------

function printTable(rows) {
  const w = { file: 4, check: 5, status: 6 }
  for (const r of rows) {
    w.file = Math.max(w.file, r.file.length)
    w.check = Math.max(w.check, r.check.length)
    w.status = Math.max(w.status, r.status.length)
  }
  for (const r of rows) {
    console.log(
      [
        r.file.padEnd(w.file),
        r.check.padEnd(w.check),
        r.status.padEnd(w.status),
        r.detail ?? '',
      ]
        .join('  ')
        .trimEnd(),
    )
  }
}

const results = []

for (const file of readdirSync(UI_DIR).filter((f) => f.endsWith('.tsx'))) {
  const src = readFileSync(path.join(UI_DIR, file), 'utf8')
  results.push(checkNoRawHex(file, src))
  results.push(checkDataSlot(file, src))
  results.push(checkKebabFilename(file))
  results.push(checkExampleTag(file, src))
}

const css = readFileSync(GLOBALS_CSS, 'utf8')
const rootBlock = extractBlock(css, /:root\s*\{/)
const darkBlock = extractBlock(css, /\.dark\s*\{/)
const mediaBlock = extractBlock(css, /:root:not\(\.light\)\s*\{/)
const themeBlock = extractBlock(css, /@theme inline\s*\{/)

if (!rootBlock || !darkBlock || !mediaBlock || !themeBlock) {
  console.error(
    'app/globals.css: could not locate the :root / .dark / media-fallback / @theme inline blocks.',
  )
  process.exit(1)
}

const rootVars = declaredVars(rootBlock)
const darkVars = declaredVars(darkBlock)
const mediaVars = declaredVars(mediaBlock)

results.push(...checkTokenPairing(rootVars, themeBlock))
results.push(...checkThemeParity(rootVars, darkVars, mediaVars))
results.push(...checkSwatchDrift(rootVars))
results.push(...checkThemeColorDrift(rootVars, darkVars))

printTable(results)

const failed = results.filter((r) => r.status === 'fail').length
const warned = results.filter((r) => r.status === 'warn').length
console.log(
  `\n${results.length} checks: ${results.length - failed - warned} passed, ${warned} warned, ${failed} failed.`,
)

process.exit(failed > 0 ? 1 : 0)
