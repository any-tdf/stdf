<!-- Icon Demo，请确保已引入 symbol.svg 文件。 -->
<script>
	import { Icon } from 'stdf';

	const icons = ['ri-spy-fill', 'ri-chrome-fill', 'ri-riding-line', 'ri-switch-fill'];
</script>

<div class="felx felx-col space-y-12 px-4 py-8">
	<!-- 基础用法 -->
	<div>
		<div class="mb-2 font-bold text-xl">基础用法</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon}
				<div class="py-2 text-center flex-1">
					<Icon name={icon} />
					<div class="text-xs mt-2 text-gray6">{icon}</div>
				</div>
			{/each}
		</div>
	</div>
	<!-- 跟随主题色 -->
	<div>
		<div class="mb-2 font-bold text-xl">跟随主题色</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon}
				<div class="py-2 text-center flex-1">
					<Icon name={icon} theme />
				</div>
			{/each}
		</div>
	</div>
	<!-- 不同大小 -->
	<div>
		<div class="mb-2 font-bold text-xl">不同大小</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon, i}
				<div class="py-2 text-center flex-1">
					<Icon name={icon} size={18 + i * 6} />
					<div class="text-xs mt-2 text-gray6">{18 + i * 6}</div>
				</div>
			{/each}
		</div>
	</div>
	<!-- 不同透明度 -->
	<div>
		<div class="mb-2 font-bold text-xl">不同透明度</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon, i}
				<div class="py-2 text-center flex-1">
					<Icon name={icon} alpha={Number((0.2 + i * 0.2).toFixed(1))} />
					<div class="text-xs mt-2 text-gray6">{(0.2 + i * 0.2).toFixed(1)}</div>
				</div>
			{/each}
		</div>
	</div>
	<!-- 自定义颜色（通过 injClass） -->
	<div>
		<div class="mb-2 font-bold text-xl">
			自定义颜色<span class="ml-2 text-xs text-gray6 font-normal">通过 injClass</span>
		</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon}
				<div class="py-2 text-center flex-1">
					<Icon name={icon} injClass="text-[red] dark:text-green" />
				</div>
			{/each}
		</div>
	</div>
	<!-- 自定义颜色（通过 slot） -->
	<div>
		<div class="mb-2 font-bold text-xl">
			自定义颜色<span class="ml-2 text-xs text-gray6 font-normal">通过 slot</span>
		</div>
		<div class="flex flex-wrap justify-between">
			{#each icons as icon}
				<div class="py-2 text-center flex-1">
					<Icon name="slot">
						<i class="text-[#266CF6] dark:text-[#C84031]">
							<Icon name={icon} />
						</i>
					</Icon>
				</div>
			{/each}
		</div>
	</div>
	<!-- 插槽 -->
	<div>
		<div class="mb-2 font-bold text-xl">插槽</div>
		<div class="flex flex-wrap justify-between">
			<!-- eslint-disable-next-line no-unused-vars -->
			{#each icons as icon}
				<div class="py-2 text-center flex-1">
					<Icon name="slot">
						<svg height="24" width="24" aria-hidden="true" viewBox="0 0 16 16" data-view-component="true" style="display: inline;">
							<path
								fill-rule="evenodd"
								d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
							/>
						</svg>
					</Icon>
				</div>
			{/each}
		</div>
	</div>
	<!-- 偏移 -->
	<div>
		<div class="mb-2 font-bold text-xl">偏移</div>
		<div class="flex flex-wrap justify-between">
			<!-- eslint-disable-next-line no-unused-vars -->
			{#each icons as icon, i}
				<div class="py-2 text-center flex-1">
					<Icon name={icons[1]} top={-4 + i * 2} />
					top:{-4 + i * 2}
				</div>
			{/each}
		</div>
	</div>
</div>
