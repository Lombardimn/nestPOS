// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      // Espaciado entre bloques, decoradores, imports, etc.
      'padding-line-between-statements': [
        'error',
        // Espacio entre imports y otras declaraciones
        //{ blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'always', prev: '*', next: 'export' },

        // Espacio antes de return
        { blankLine: 'always', prev: '*', next: 'return' },

        // Espacio antes de if
        { blankLine: 'always', prev: '*', next: 'if' },

        // Espacio antes de block-like (clases, funciones, etc.)
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },

        // Espacio entre decoradores y clases o funciones
        { blankLine: 'always', prev: 'directive', next: 'class' },
        { blankLine: 'always', prev: 'directive', next: 'function' },
        { blankLine: 'always', prev: '*', next: 'directive' },
      ],
      'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        endOfLine: 'auto'
      },
      ],
    },
  },
);