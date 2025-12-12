import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	{
		ignores: ['.svelte-kit/**', 'node_modules/**', 'build/**', 'dist/**']
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,svelte}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2020,
				extraFileExtensions: ['.svelte']
			},
			globals: {
				console: 'readonly',
				document: 'readonly',
				window: 'readonly',
				localStorage: 'readonly',
				crypto: 'readonly',
				KeyboardEvent: 'readonly',
				HTMLInputElement: 'readonly'
			}
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			svelte: sveltePlugin,
			prettier: prettier
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...sveltePlugin.configs.recommended.rules,
			'prettier/prettier': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			],
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser
			}
		}
	},
	prettierConfig
];
