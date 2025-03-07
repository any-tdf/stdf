<script lang="ts">
	import Loading from '../loading/Loading.svelte';
	import Icon from '../icon/Icon.svelte';
	import Mask from '../mask/Mask.svelte';
	import Transition from './Transition.svelte';
	import type { ToastProps } from '../../types/index.js';

	let {
		message = '',
		visible = $bindable(false),
		duration = 2000,
		position = 'center',
		py = '0',
		radius = 'sm',
		transitionType = 'scale',
		transitionParams = {},
		outDuration = 0,
		zIndex = 1000,
		type = null,
		mask = {},
		loading = {},
		icon = {},
		clickable = false,
		dynamicFixed = true,
		children,
		onclose
	}: ToastProps = $props();

	$effect(() => {
		if (visible) {
			if (duration === 0) {
				//不自动关闭  not auto close
			} else {
				setTimeout(() => {
					visible = false;
					onclose?.();
				}, duration);
			}
		}
	});

	const typeObj = { success: 'checkbox-circle', error: 'close-circle', warning: 'error-warning', info: 'information' };
	const positionClass = { center: ' justify-center', top: ' justify-start', bottom: ' justify-end' };
	const pyClass = { '0': ' py-0', '10': ' py-10', '20': ' py-20', '40': ' py-40', '60': ' py-60', '80': ' py-80' };
	const radiusClass = {
		sm: ' rounded-sm',
		full: ' rounded-full',
		none: ' rounded-none',
		xs: ' rounded-xs',
		md: ' rounded-md',
		lg: ' rounded-lg',
		xl: ' rounded-xl',
		'2xl': ' rounded-2xl'
	};
	const typeColor = { success: 'text-success', error: 'text-error', warning: 'text-warning', info: 'text-info' };

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

	let innerHeight = $state(0);
	$effect(() => {
		innerHeight = window.innerHeight;
	});
	if (dynamicFixed) {
		//解决 Safari 和 Chrome 或其他浏览器滚动时工具栏隐藏与显示引发的窗口高度变化问题
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
	}
</script>

{#if visible}
	<Mask {visible} {clickable} opacity="0" {outDuration} {...mask} />
{/if}
{#if visible}
	<div
		class="fixed inset-0 flex h-screen w-screen flex-col{positionClass[position] || positionClass['center']}{position === 'center'
			? ''
			: pyClass[py] || pyClass['20']} w-full h-full${clickable ? ' pointer-events-none' : ''}"
		style="z-index:{zIndex};height:{innerHeight}px;"
	>
		<Transition {visible} {transitionType} {transitionParams} {outDuration}>
			<div class="flex justify-center px-10">
				<div
					class="inline-block bg-black/90 text-center dark:bg-white/90 p-4{radiusClass[radius] ||
						radiusClass.sm} text-white dark:text-black"
				>
					{#if children}
						{@render children()}
					{:else}
						{#if type !== null}
							<div class="mb-2">
								{#if type === 'loading'}
									<Loading inverse {...loading} />
								{:else if type === 'icon'}
									<Icon size={30} {...icon} />
								{:else if type === 'success' || type === 'error' || type === 'warning' || type === 'info'}
									<Icon name={`ri-${typeObj[type]}-line`} injClass={typeColor[type]} size={30} {...icon} />
								{:else}{/if}
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
