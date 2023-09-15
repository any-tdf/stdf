<!-- NavBar Demo -->
<script>
	import { NavBar, Icon, Toast } from 'stdf';

	const icons1 = [{ name: 'ri-paint-brush-line', theme: true }, { name: 'ri-share-line' }];
	const icons2 = [{ name: 'ri-command-line' }, { name: 'ri-drag-move-line' }];
	const icons3 = [{ name: 'ri-indent-decrease' }, { name: 'ri-service-line' }];
	const icons4 = [{ name: 'ri-hand-heart-line', theme: true }, { name: 'ri-parent-line' }];

	let visible1 = false;
	let visible2 = false;
	let rightIndex = 0;
	let visible3 = false;
</script>

<div class="flex flex-col space-y-8 py-8">
	<NavBar title="Basic usage" />

	<NavBar title="Right-side use Icon" rights={icons1} />

	<NavBar title="Click on the left" on:clickleft={() => (visible1 = true)} />
	<Toast bind:visible={visible1} message="Click on the left!" />

	<NavBar
		title="Click right"
		rights={icons2}
		on:clickright={e => {
			visible2 = true;
			rightIndex = e.detail;
		}}
	/>
	<Toast bind:visible={visible2} message={`Click the right icon index value is ${rightIndex}。`} />

	<NavBar
		title="There is no dividing line between the left side and the bottom, and the text is too long"
		left=""
		line={false}
		rights={icons3}
	/>

	<NavBar title="Customize the background color by injClass" injClass="bg-[wheat] dark:bg-[purple]" />

	<NavBar titleSlot>
		<div slot="title" class="text-[red] dark:text-[green]">Customize text colors by slot</div>
	</NavBar>

	<NavBar titleSlot rightSlot>
		<div slot="title" class="flex flex-col justify-around text-xs h-12">
			<div class="text-sm">title Slot render header area</div>
			<div>right Slot render right and clickable</div>
		</div>
		<div slot="right">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="h-12 w-12 text-center text-primary dark:text-dark cursor-pointer" on:click={() => (visible3 = true)}>Hello</div>
		</div>
	</NavBar>
	<Toast bind:visible={visible3} message="Click on the right slot content!" />

	<NavBar title="Care edition navigation bar" love rights={icons4} />

	<NavBar titleSlot injClass="!bg-transparent" leftSlot line={false} rightSlot>
		<div slot="left" class="h-8 w-8 m-2 leading-8 text-center bg-white dark:bg-black/50 rounded-full">
			<Icon name="ri-home-7-line" size={18} top={-2} />
		</div>
		<div slot="title" class="px-3 h-8 my-2 leading-8 text-sm bg-white dark:bg-black/50 rounded-full">
			injClass and slot combine custom styles
		</div>
		<div slot="right" class="h-8 w-8 m-2 leading-8 text-center bg-white dark:bg-black/50 rounded-full">
			<Icon name="ri-customer-service-2-line" size={18} top={-2} />
		</div>
	</NavBar>
</div>
