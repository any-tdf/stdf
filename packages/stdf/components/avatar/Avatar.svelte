<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from '../icon/Icon.svelte';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	// 图片地址
	// image url
	export let image = '';

	// 替换文本
	// replace text
	export let alt = '';

	// 替换Icon
	// replace Icon
	export let icon = { name: 'ri-user-3-line', theme: true };

	// 替换文本大小
	// replace text size
	export let altSize = 'md';

	// 圆角风格：none/base/xl/full
	// radius style:none/base/xl/full
	export let radius = 'base';

	// 头像框大小，xs/sm/base/md/lg/xl
	// avatar size:xs/sm/base/md/lg/xl
	export let size = 'base';

	// 头像图片大小，s/m/l
	// avatar image size:s/m/l
	export let imgSize = 'l';

	// 边框风格：none/solid/dashed/dotted
	// border style:none/solid/dashed/dotted
	export let line = 'none';

	// 注入CSS
	// inject CSS
	export let injClass = '';

	// 圆角风格样式
	// radius style
	const radiusObj = {
		none: 'rounded-none',
		base: 'rounded',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		'3xl': 'rounded-3xl',
		full: 'rounded-full',
	};

	// 头像框大小样式
	// avatar size style
	const sizeObj = {
		xs: 'w-6 h-6',
		sm: 'w-10 h-10',
		base: 'w-12 h-12',
		md: 'w-16 h-16',
		lg: 'w-20 h-20',
		xl: 'w-28 h-28',
		'2xl': 'w-32 h-32',
	};

	// 头像图片大小样式
	// avatar image size style
	const imgSizeObj = {
		s: 'h-1/3 w-1/3',
		m: 'h-2/3 w-2/3',
		l: 'h-full w-full',
	};

	// 边框风格样式
	// border style
	const lineObj = {
		none: '',
		solid: 'border border-solid border-primary dark:border-dark',
		dashed: 'border border-dashed border-primary dark:border-dark',
		dotted: 'border border-dotted border-primary dark:border-dark',
	};

	// 替换文本大小样式
	// replace text size style
	const altSizeObj = {
		xs: 'text-base',
		sm: 'text-2xl',
		md: 'text-4xl',
		lg: 'text-6xl',
		xl: 'text-8xl',
	};

	// 当默认情况时根据 size 计算 Icon 大小
	// when default, calculate Icon size by size
	const iconSizeObj = {
		xs: 12,
		sm: 20,
		base: 24,
		md: 32,
		lg: 40,
		xl: 56,
		'2xl': 64,
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={`bg-primary-200 dark:bg-dark-200 flex justify-center overflow-hidden relative ${lineObj[line] || ''} ${
		sizeObj[size] || sizeObj.md
	} ${radiusObj[radius] || radiusObj.base} ${injClass}`}
	on:click={() => {
		dispatch('click');
	}}
>
	{#if image === '' && alt === ''}
		<div class="m-auto">
			<Icon size={iconSizeObj[size] || iconSizeObj.base} {...icon} injClass="text-primary-950 dark:text-dark-950" />
		</div>
	{:else if image === '' && alt !== ''}
		<div
			class={`text-center text-primary-950 dark:text-dark-950 ${altSizeObj[altSize] || altSizeObj.base}`}
			style="position: absolute;top: 50%;left:50%;transform: translate(-50%, -50%);"
		>
			{alt}
		</div>
	{:else}
		<div class="m-auto text-center">
			<img
				src={image}
				class={`object-cover inline-block ${imgSizeObj[imgSize] || imgSizeObj.l}`}
				alt=""
				style="position: absolute;top: 50%;left:50%;transform: translate(-50%, -50%);"
			/>
		</div>
	{/if}
</div>
