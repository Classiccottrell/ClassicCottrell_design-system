#!/usr/bin/env node
// Level 1 trust: reads and reports only. No --fix mode, no edits.
// Rules checked here are documented in docs/CONVENTIONS.md and AGENTS.md.

import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const UI_DIR = path.join(ROOT, 'components/ui')
const GLOBALS_CSS = path.join(ROOT, 'app/globals.css')

function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
}

function checkNoRawHex(file, src) {
  const matches = stripComments(src).match(/#[0-9a-fA-F]{3,8}\b/g)
  return matches
    ? { file, check: 'no-raw-hex', status: 'fail', detail: `found ${matches.join(', ')}` }
    : { file, check: 'no-raw-hex', status: 'pass' }
}

function checkDataSlot(file, src) {
  return /data-slot=/.test(src)
    ? { file, check: 'data-slot', status: 'pass' }
    : { file, check: 'data-slot', status: 'fail', detail: 'no data-slot attribute found' }
}

function checkKebabFilename(file) {
  return /^[a-z][a-z0-9]*(-[a-z0-9]+)*\.tsx$/.test(file)
    ? { file, check: 'kebab-case-filename', status: 'pass' }
    : { file, check: 'kebab-case-filename', status: 'fail', detail: 'filename is not kebab-case' }
}

function checkExampleTag(file, src) {
  return /@example/.test(src)
    ? { file, check: 'example-tag', status: 'pass' }
    : { file, check: 'example-tag', status: 'warn', detail: 'no @example JSDoc tag' }
}

function extractBlock(src, selectorRegex) {
  const match = selectorRegex.exec(src)
  if (!match) return ''
  const start = match.index + match[0].length
  const end = src.indexOf('}', start)
  return src.slice(start, end)
}

function checkTokenPairing(cssSrc) {
  const rootBlock = extractBlock(cssSrc, /:root\s*\{/)
  const themeBlock = extractBlock(cssSrc, /@theme inline\s*\{/)

  const rootVars = [...rootBlock.matchAll(/--([a-z0-9-]+):/g)]
    .map((m) => m[1])
    .filter((name) => name !== 'radius' && !name.startsWith('font-'))

  const themeAliases = new Set(
    [...themeBlock.matchAll(/--color-([a-z0-9-]+):\s*var\(--([a-z0-9-]+)\)/g)].map((m) => m[1]),
  )

  return rootVars.map((name) =>
    themeAliases.has(name)
      ? { file: 'app/globals.css', check: `token-pairing:${name}`, status: 'pass' }
      : {
          file: 'app/globals.css',
          check: `token-pairing:${name}`,
          status: 'fail',
          detail: `--${name} is declared in :root but has no --color-${name} alias in @theme inline`,
        },
  )
}

function printTable(rows) {
  const width = { file: 4, check: 5, status: 6 }
  for (const r of rows) {
    width.file = Math.max(width.file, r.file.length)
    width.check = Math.max(width.check, r.check.length)
    width.status = Math.max(width.status, r.status.length)
  }
  for (const r of rows) {
    const line = [
      r.file.padEnd(width.file),
      r.check.padEnd(width.check),
      r.status.padEnd(width.status),
      r.detail ?? '',
    ].join('  ')
    console.log(line)
  }
}

const results = []
const files = readdirSync(UI_DIR).filter((f) => f.endsWith('.tsx'))
for (const file of files) {
  const src = readFileSync(path.join(UI_DIR, file), 'utf8')
  results.push(checkNoRawHex(file, src))
  results.push(checkDataSlot(file, src))
  results.push(checkKebabFilename(file))
  results.push(checkExampleTag(file, src))
}
results.push(...checkTokenPairing(readFileSync(GLOBALS_CSS, 'utf8')))

printTable(results)

const failCount = results.filter((r) => r.status === 'fail').length
const warnCount = results.filter((r) => r.status === 'warn').length
console.log(
  `\n${results.length} checks: ${results.length - failCount - warnCount} passed, ${warnCount} warned, ${failCount} failed.`,
)

process.exit(failCount > 0 ? 1 : 0)
