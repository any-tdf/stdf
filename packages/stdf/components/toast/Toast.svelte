<script>
	import { createEventDispatcher } from 'svelte';
	import Loading from '../loading/Loading.svelte';
	import Icon from '../icon/Icon.svelte';
	import Mask from '../mask/Mask.svelte';
	import Transition from './Transition.svelte';

	/**
	 * 提示内容
	 * toast content
	 * @type {string}
	 * @default ''
	 */
	export let message = '';

	/**
	 * 是否显示
	 * is show
	 * @type {boolean}
	 * @default false
	 */
	export let visible = false;

	/**
	 * 显示时间，ms
	 * show time, ms
	 * @type {number}
	 * @default 2000
	 */
	export let duration = 2000;

	/**
	 * 显示位置
	 * show position
	 * @type {'center'|'top'|'bottom'}
	 * @default 'center'
	 */
	export let position = 'center';

	/**
	 * top 和 bottom 时距离顶部或底部的距离
	 * top and bottom distance from top or bottom
	 * @type {'0'|'10'|'20'|'40'|'60'|'80'}
	 * @default '20'
	 */
	export let py = '0';

	/**
	 * 圆角
	 * radius
	 * @type {'base'|'full'|'none'|'sm'|'md'|'lg'|'xl'|'2xl'}
	 * @default 'base'
	 */
	export let radius = 'base';

	/**
	 * 是否使用 slot
	 * is use slot
	 * @type {boolean}
	 * @default false
	 */
	export let useSlot = false;

	/**
	 * 过渡动画类型
	 * transition type
	 * @type {'fade'|'fly'|'scale'|'slide'|'none'|'blur'}
	 * @default 'scale'
	 */
	export let transitionType = 'scale';

	/**
	 * 过渡动画参数，参考 https://svelte.dev/docs/svelte-transition
	 * transition params, see https://svelte.dev/docs/svelte-transition
	 * @type {object}
	 * @default {}
	 */
	export let transitionParams = {};

	/**
	 * 过渡动画退出时间
	 * transition out duration
	 * @type {number}
	 * @default 0
	 */
	export let outDuration = 0;

	/**
	 * z-index
	 * @type {number}
	 * @default 1000
	 */
	export let zIndex = 1000;

	/**
	 * 提示类型
	 * toast type
	 * @type {'success'|'error'|'warning'|'info'|'loading'|''|string}
	 * @default ''
	 */
	export let type = '';

	/**
	 * 遮罩层参数
	 * mask params
	 * @type {object}
	 * @default {}
	 */
	export let mask = {};

	/**
	 * loading 参数
	 * loading params
	 * @type {object}
	 * @default {}
	 */
	export let loading = {};

	/**
	 * 图标参数
	 * icon params
	 * @type {object}
	 * @default {}
	 */
	export let icon = {};

	/**
	 * 是否可点击穿透
	 * is clickable
	 * @type {boolean}
	 * @default false
	 */
	export let clickable = false;

	/**
	 * 是否动态固定
	 * is dynamic fixed
	 * @type {boolean}
	 * @default true
	 */
	export let dynamicFixed = true;

	// 创建事件派发器
	// create event dispatcher
	const dispatch = createEventDispatcher();

	$: {
		if (visible) {
			if (duration === 0) {
				//不自动关闭  not auto close
			} else {
				setTimeout(() => {
					visible = false;
					dispatch('close');
				}, duration);
			}
		} else {
			dispatch('open');
		}
	}

	const typeObj = { success: 'checkbox-circle', error: 'close-circle', warning: 'error-warning', info: 'information' };
	const positionClass = { center: ' justify-center', top: ' justify-start', bottom: ' justify-end' };
	const pyClass = { '0': ' py-0', '10': ' py-10', '20': ' py-20', '40': ' py-40', '60': ' py-60', '80': ' py-80' };
	const radiusClass = {
		base: ' rounded',
		full: ' rounded-full',
		none: ' rounded-none',
		sm: ' rounded-sm',
		md: ' rounded-md',
		lg: ' rounded-lg',
		xl: ' rounded-xl',
		'2xl': ' rounded-2xl',
	};

	//解决 Safari 和 Chrome 或其他浏览器滚动时工具栏隐藏与显示引发的窗口高度变化问题
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	// let vh = window.innerHeight * 0.01;
	// // Then we set the value in the --vh custom property to the root of the document
	// document.documentElement.style.setProperty('--vh', `${vh}px`);
	// // We listen to the resize event
	// window.addEventListener('resize', () => {
	//     // We execute the same script as before
	//     let vh = window.innerHeight * 0.01;
	//     document.documentElement.style.setProperty('--vh', `${vh}px`);
	// });

	$: innerHeight = window.innerHeight;
	if (dynamicFixed) {
		//解决 Safari 和 Chrome 或其他浏览器滚动时工具栏隐藏与显示引发的窗口高度变化问题
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
	}
</script>

{#if visible}
	<Mask {visible} {clickable} opacity={0} {...mask} {outDuration} />
{/if}
{#if visible}
	<div
		class={`fixed w-screen h-screen inset-0 flex flex-col${positionClass[position] || positionClass['center']}${
			position === 'center' ? '' : pyClass[py] || pyClass['20']
		} w-full h-full${clickable ? ' pointer-events-none' : ''}`}
		style={`z-index:${zIndex};height:${innerHeight}px`}
	>
		<Transition {visible} {transitionType} {transitionParams} {outDuration}>
			<div class="flex justify-center px-10">
				<div
					class={`inline-block bg-black/90 dark:bg-white/90 text-center p-4${
						radiusClass[radius] || radiusClass['base']
					} text-white dark:text-black`}
				>
					{#if useSlot}
						<slot />
					{:else}
						{#if type !== ''}
							<div class="mb-2">
								{#if type === 'loading'}
									<Loading inverse {...loading} />
								{:else}
									<Icon
										name={type === 'success' || type === 'error' || type === 'warning' || type === 'info'
											? `ri-${typeObj[type]}-line`
											: type}
										size={30}
										{...icon}
									/>
								{/if}
							</div>
						{/if}
						<div>
							{message}
						</div>
					{/if}
				</div>
			</div>
		</Transition>
	</div>
{/if}
