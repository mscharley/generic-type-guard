import { configs, withStyles } from '@mscharley/eslint-config';

export default [
	...configs.recommended,
	...configs.node,
	...withStyles(),
	...configs.license['MPL-2.0'](),
	{
		ignores: [
			'node_modules',
			'dist',
			'reports',
			'eslint.config.js',
			'generic-type-guard.*',
			'.stryker-tmp',
			'src/**/__tests__',
			'src/**/__utils__',
		],
	},
	{
		files: ['*.config.js'],
		rules: {
			'notice/notice': 'off',
		},
	},
];
