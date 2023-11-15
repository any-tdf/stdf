<script>
	/**
	 * 徽标文案
	 * badge text
	 * @type {string}
	 * @default ''
	 */
	export let text = '';

	/**
	 * 圆角风格
	 * radius style
	 * @type {'full'|'base'|'none'|'leaf'}
	 * @default 'full'
	 */
	export let radius = 'full';

	/**
	 * 是否位于左侧
	 * is on the left
	 * @type {boolean}
	 * @default false
	 */
	export let isLeft = false;

	/**
	 * 是否显示
	 * is show
	 * @type {boolean}
	 * @default true
	 */
	export let isShow = true;

	/**
	 * 上下偏移量
	 * offset top
	 * @type {number}
	 * @default 0
	 */
	export let offsetY = 0;

	/**
	 * 左右偏移量
	 * offset left
	 * @type {number}
	 * @default 0
	 */
	export let offsetX = 0;

	/**
	 * 是否位于内部
	 * is inner
	 * @type {boolean}
	 * @default false
	 */
	export let isInner = false;

	/**
	 * 注入CSS
	 * inject CSS
	 * @type {string}
	 * @default ''
	 */
	export let injClass = '';

	// 圆角风格样式
	// radius style
	const radiusObj = {
		full: ' rounded-full',
		base: ' rounded',
		none: ' rounded-none',
		leftLeaf: ' rounded-full rounded-br-none',
		rightLeaf: ' rounded-full rounded-bl-none',
	};

	// 通过radius配置圆角风格或叶形
	// set radius style or leaf style by radius
	const radiusClass = radius === 'leaf' ? (isLeft ? radiusObj.leftLeaf : radiusObj.rightLeaf) : radiusObj[radius] || radiusObj.full;
</script>

{#if isInner}
	<div
		class={`px-1 text-xs text-white whitespace-nowrap${radiusClass}${
			text === '' ? ' w-3 h-3' : ' '
		} text-center leading-4 transition-all bg-[red]${injClass === '' ? '' : ` ${injClass}`}`}
		style={`transform:${isShow ? ' scale(1)' : ' scale(0)'}`}
	>
		{text}
	</div>
{:else}
	<div class="relative">
		<slot />
		<div
			class={`absolute${text === '' ? ' -top-1.5' : ' -top-2'}${
				isLeft ? ' left-0' : ' right-0'
			} px-1 text-xs text-white whitespace-nowrap${radiusClass}${
				text === '' ? ' w-3 h-3' : ' '
			} text-center leading-4 transition-all bg-[red]${injClass === '' ? '' : ` ${injClass}`}`}
			style={`transform: translateX(calc(${isLeft ? '-' : ''}50% ${isLeft ? '+' : '-'} ${offsetX}px)) translateY(${offsetY}px)${
				isShow ? ' scale(1)' : ' scale(0)'
			}`}
		>
			{text}
		</div>
	</div>
{/if}
