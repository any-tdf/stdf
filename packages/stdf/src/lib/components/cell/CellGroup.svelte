<script lang="ts">
	import type { CellGroupProps } from '../../types/index.js';
	import { radiusObj, bgObj } from '../utils/index.js';

	let { radius = '', shadow = 'xs', bg = 'surface', my = '4', mx = '2', children }: CellGroupProps = $props();

	const shadowClass = {
		none: ' shadow-none',
		xs: ' shadow-xs dark:shadow-white/5',
		sm: ' shadow-sm dark:shadow-white/5',
		md: ' shadow-md dark:shadow-white/10',
		lg: ' shadow-lg dark:shadow-white/10',
		xl: ' shadow-xl dark:shadow-white/10',
		'2xl': ' shadow-2xl dark:shadow-white/25'
	};
	const mxClass = { '0': ' mx-0', '1': ' mx-1', '2': ' mx-2', '3': ' mx-3', '4': ' mx-4', '6': ' mx-6', '8': ' mx-8' };
	const myClass = { '0': ' my-0', '1': ' my-1', '2': ' my-2', '3': ' my-3', '4': ' my-4', '6': ' my-6', '8': ' my-8' };
</script>

<div
	class="{bgObj[bg] || bgObj['gray']} overflow-hidden{shadowClass[shadow] || shadowClass['xs']} {radius ? radiusObj[radius] : 'rounded-(--radius-box)'}{myClass[
		my
	] || myClass['4']}{mxClass[mx] || mxClass['2']}"
>
	{@render children?.()}
</div>
