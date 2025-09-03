// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';

import globals from 'globals';

import react from 'eslint-plugin-react';

import reactHooks from 'eslint-plugin-react-hooks';

import jsxA11y from 'eslint-plugin-jsx-a11y';

import unicorn from 'eslint-plugin-unicorn';

import json from 'eslint-plugin-jsonc';

export default [
  {
    settings: { react: { version: 'detect' } },
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: ['dist/**'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      unicorn,
      json,
      '@typescript-eslint': tseslint,
    },
    rules: {
      // базовые
      'no-unused-vars': ['error', { args: 'none' }],
      'function-paren-newline': 'off',
      'implicit-arrow-linebreak': 'off',
      'no-console': 'off',
      'no-confusing-arrow': 'off',
      'object-curly-newline': 'off',
      'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],

      // React
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['function-declaration', 'arrow-function'],
          unnamedComponents: 'arrow-function',
        },
      ],

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // A11y
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',

      // Unicorn
      'unicorn/filename-case': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-switch': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/expiring-todo-comments': 'off',
      'unicorn/prefer-module': 'off',

      // TS (общие)
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Переопределение ТОЛЬКО для TS/TSX: выключаем базовое правило и включаем TS-версию
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // игнорим подчёркнутые переменные, аргументы и rest-сиблинги
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
