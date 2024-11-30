<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly, scale, type ScaleParams, type FlyParams } from 'svelte/transition';

	type Props = {
		visible?: boolean;
		size?: number;
		transitionParams?: ScaleParams | FlyParams;
		transitionOutParams?: ScaleParams | FlyParams;
		position?: string;
		px?: string;
		py?: string;
		children?: Snippet;
	};
	let {
		visible = false,
		size = 40,
		transitionParams = {},
		transitionOutParams = {},
		position = 'bottom',
		px = '0',
		py = '0',
		children
	}: Props = $props();

	const sizeClass = { bottom: 'w-full', top: 'w-full', left: 'h-full', right: 'h-full', center: 'w-full' };
	const sizeStyle = {
		bottom: `height:${size === 0 ? 'auto' : size + '%'}`,
		top: `height:${size === 0 ? 'auto' : size + '%'}`,
		left: `width:${size === 0 ? 'auto' : size + '%'}`,
		right: `width:${size === 0 ? 'auto' : size + '%'}`,
		center: `height:${size === 0 ? 'auto' : size + '%'}`
	};
	const pxClass = {
		'0': ' px-0',
		'1': ' px-1',
		'2': ' px-2',
		'3': ' px-3',
		'4': ' px-4',
		'5': ' px-5',
		'6': ' px-6',
		'8': ' px-8',
		'10': ' px-10',
		'12': ' px-12',
		'16': ' px-16',
		'20': ' px-20'
	};
	const pyClass = {
		'0': ' py-0',
		'1': ' py-1',
		'2': ' py-2',
		'3': ' py-3',
		'4': ' py-4',
		'5': ' py-5',
		'6': ' py-6',
		'8': ' py-8',
		'10': ' py-10',
		'12': ' py-12',
		'16': ' py-16',
		'24': ' py-24',
		'32': ' py-32',
		'48': ' py-48',
		'64': ' py-64'
	};
</script>

{#if visible}
	{#if position === 'center'}
		<div
			out:scale|global={transitionOutParams}
			in:scale|global={transitionParams}
			class="{sizeClass[position as keyof typeof sizeClass] || sizeClass['bottom']}{pxClass[px as keyof typeof pxClass] ||
				pxClass['0']}{pyClass[py as keyof typeof pyClass] || pyClass['0']} pointer-events-auto"
			style={sizeStyle[position as keyof typeof sizeStyle] || sizeStyle['bottom']}
		>
			{@render children?.()}
		</div>
	{:else}
		<div
			in:fly|global={transitionParams}
			out:fly|global={transitionOutParams}
			class="{sizeClass[position as keyof typeof sizeClass] || sizeClass['bottom']}{pxClass[px as keyof typeof pxClass] ||
				pxClass['0']}{pyClass[py as keyof typeof pyClass] || pyClass['0']} pointer-events-auto"
			style={sizeStyle[position as keyof typeof sizeStyle] || sizeStyle['bottom']}
		>
			{@render children?.()}
		</div>
	{/if}
{/if}
