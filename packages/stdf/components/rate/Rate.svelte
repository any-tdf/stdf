<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';

	/**
	 * 默认值
	 * default value
	 * @type {number}
	 * @range 0 - total
	 * @default 4
	 */
	export let value = 4;

	/**
	 * 总数
	 * total number of stars
	 * @type {number}
	 * @default 5
	 */
	export let total = 5;

	/**
	 * 高度
	 * height of the star
	 * @type {number}
	 * @default 24
	 */
	export let height = 24;

	/**
	 * 宽度
	 * width of the star
	 * @type {number}
	 * @default 24
	 */
	export let width = 24;

	/**
	 * 未选中透明度
	 * opacity of the unselected star
	 * @type {'0.1'|'0.2'|'0.3'|'0.4'|'0.5'|'0.6'|'0.7'|'0.8'|'0.9'|'1'}
	 * @default '0.2'
	 */
	export let opacity = '0.2';

	/**
	 * 间距
	 * space between stars
	 * @type {'0'|'1'|'2'|'3'|'4'|'8'}
	 * @default '3'
	 */
	export let space = '3';

	/**
	 * 是否允许半选
	 * whether to allow half selection
	 * @type {boolean}
	 * @default false
	 */
	export let half = false;

	/**
	 * 是否允许0分
	 * whether to allow 0 points
	 * @type {boolean}
	 * @default false
	 */
	export let zero = false;

	/**
	 * 是否垂直半选
	 * whether to allow vertical half selection
	 * @type {boolean}
	 * @default false
	 */
	export let vertical = false;

	/**
	 * 是否禁用
	 * whether to disable
	 * @type {boolean}
	 * @default false
	 */
	export let disabled = false;

	/**
	 * 是否只读
	 * whether to read only
	 * @type {boolean}
	 * @default false
	 */
	export let readonly = false;

	/**
	 * 是否自定义
	 * whether to customize
	 * @type {boolean}
	 * @default false
	 */
	export let custom = false;

	/**
	 * 点击动画类型，current 表示仅点击的图标有动画，active 表示激活的图标有动画，none 表示无动画
	 * click animation type, current means that only the clicked icon has animation, active means that the activated icon has animation, and none means no animation
	 * @type {'current'|'active'|'none'}
	 * @default 'current'
	 */
	export let animation = 'current';

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || 'zh_CN';

	// 对传入数据进行一些报错或警告处理
	// some error or warning processing for the incoming data
	if (value > total) {
		console.error(currentLang.error1);
	}
	if (total % 1 !== 0) {
		console.error(currentLang.error2);
	}
	if (!half && value % 1 !== 0) {
		console.error(currentLang.error3);
	}
	if (half && value % 0.5 !== 0) {
		console.error(currentLang.error4);
	}
	if (width < 20 || height < 20) {
		console.error(currentLang.error5);
	}

	// 事件派发
	// event dispatch
	const dispatch = createEventDispatcher();

	// 间距样式
	// space style
	const spaceObj = { '0': ' gap-0', '1': ' gap-1', '2': ' gap-2', '3': ' gap-3', '4': ' gap-4', '8': ' gap-8' };

	// 透明度样式
	// opacity style
	const opacityObj = {
		'0.1': ' opacity-10',
		'0.2': ' opacity-20',
		'0.3': ' opacity-30',
		'0.4': ' opacity-40',
		'0.5': ' opacity-50',
		'0.6': ' opacity-60',
		'0.7': ' opacity-70',
		'0.8': ' opacity-80',
		'0.9': ' opacity-90',
		'1': ' opacity-100',
	};

	// 是否缩放
	// whether to scale
	let isScale = false;

	// 点击索引
	// click index
	let clickIndex = 0;

	// 点击事件
	// click event
	const clickFun = index => {
		if (disabled || readonly) {
			return;
		}
		isScale = true;
		clickIndex = index;
		setTimeout(() => {
			isScale = false;
		}, 80);
		if (half) {
			if (index === 0) {
				if (zero) {
					if (value === 0 || value > 1) {
						value = 0.5;
					} else if (value === 0.5) {
						value = 1;
					} else {
						value = 0;
					}
				} else {
					if (value === 0 || value >= 1) {
						value = 0.5;
					} else {
						value = 1;
					}
				}
			} else {
				value = value === index + 0.5 ? index + 1 : index + 0.5;
			}
		} else {
			if (zero && index === 0) {
				value = value !== 1 ? 1 : 0;
			} else {
				value = index + 1;
			}
		}
		// 派发事件
		// dispatch event
		dispatch('click', value);
	};

	// 处理允许半选情况时的样式
	// handle the style when half selection is allowed
	const isActiveFun = (index, value, half, vertical, i) => {
		if (half) {
			if (vertical) {
				if (i === 0) {
					return index + 0.5 < value;
				}
				if (i === 1) {
					return index + 0.5 < value;
				}
				if (i === 2) {
					return index + 0.5 <= value;
				}
				if (i === 3) {
					return index + 0.5 <= value;
				}
			} else {
				if (i === 0) {
					return index + 0.5 <= value;
				}
				if (i === 1) {
					return index + 0.5 < value;
				}
				if (i === 2) {
					return index + 0.5 <= value;
				}
				if (i === 3) {
					return index + 0.5 < value;
				}
			}
		} else {
			return index + 1 <= value;
		}
	};
</script>

<div class={`inset-0 inline-flex flex-wrap${spaceObj[space] || spaceObj['4']}${disabled ? ' opacity-50' : ''}`}>
	<!-- eslint-disable-next-line no-unused-vars -->
	{#each new Array(Math.floor(total)) as item, index}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class={`flex flex-wrap transition-all${disabled ? ' cursor-not-allowed' : ' cursor-pointer'}${
				animation === 'active'
					? clickIndex >= index && isScale
						? ' scale-75'
						: ''
					: animation === 'current'
						? clickIndex === index && isScale
							? ' scale-75'
							: ''
						: ''
			}`}
			style="height:{height}px;width:{width}px;"
			on:click={() => clickFun(index)}
		>
			{#each [0, 1, 2, 3] as i}
				<div
					class={`overflow-hidden${
						isActiveFun(index, value, half, vertical, i) ? '' : ` grayscale${opacityObj[opacity] || ' opacity-30'}`
					}`}
					style="height:{height / 2}px;width:{width / 2}px;"
				>
					<div style={`transform:translateX(${i === 0 || i === 2 ? 0 : -(width / 2)}px) translateY(${i < 2 ? 0 : -(height / 2)}px)`}>
						{#if custom}
							<slot />
						{:else}
							<Icon name="ri-star-fill" theme size={height} top={height < 24 ? height - 24 : 0} />
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
