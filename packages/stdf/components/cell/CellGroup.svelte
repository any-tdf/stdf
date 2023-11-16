<script>
	/**
	 * 圆角风格
	 * Radius style
	 * @type {'none'|'base'|'md'|'lg'|'xl'|'2xl'|'full'}
	 * @default 'lg'
	 */
	export let radius = 'lg';

	/**
	 * 阴影
	 * Shadow
	 * @type {'none'|'sm'|'base'|'md'|'lg'|'xl'|'2xl'}
	 * @default 'sm'
	 */
	export let shadow = 'sm';

	/**
	 * 上下边距
	 * Top and bottom margin
	 * @type {'0'|'1'|'2'|'3'|'4'|'6'|'8'}
	 * @default '4'
	 */
	export let my = '4';

	/**
	 * 左右间距
	 * Left and right margin
	 * @type {'0'|'1'|'2'|'3'|'4'|'6'|'8'}
	 * @default '2'
	 */
	export let mx = '2';

	const shadowClass = {
		none: ' shadow-none',
		sm: ' shadow-sm dark:shadow-white/5',
		base: ' shadow dark:shadow-white/10',
		md: ' shadow-md dark:shadow-white/10',
		lg: ' shadow-lg dark:shadow-white/10',
		xl: ' shadow-xl dark:shadow-white/10',
		'2xl': ' shadow-2xl dark:shadow-white/25',
	};
	const radiusClass = {
		none: ' rounded-none',
		base: ' rounded',
		md: ' rounded-md',
		lg: ' rounded-lg',
		xl: ' rounded-xl',
		'2xl': ' rounded-2xl',
		full: ' rounded-full',
	};
	const mxClass = { '0': ' mx-0', '1': ' mx-1', '2': ' mx-2', '3': ' mx-3', '4': ' mx-4', '6': ' mx-6', '8': ' mx-8' };
	const myClass = { '0': ' my-0', '1': ' my-1', '2': ' my-2', '3': ' my-3', '4': ' my-4', '6': ' my-6', '8': ' my-8' };
</script>

<div
	class={`bg-white dark:bg-black overflow-hidden${shadowClass[shadow] || shadowClass['sm']}${radiusClass[radius] || radiusClass['lg']}${
		myClass[my] || myClass['4']
	}${mxClass[mx] || mxClass['2']}`}
>
	<slot />
</div>
