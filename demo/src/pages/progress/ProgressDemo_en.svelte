<!--Progress Demo-->
<script>
	import { Progress, Button } from 'stdf';

	let percent = 20;
	const changePercentFun = type => {
		if (type === '+10') {
			percent += 10;
			if (percent > 100) {
				percent = 100;
			}
		} else {
			percent -= 10;
			if (percent < 0) {
				percent = 0;
			}
		}
	};
</script>

<div class="px-4 pb-8">
	<div class="m-4 mt-8 font-bold text-lg">Basic usage</div>
	<Progress />

	<div class="m-4 mt-8 font-bold text-lg">Different heights</div>
	<div class="flex flex-col space-y-4">
		<Progress height="1" />
		<Progress height="2" />
		<Progress height="3" />
		<Progress height="4" />
	</div>

	<div class="m-4 mt-8 font-bold text-lg">Percentage different position</div>
	<div class="flex flex-col space-y-4">
		<Progress />
		<Progress percentPosition="inner" />
		<Progress percentPosition="block" />
		<Progress percentPosition="none" />
	</div>

	<div class="m-4 mt-8 font-bold text-lg">Different styles of rounded corners</div>
	<div class="flex flex-col space-y-4">
		<Progress radius="none" />
		<Progress radius="base" />
		<Progress radius="none" percentPosition="block" />
		<Progress radius="base" percentPosition="block" />
		<Progress percentPosition="block" />
	</div>

	<div class="m-4 mt-8 font-bold text-lg">Ash setting</div>
	<div class="flex flex-col space-y-4">
		<Progress inactive />
		<Progress inactive percentPosition="block" />
	</div>

	<div class="m-4 mt-8 font-bold text-lg">Transition effect</div>
	<div class="flex flex-col space-y-4 mb-4 px-2">
		<Progress {percent} />
		<Progress {percent} percentPosition="inner" />
		<Progress {percent} percentPosition="block" />
		<Progress {percent} duration="500" />
		<Progress {percent} duration="1000" />
	</div>
	<Button heightIn="0" group size="full">
		<div class="flex">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flex-1 border-r py-2 active:opacity-80" on:click={() => changePercentFun('-10')}>progress -10</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flex-1 border-r py-2 active:opacity-80" on:click={() => changePercentFun('+10')}>progress +10</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flex-1 py-2 active:opacity-80" on:click={() => (percent = 20)}>reset</div>
		</div>
	</Button>

	<div class="m-4 mt-8 font-bold text-lg">Custom color</div>
	<div class="flex flex-col space-y-4">
		<Progress injClass="bg-success dark:bg-error" />
		<Progress injClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0]" />
		<Progress percentPosition="block" injClass="bg-orange" />
		<Progress trackInjClass="!bg-primary/20 dark:!bg-dark/20" />
	</div>

	<div class="m-4 mt-8 font-bold text-lg">Custom text</div>
	<div class="flex flex-col space-y-4">
		<Progress useSlot>
			<div class="text-xs whitespace-nowrap">completed 2/3</div>
		</Progress>
		<Progress useSlot percentPosition="block">
			<div class="text-xs whitespace-nowrap">completed 2/3</div>
		</Progress>
	</div>
</div>
