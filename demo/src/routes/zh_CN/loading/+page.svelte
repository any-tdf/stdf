<!--Loading Demo-->
<script>
	import { Loading, Tabs, TabContent, Button } from '../../../../../packages/stdf/components';

	//传入个数，返回随机生成的颜色数组
	const randomColorArr = num => {
		//随机生成16进制颜色
		const randomColor = () => '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
		let arr = [];
		for (let i = 0; i < num; i++) {
			arr.push(randomColor());
		}
		return arr;
	};

	const arr1 = new Array(22);
	const arr2 = new Array(6);
	const arr4 = new Array(4);
	const labels = [{ text: '单色' }, { text: '双色' }, { text: '四色' }, { text: '其他' }];

	const speedBtns = [0.5, 1, 2];
	let speed = 1;
</script>

<div class="py-4">
	<Tabs tab={{ labels, mx: '4' }}>
		<TabContent>
			<div class="py-4">
				<div class="flex text-center font-bold text-sm">
					{#each ['默认色', '主题色', '自选色', '反差色', '反主色'] as item}
						<div class="flex-1 py-2 border border-black/5 dark:border-white/5">{item}</div>
					{/each}
				</div>
				<div class="grid grid-cols-5">
					<!-- eslint-disable-next-line no-unused-vars -->
					{#each arr1 as item, i}
						<div class="py-6 w-full flex flex-col items-center border border-black/5 dark:border-white/5">
							<div class="w-[30px] h-[30px]">
								<Loading type={'1_' + i} bind:speed />
							</div>
							<div class="text-xs text-center mt-4">{'1_' + i}</div>
						</div>
						<div class="py-6 w-full flex flex-col items-center border border-black/5 dark:border-white/5">
							<div class="w-[30px] h-[30px]">
								<Loading type={'1_' + i} theme bind:speed />
							</div>
							<div class="text-xs text-center mt-4">{'1_' + i}</div>
						</div>
						<div class="py-6 w-full flex flex-col items-center border border-black/5 dark:border-white/5">
							<div class="w-[30px] h-[30px]">
								<Loading type={'1_' + i} theme customColor={randomColorArr(1)} bind:speed />
							</div>
							<div class="text-xs text-center mt-4">{'1_' + i}</div>
						</div>
						<div
							class="py-6 w-full flex flex-col items-center border border-white/5 dark:border-black/5 bg-gray-800 dark:bg-gray-100 text-white dark:text-black"
						>
							<div class="w-[30px] h-[30px]">
								<Loading type={'1_' + i} inverse bind:speed />
							</div>
							<div class="text-xs text-center mt-4">{'1_' + i}</div>
						</div>
						<div
							class="py-6 w-full flex flex-col items-center border border-white/5 dark:border-black/5 bg-gray-800 dark:bg-gray-100 text-white dark:text-black"
						>
							<div class="w-[30px] h-[30px]">
								<Loading type={'1_' + i} theme inverse bind:speed />
							</div>
							<div class="text-xs text-center mt-4">{'1_' + i}</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="text-xs p-4">持续更新...</div>
		</TabContent>
		<TabContent>
			<div class="py-4">
				<div class="flex text-center font-bold text-sm">
					{#each ['默认色', '自选色', '反差色'] as item}
						<div class="flex-1 py-2 border border-black/5 dark:border-white/5">{item}</div>
					{/each}
				</div>
				<div class="grid grid-cols-3">
					<!-- eslint-disable-next-line no-unused-vars -->
					{#each arr2 as item, i}
						<div class="py-6 w-full flex flex-col items-center border border-black/5 dark:border-white/5">
							<div class="w-[30px] h-[30px]">
								<Loading type={'2_' + i} bind:speed />
							</div>
							<div class="text-xs text-center mt-4">{'2_' + i}</div>
						</div>
						<div class="py-6 w-full flex flex-col items-center border border-black/5 dark:border-white/5">
							<div class="w-[30px] h-[30px]">
								<Loading type={'2_' + i} customColor={randomColorArr(2)} bind:speed />
							</div>
							<div class="text-xs text-center mt-4">{'2_' + i}</div>
						</div>
						<div
							class="py-6 w-full flex flex-col items-center border border-white/5 dark:border-black/5 bg-gray-800 dark:bg-gray-100 text-white dark:text-black"
						>
							<div class="w-[30px] h-[30px]">
								<Loading type={'2_' + i} inverse bind:speed />
							</div>
							<div class="text-xs text-center mt-4">{'2_' + i}</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="text-xs p-4">持续更新...</div>
		</TabContent>
		<TabContent>
			<div class="py-4">
				<div class="flex text-center font-bold text-sm">
					{#each ['默认色', '自选色', '默认色', '自选色'] as item}
						<div class="flex-1 py-2 border border-black/5 dark:border-white/5">{item}</div>
					{/each}
				</div>
				<div class="grid grid-cols-4">
					<!-- eslint-disable-next-line no-unused-vars -->
					{#each arr4 as item, i}
						<div class="py-6 w-full flex flex-col items-center border border-black/5 dark:border-white/5">
							<div class="w-[30px] h-[30px]">
								<Loading type={'4_' + i} bind:speed />
							</div>
							<div class="text-xs text-center mt-4">{'4_' + i}</div>
						</div>
						<div class="py-6 w-full flex flex-col items-center border border-black/5 dark:border-white/5">
							<div class="w-[30px] h-[30px]">
								<Loading type={'4_' + i} customColor={randomColorArr(4)} bind:speed />
							</div>
							<div class="text-xs text-center mt-4">{'4_' + i}</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="text-xs p-4">持续更新...</div>
		</TabContent>
		<TabContent>
			<div class="py-4" />
			<div class="text-xs p-4">持续更新...</div>
		</TabContent>
	</Tabs>
</div>
<!-- 固定在底部的按钮组，控制速度 -->
<div class="sticky bottom-0 left-0 w-full flex gap-3 justify-between px-2 z-10 bg-white/60 dark:bg-black/60 backdrop-blur">
	{#each speedBtns as item}
		<div class="flex-1">
			<Button fill={speed === item ? 'base' : 'lineTheme'} size="full" injClass="text-xs px-2" on:click={() => (speed = item)}>
				{item} 倍速
			</Button>
		</div>
	{/each}
</div>
