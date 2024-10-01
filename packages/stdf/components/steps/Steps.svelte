<script>
	import Icon from '../icon/Icon.svelte';

	/**
	 * @typedef {Object} step
	 * @property {String} title 标题
	 * @property {String} [desc] 描述
	 * @property {Object|String} [bar] 进度条
	 * @property {Object} [injComponent] 注入组件
	 */

	/**
	 * @typedef {Object} finishStep
	 * @property {String} title 标题
	 * @property {String} [desc] 描述
	 * @property {Object|String} [bar] 进度条
	 * @property {Object} [injComponent] 注入组件
	 */

	/**
	 * @typedef {Number} height
	 */

	/**
	 * 步骤
	 * Steps
	 * @type {Array<{step: step, finishStep?: finishStep, height?: height}>}
	 */
	export let steps = [];

	/**
	 * 当前步骤
	 * Current step
	 * @type {Number}
	 * @range 1 - steps.length
	 * @default 1
	 */
	export let current = 1;

	/**
	 * 圆角风格
	 * Radius style
	 * @type {String}
	 * @default base
	 */
	export let radius = 'base';

	/**
	 * 图标是否带边框
	 * Whether the icon has a border
	 * @type {Boolean}
	 * @default true
	 */
	export let barBorder = true;

	/**
	 * 是否纵向
	 * Whether vertical
	 * @type {Boolean}
	 * @default false
	 */
	export let vertical = false;

	const radiusObj = { none: 'rounded-none', base: 'rounded', xl: 'rounded-xl', full: 'rounded-full' };
	let width = 0;
</script>

<!-- 纵向排列 -->
{#if vertical}
	<div class="flex flex-col justify-between">
		{#each steps as item, i}
			<div class="flex items-center py-3" bind:clientHeight={item.height}>
				{#if item.step.bar || item.finishStep?.bar}
					<div class="pl-4 mr-10 my-4">
						<div
							class={`w-[2px] absolute transition-all ${i < current - 1 ? 'bg-primary dark:bg-dark' : 'bg-black/30 dark:bg-white/30'}`}
							style="height:{i === steps.length - 1 ? '0px' : item.height - 30 + 'px'};top:42px;left:30px"
						/>
						<div
							class={`w-[30px] h-[30px] absolute box-border transition-all duration-300 overflow-hidden border ${
								i < current - 1
									? 'border-primary dark:border-dark text-primary dark:text-dark'
									: i === current - 1
										? 'border-primary dark:border-dark bg-primary dark:bg-dark text-white dark:text-black'
										: 'border-black/30 dark:border-white/30 text-black/30 dark:text-white/30'
							} ${radiusObj[radius] || radiusObj.base} ${!barBorder ? '!border-transparent' : ''}`}
							style="top:12px"
						>
							{#if item.step?.bar?.constructor === Object || item.finishStep?.bar?.constructor === Object}
								{#if item.step?.bar?.type === 'icon' || item.finishStep?.bar?.type === 'icon'}
									<div class="w-4 h-4 m-auto">
										<Icon
											{...item.step.bar.icon}
											name={item.finishStep && i < current ? item.finishStep.bar.icon.name : item.step.bar.icon.name}
											size={16}
											top={0}
										/>
									</div>
								{:else if item.step?.bar?.type === 'image' || item.finishStep?.bar?.type === 'image'}
									<img class="object-cover" src={item.step.bar.image || item.finishStep.bar.image} alt="" />
								{:else}
									step.bar.type 或 finishStep.bar.type 格式不对！
								{/if}
							{:else}
								<div class="w-5 h-5 m-auto mt-1 text-sm leading-[20px] text-center">
									{item.step.bar}
								</div>
							{/if}
						</div>
					</div>
				{:else}
					<div class="pl-4 mr-6">
						<div
							class={`w-[2px] absolute transition-all ${i < current - 1 ? 'bg-primary dark:bg-dark' : 'bg-black/30 dark:bg-white/30'}`}
							style="height:{i === steps.length - 1 ? '0px' : item.height - 10 + 'px'};top:26px;left:20px"
						/>
						<div
							class={`w-[10px] h-[10px] absolute border transition-all duration-300 ${
								i < current - 1
									? 'border-primary dark:border-dark'
									: i === current - 1
										? 'border-primary dark:border-dark bg-primary dark:bg-dark'
										: 'border-black/30 dark:border-white/30'
							} ${radiusObj[radius] || radiusObj.base}`}
							style="top:16px"
						/>
					</div>
				{/if}
				<div class="pr-4">
					<div
						class={`font-medium transition-all duration-300 ${
							i < current - 1
								? 'text-black dark:text-white'
								: i === current - 1
									? 'text-primary dark:text-dark'
									: 'text-black/30 dark:text-white/30'
						}`}
					>
						{item.finishStep && i < current - 1 ? item.finishStep.title : item.step.title}
					</div>
					{#if item.step.desc || item.finishStep?.desc}
						<div class={`text-xs transition-all duration-300${i <= current - 1 ? '' : ' text-black/30 dark:text-white/30'}`}>
							{item.finishStep && i < current - 1
								? item.finishStep.desc
									? item.finishStep.desc
									: ''
								: item.step.desc
									? item.step.desc
									: ''}
						</div>
					{/if}
					{#if item.step?.injComponent || item.finishStep?.injComponent}
						<svelte:component this={item.step.injComponent || item.finishStep.injComponent} />
					{/if}
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div class="flex justify-between mt-4" bind:clientWidth={width}>
		{#each steps as item, i}
			<div class="flex-1 flex flex-col items-center space-y-2">
				{#if item.step.bar}
					<div class="w-full relative pb-8">
						<div
							class={`h-[2px] relative transition-all ${i < current - 1 ? 'bg-primary dark:bg-dark' : 'bg-black/30 dark:bg-white/30'}`}
							style="top:16px;width:{i === steps.length - 1 ? '0' : width / steps.length - 30}px;left:calc(50% + 15px)"
						/>
						<div
							class={`w-[30px] h-[30px] box-border absolute transition-all duration-300 overflow-hidden border ${
								i < current - 1
									? 'border-primary dark:border-dark text-primary dark:text-dark'
									: i === current - 1
										? 'border-primary dark:border-dark bg-primary dark:bg-dark text-white dark:text-black'
										: 'border-black/30 dark:border-white/30 text-black/30 dark:text-white/30'
							} ${radiusObj[radius] || radiusObj.base} ${!barBorder ? '!border-transparent' : ''}`}
							style="left:calc(50% - 15px)"
						>
							{#if item.step?.bar?.constructor === Object || item.finishStep?.bar?.constructor === Object}
								{#if item.step?.bar?.type === 'icon' || item.finishStep?.bar?.type === 'icon'}
									<div class="w-4 h-4 m-auto">
										<Icon
											{...item.step.bar.icon}
											name={item.finishStep && i < current ? item.finishStep.bar.icon.name : item.step.bar.icon.name}
											size={16}
											top={0}
										/>
									</div>
								{:else if item.step?.bar?.type === 'image' || item.finishStep?.bar?.type === 'image'}
									<img class=" object-cover" src={item.step.bar.image || item.finishStep.bar.image} alt="" />
								{:else}
									step.bar.type 或 finishStep.bar.type 格式不对！
								{/if}
							{:else}
								<div class="w-5 h-5 m-auto mt-1 text-sm leading-[20px] text-center">{item.step.bar}</div>
							{/if}
						</div>
					</div>
				{:else}
					<div class="w-full relative py-2">
						<div
							class={`h-[2px] relative transition-all ${i < current - 1 ? 'bg-primary dark:bg-dark' : 'bg-black/30 dark:bg-white/30'} ${
								i === steps.length - 1 ? 'w-px' : ''
							}`}
							style="width:{i === steps.length - 1 ? '0' : width / steps.length - 9}px;top:0;left:calc(50% + 5px)"
						/>
						<div
							class={`w-[10px] h-[10px] absolute top-[4px] border transition-all duration-300 ${
								i < current - 1
									? 'border-primary dark:border-dark'
									: i === current - 1
										? 'border-primary dark:border-dark bg-primary dark:bg-dark'
										: 'border-black/30 dark:border-white/30'
							} ${radiusObj[radius] || radiusObj.base}`}
							style="left:calc(50% - 5px)"
						/>
					</div>
				{/if}
				<div
					class={`text-center text-sm font-medium transition-all duration-300 ${
						i < current - 1
							? 'text-black dark:text-white'
							: i === current - 1
								? 'text-primary dark:text-dark'
								: 'text-black/30 dark:text-white/30'
					}`}
				>
					{item.finishStep && i < current - 1 ? item.finishStep.title : item.step.title}
				</div>
			</div>
		{/each}
	</div>
{/if}
