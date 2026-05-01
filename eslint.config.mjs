import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig(
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'public/**'
    ]
  },
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/comma-dangle': ['error', 'never']
      // 'no-ver': 'error',
      // 'prefer-const': 'error'
    }
  }
)
