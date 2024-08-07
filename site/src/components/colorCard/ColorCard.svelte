<script>
	import Color from 'color';
	export let colorList = []; //颜色列表

	// 传入 hsl(222, 100%, 98%) 这种字符，将其中的数字四舍五入取整后返回字符
	const getHslFunc = str => {
		const arr = str.split(',');
		const h = Math.round(Number(arr[0].split('(')[1]));
		const s = Math.round(Number(arr[1].split('%')[0]));
		const l = Math.round(Number(arr[2].split('%')[0]));
		return `hsl(${h}, ${s}%, ${l}%)`;
	};
</script>

{#each colorList as color, index}
	<div
		class="flex-1 flex justify-between self-center w-full px-4 md:py-0 transition hover:scale-105 hover:rounded {index > 5
			? 'text-white'
			: 'text-black'}"
		style="background-color: {color.hex};"
	>
		<div class="flex flex-col justify-center text-sm">{color.key}</div>
		<div class="mt-2 flex flex-col justify-center text-right py-1 text-xs">
			<div>{color.hex || ''}</div>
			<div>{Color(color.hex).rgb().string()}</div>
			<div>{getHslFunc(Color(color.hex).hsl().string())}</div>
		</div>
	</div>
{/each}
