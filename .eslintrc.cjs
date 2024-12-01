module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'prettier'
	],
	parserOptions: {
		parser: '@typescript-eslint/parser'
	},
	plugins: ['vue', 'prettier', 'simple-import-sort'],
	rules: {
		'no-undef': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'vue/multi-word-component-names': 'off',
		'@typescript-eslint/ban-types': [
			'error',
			{
				types: {
					'{}': false
				},
				extendDefaults: true
			}
		]
	}
};
