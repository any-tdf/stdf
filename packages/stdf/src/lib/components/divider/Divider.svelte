<script lang="ts">
	import type { DividerProps } from '../../types/index.js';

	let {
		layout = 'h',
		px = '0',
		py = '4',
		text = '',
		align = 'center',
		line = 'solid',
		mx = '1',
		weight = '1',
		injClass = ''
	}: DividerProps = $props();

	// 水平间距样式
	// Horizontal spacing style
	const pxObj = { '0': 'px-0', '4': 'px-4', '8': 'px-8', '16': 'px-16', '36': 'px-36' };

	// 水平高度样式
	// Horizontal height style
	const pyObj = { '0': 'py-0', '4': 'py-4', '8': 'py-8' };

	// 垂直间距样式
	// Vertical spacing style
	const mxObj = { '1': 'm-1', '2': 'm-2', '4': 'm-4' };

	// 线条风格样式
	// Line style style
	const lineObj = { solid: 'border-solid', dashed: 'border-dashed', dotted: 'border-dotted' };

	// 线条粗细样式
	// Line thickness style
	const weightHObj = { '1': 'border-t', '2': 'border-t-2 rounded-full', '4': 'border-t-4 rounded-full' };

	// 线条粗细样式
	// Line thickness style
	const weightWObj = { '1': 'border-r', '2': 'border-r-2 rounded-full', '4': 'border-r-4 rounded-full' };
</script>

{#if layout === 'v'}
	<div
		class="inline {weightWObj[weight] || weightWObj['1']} border-black/10 dark:border-white/20 {mxObj[mx] || mxObj['1']} {lineObj[line] ||
			lineObj.solid} {injClass}"
	></div>
{:else}
	<div class="flex items-center {pxObj[px] || pxObj['0']} {pyObj[py] || pyObj['4']}">
		{#if (text !== '' && align !== 'left') || text === ''}
			<div
				class="grow {weightHObj[weight] || weightHObj['1']} border-black/10 dark:border-white/20 {lineObj[line] ||
					lineObj.solid} {injClass}"
			></div>
		{/if}
		{#if text !== ''}
			<div class="mx-2 flex-none text-xs text-gray-400 {injClass}">{text}</div>
		{/if}
		{#if (text !== '' && align !== 'right') || text === ''}
			<div
				class="grow {weightHObj[weight] || weightHObj['1']} border-black/10 dark:border-white/20 {lineObj[line] ||
					lineObj.solid} {injClass}"
			></div>
		{/if}
	</div>
{/if}
