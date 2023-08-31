// JavaScript Project
module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte', '.json'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
