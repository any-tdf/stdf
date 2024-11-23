<!-- NavBar Demo -->
<script>
	import { NavBar, Icon, Toast } from '../../../../../packages/stdf/components';

	const icons1 = [{ name: 'ri-paint-brush-line', theme: true }, { name: 'ri-share-line' }];
	const icons2 = [{ name: 'ri-command-line' }, { name: 'ri-drag-move-line' }];
	const icons3 = [{ name: 'ri-indent-decrease' }, { name: 'ri-service-line' }];
	const icons4 = [{ name: 'ri-hand-heart-line', theme: true }, { name: 'ri-parent-line' }];

	let visible1 = $state(false);
	let visible2 = $state(false);
	let rightIndex = $state(0);
	let visible3 = $state(false);
</script>

<div class="flex flex-col space-y-8 py-8">
	<NavBar title="Basic usage" />
	<NavBar title="Use Icon on the right side" rights={icons1} />
	<NavBar title="Click on the left" onclickLeft={() => (visible1 = true)} />
	<Toast bind:visible={visible1} message="Clicked on the left!" />
	<NavBar
		title="Click on the right"
		rights={icons2}
		onclickRight={index => {
			visible2 = true;
			rightIndex = index;
		}}
	/>
	<Toast bind:visible={visible2} message={`The index of the clicked right icon is ${rightIndex}.`} />
	<NavBar title="No left and bottom dividers, long text" left={null} line={false} rights={icons3} />
	<NavBar title="Custom background color by injClass" injClass="!bg-[#e0e0e0] dark:!bg-[green]" />
	<NavBar>
		{#snippet titleChild()}
			<div class="text-[red] dark:text-[green]">Custom text color by Snippet</div>
		{/snippet}
	</NavBar>
	<NavBar>
		{#snippet titleChild()}
			<div class="flex flex-col justify-around text-xs h-12">
				<div class="text-sm">title Snippet renders</div>
				<div>right Snippet renders</div>
			</div>
		{/snippet}
		{#snippet rightChild()}
			<div>
				<button class="h-12 w-12 text-center text-primary dark:text-dark cursor-pointer" onclick={() => (visible3 = true)}>Hello</button>
			</div>
		{/snippet}
	</NavBar>
	<Toast bind:visible={visible3} message="Clicked on the right Snippet content!" />
	<NavBar title="Love version" love rights={icons4} />
	<NavBar injClass="!bg-transparent" line={false}>
		{#snippet leftChild()}
			<div class="h-8 w-8 m-2 leading-8 text-center bg-white dark:bg-black/50 rounded-full">
				<Icon name="ri-home-7-line" size={18} top={-2} />
			</div>
		{/snippet}
		{#snippet titleChild()}
			<div class="px-3 h-8 my-2 leading-8 text-sm bg-white dark:bg-black/50 rounded-full">custom styles by injClass and Snippet</div>
		{/snippet}
		{#snippet rightChild()}
			<div class="h-8 w-8 m-2 leading-8 text-center bg-white dark:bg-black/50 rounded-full">
				<Icon name="ri-customer-service-2-line" size={18} top={-2} />
			</div>
		{/snippet}
	</NavBar>
</div>
