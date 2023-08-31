<script>
	import Icon from '../icon/Icon.svelte';

	// 图片地址
	// image url
	export let image = '';

	// 替换文本
	// replace text
	export let alt = '';

	// 替换Icon
	// replace Icon
	export let icon = { name: 'ri-user-3-line', theme: true, size: 32 };

	// 替换文本大小
	// replace text size
	export let altSize = 'md';

	// 圆角风格：none/base/xl/full
	// radius style:none/base/xl/full
	export let radius = 'base';

	// 头像框大小，xs/sm/md/lg/xl
	// avatar size:xs/sm/md/lg/xl
	export let size = 'md';

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
		md: 'w-16 h-16',
		lg: 'w-20 h-20',
		xl: 'w-32 h-32',
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
</script>

<div
	class={`bg-primary/10 dark:bg-dark/20 flex justify-center overflow-hidden relative ${lineObj[line] || ''} ${
		sizeObj[size] || sizeObj.md
	} ${radiusObj[radius] || radiusObj.base} ${injClass}`}
>
	{#if image === '' && alt === ''}
		<div class="m-auto">
			<Icon {...icon} />
		</div>
	{:else if image === '' && alt !== ''}
		<div
			class={`text-center ${altSizeObj[altSize] || altSizeObj.base}`}
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
