<script lang="ts">
	import Loading from '../loading/Loading.svelte';
	import Icon from '../icon/Icon.svelte';
	import Mask from '../mask/Mask.svelte';
	import Transition from './Transition.svelte';
	import type { ToastProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';

	let {
		message = '',
		visible = $bindable(false),
		duration = 2000,
		position = 'center',
		py = '0',
		radius = '',
		transitionType = 'scale',
		transitionParams = {},
		outDuration = 0,
		easeType = 'cubicOut',
		easeOutType = 'cubicOut',
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

	const positionClass = { center: ' justify-center', top: ' justify-start', bottom: ' justify-end' };
	const pyClass = { '0': ' py-0', '10': ' py-10', '20': ' py-20', '40': ' py-40', '60': ' py-60', '80': ' py-80' };

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

	let innerHeight = $derived(window.innerHeight);
	;
	$effect(() => {
		if (dynamicFixed) {
			//解决 Safari 和 Chrome 或其他浏览器滚动时工具栏隐藏与显示引发的窗口高度变化问题
			// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
			window.addEventListener('resize', () => {
				innerHeight = window.innerHeight;
			});
		}
	});
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
		<Transition {visible} {transitionType} {transitionParams} {outDuration} {easeType} {easeOutType}>
			<div class="flex justify-center px-10">
				<div
					class="inline-block bg-text-primary/90 text-center dark:bg-text-dark/90 p-4 {radius ? radiusObj[radius] : 'rounded-(--radius-box)'} text-text-dark dark:text-text-primary"
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
								{:else if type === 'success'}
									<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" class="fill-success mx-auto block">
										<path
											d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"
										>
										</path>
									</svg>
								{:else if type === 'error'}
									<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" class="fill-error mx-auto block">
										<path
											d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"
										>
										</path>
									</svg>
								{:else if type === 'warning'}
									<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" class="fill-warning mx-auto block">
										<path
											d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
										>
										</path>
									</svg>
								{:else if type === 'info'}
									<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" class="fill-info mx-auto block">
										<path
											d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
										>
										</path>
									</svg>
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
