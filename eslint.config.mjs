import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/**
 * Flat ESLint config for Next.js 16 (ESLint 10). `next lint` was removed in
 * Next 16, so ESLint runs directly against these flat configs.
 */
const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
]

export default config
