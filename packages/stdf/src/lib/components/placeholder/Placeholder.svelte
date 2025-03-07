<script lang="ts">
	import type { PlaceholderProps } from '../../types/index.js';

	let { py = '4', height = 'full', radius = 'md', shadow = 'none', injClass = '', children }: PlaceholderProps = $props();

	// 上下内边距样式
	// up down padding style
	const pyObj = { '0': ' py-0', '1': ' py-1', '2': ' py-2', '3': ' py-3', '4': ' py-4', '8': ' py-8' };

	// 阴影样式
	// shadow style
	const shadowObj = {
		none: ' shadow-none',
		xs: ' shadow-xs dark:shadow-white/5',
		sm: 'shadow-sm dark:shadow-white/10',
		md: ' shadow-md dark:shadow-white/10',
		lg: ' shadow-lg dark:shadow-white/10',
		xl: ' shadow-xl dark:shadow-white/10',
		'2xl': ' shadow-2xl dark:shadow-white/20'
	};

	// 圆角样式
	// radius style
	const radiusObj = {
		none: ' rounded-none',
		sm: ' rounded-sm',
		md: ' rounded-md',
		xl: ' rounded-xl',
		'2xl': ' rounded-2xl',
		'3xl': ' rounded-3xl',
		full: ' rounded-full'
	};

	// 高度样式
	// height style
	const heightObj = {
		full: ' h-full',
		'1': ' h-1',
		'2': ' h-2',
		'4': ' h-4',
		'8': ' h-8',
		'16': ' h-16',
		'24': ' h-24',
		'32': ' h-32',
		'48': ' h-48',
		'64': ' h-64',
		'96': ' h-96'
	};
</script>

<div
	class="flex flex-col justify-center bg-black/5 dark:bg-white/5 text-center{heightObj[height] || heightObj.full}{pyObj[py] ||
		pyObj['4']}{radiusObj[radius] || radiusObj.md}{shadowObj[shadow] || shadowObj.none}{injClass === '' ? '' : ` ${injClass}`}"
>
	{@render children?.()}
</div>
