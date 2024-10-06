import { configs } from "@mscharley/eslint-config";

export default [
	...configs.recommended,
	...configs.node,
	{
		ignores: [
			'node_modules',
			'dist',
			'coverage',
			'reports/mutation',
			'eslint.config.js',
			'generic-type-guard.*',
		],
	},
];
