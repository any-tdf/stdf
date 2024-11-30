<script lang="ts">
	import type { GridProps } from '../../types/index.js';

	let { col = '1', row = '1', children }: GridProps = $props();

	// 根据行数生成样式
	// Generate styles based on the number of rows
	const rowObj = { '1': 'row-span-1', '2': 'row-span-2', '3': 'row-span-3', '4': 'row-span-4', '5': 'row-span-5', '6': 'row-span-6' };

	// 根据列数生成样式
	// Generate styles based on the number of columns
	const colObj = {
		'1': ' col-span-1',
		'2': ' col-span-2',
		'3': ' col-span-3',
		'4': ' col-span-4',
		'5': ' col-span-5',
		'6': ' col-span-6',
		'7': ' col-span-7',
		'8': ' col-span-8',
		'9': ' col-span-9',
		'10': ' cols-span-10',
		'11': ' cols-span-11',
		'12': ' cols-span-12'
	};
</script>

<div class="{rowObj[row] || rowObj['1']}{colObj[col] || colObj['1']}">
	{@render children?.()}
</div>
