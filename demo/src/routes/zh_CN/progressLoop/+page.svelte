<!--ProgressLoop Demo-->
<script>
	import { ProgressLoop, Button } from '../../../../../packages/stdf/components';

	let percent = $state(20);
	const changePercentFun = type => {
		if (type === '+10') {
			percent = percent >= 100 ? 100 : percent + 10;
		} else {
			percent = percent <= 0 ? 0 : percent - 10;
		}
	};
</script>

<div class="m-4 mt-8 font-bold text-lg">基础用法</div>
<div class="w-1/3 mx-4">
	<ProgressLoop />
</div>

<div class="m-4 mt-8 font-bold text-lg">不同宽度</div>
<div class="flex flex-grow gap-4 mx-4">
	<div class="flex-1">
		<ProgressLoop strokeWidth={0.5} />
	</div>
	<div class="flex-1">
		<ProgressLoop strokeWidth={1} />
	</div>
	<div class="flex-1">
		<ProgressLoop strokeWidth={6} />
	</div>
</div>

<div class="m-4 mt-8 font-bold text-lg">直边端点</div>
<div class="w-1/3 mx-4">
	<ProgressLoop butt />
</div>

<div class="m-4 mt-8 font-bold text-lg">逆时针方向</div>
<div class="w-1/3 mx-4">
	<ProgressLoop reverse />
</div>

<div class="m-4 mt-8 font-bold text-lg">自定义颜色</div>
<div class="flex flex-grow gap-2 m-4">
	<div class="flex-1">
		<ProgressLoop injClass="stroke-success dark:stroke-error" />
	</div>
	<div class="flex-1">
		<ProgressLoop gradient={['#CE9FFC', '#7367F0']} />
	</div>
	<div class="flex-1">
		<ProgressLoop gradient={['#CE9FFC', '#7367F0']} reverse />
	</div>
	<div class="flex-1">
		<ProgressLoop trackInjClass="!stroke-primary/20 dark:!stroke-dark/20" />
	</div>
</div>

<div class="m-4 mt-8 font-bold text-lg">自定义文字</div>
<div class="flex flex-grow gap-2 m-4">
	<div class="flex-1">
		<ProgressLoop>
			<div class="text-xs text-center">
				<div>已完成</div>
				<div class="text-lg text-primary dark:text-dark">6666</div>
				<div>步</div>
			</div>
		</ProgressLoop>
	</div>
	<div class="flex-1">
		<ProgressLoop>
			<div class="text-xs text-center">
				<div>剩余流量</div>
				<div class="text-lg text-primary dark:text-dark">66</div>
				<div>GB</div>
			</div>
		</ProgressLoop>
	</div>
	<div class="flex-1">
		<ProgressLoop>
			<div class="text-xs">完成 2/3</div>
		</ProgressLoop>
	</div>
</div>

<div class="m-4 mt-8 font-bold text-lg">过渡效果</div>
<div class="flex flex-grow gap-2 m-4">
	<div class="flex-1">
		<ProgressLoop {percent} />
	</div>
	<div class="flex-1">
		<ProgressLoop {percent} butt />
	</div>
	<div class="flex-1">
		<ProgressLoop {percent} strokeWidth={4} />
	</div>
	<div class="flex-1">
		<ProgressLoop {percent} reverse />
	</div>
</div>
<div class="flex flex-grow gap-2 m-4">
	<div class="flex-1">
		<ProgressLoop {percent} duration="150" />
	</div>
	<div class="flex-1">
		<ProgressLoop {percent} duration="500" />
	</div>
	<div class="flex-1">
		<ProgressLoop {percent} duration="1000" />
	</div>
	<div class="flex-1">
		<ProgressLoop {percent} gradient={['#CE9FFC', '#7367F0']} />
	</div>
</div>
<div class="mx-4 pb-8">
	<Button heightIn="0" group size="full">
		<div class="flex w-full">
			<button class="flex-1 border-r border-white dark:border-black py-2 active:opacity-80" onclick={() => changePercentFun('-10')}>
				-10
			</button>
			<button class="flex-1 border-r border-white dark:border-black py-2 active:opacity-80" onclick={() => changePercentFun('+10')}>
				+10
			</button>
			<button class="flex-1 py-2 active:opacity-80" onclick={() => (percent = 20)}>重置</button>
		</div>
	</Button>
</div>
