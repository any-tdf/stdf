<script lang="ts">
	import type { GridsProps } from '../../types/index.js';

	let { cols = '6', gap = '2', mx = '2', my = '2', children }: GridsProps = $props();

	//根据列数生成样式
	// Generate styles based on the number of columns
	const colsObj = {
		'1': ' grid-cols-1',
		'2': ' grid-cols-2',
		'3': ' grid-cols-3',
		'4': ' grid-cols-4',
		'5': ' grid-cols-5',
		'6': ' grid-cols-6',
		'7': ' grid-cols-7',
		'8': ' grid-cols-8',
		'9': ' grid-cols-9',
		'10': ' grid-cols-10',
		'11': ' grid-cols-11',
		'12': ' grid-cols-12'
	};

	//水平外边距样式
	// Horizontal margin style
	const mxObj = { '0': ' mx-0', '1': ' mx-1', '2': ' mx-2', '4': ' mx-4', '8': ' mx-8' };

	//垂直外边距样式
	// Vertical margin style
	const myObj = { '0': ' my-0', '1': ' my-1', '2': ' my-2', '4': ' my-4', '8': ' my-8' };

	//内部间距样式
	// Internal spacing style
	const gapObj = { '0': ' gap-0', '1': ' gap-1', '2': ' gap-2', '4': ' gap-4', '8': ' gap-8' };
</script>

<div class="grid{colsObj[cols] || colsObj['6']}{mxObj[mx] || mxObj['2']}{myObj[my] || myObj['2']}{gapObj[gap] || gapObj['2']}">
	{@render children?.()}
</div>
