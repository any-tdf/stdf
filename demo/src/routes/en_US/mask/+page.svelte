<!-- Mask Demo -->
<script>
	import { Mask, Toast, Cell, Button, Popup } from '../../../../../packages/stdf/components';

	let visible1 = false;
	let visible2 = false;
	let visible3 = false;
	let visible4 = false;
	let visible5 = false;
	let visible6 = false;
	let visible7 = false;
	let visible8 = false;
	let visible9 = false;
	let visible10 = false;
	let visible11 = false;

	let isClick = false;
</script>

<div class="py-4">
	<Cell title="Basic usage" on:click={() => (visible1 = true)} />
	<Mask visible={visible1} on:clickMask={() => (visible1 = false)} />

	<Cell title="Transparency is 0.1" on:click={() => (visible2 = true)} />
	<Mask visible={visible2} opacity={0.1} on:clickMask={() => (visible2 = false)} />

	<Cell title="Transparency is 0.8" on:click={() => (visible3 = true)} />
	<Mask visible={visible3} opacity={0.8} on:clickMask={() => (visible3 = false)} />

	<Cell title="Click through" detail="Please close manually" on:click={() => (visible4 = true)} />
	<Mask visible={visible4} clickable />
	<div class="flex">
		<div class="flex-1">
			<Button on:click={() => (isClick = !isClick)}>{isClick ? 'Click on me' : 'Click through'}</Button>
		</div>
		<div class="flex-1">
			<Button on:click={() => (visible4 = false)}>Manual shutdown</Button>
		</div>
	</div>

	<Cell title="Reverse color mask" on:click={() => (visible5 = true)} />
	<Mask visible={visible5} inverse on:clickMask={() => (visible5 = false)} />

	<Cell title="Blur mask" on:click={() => (visible6 = true)} />
	<Mask visible={visible6} backdropBlur="sm" opacity={0} on:clickMask={() => (visible6 = false)} />

	<Cell title="Increase ambiguity" on:click={() => (visible7 = true)} />
	<Mask visible={visible7} backdropBlur="xl" opacity={0} on:clickMask={() => (visible7 = false)} />

	<Cell title="Increased the animation time" on:click={() => (visible8 = true)} />
	<Mask visible={visible8} duration={1000} on:clickMask={() => (visible8 = false)} />

	<Cell title="Increased the duration of vanishing animation" on:click={() => (visible9 = true)} />
	<Mask visible={visible9} outDuration={1000} on:clickMask={() => (visible9 = false)} />

	<Cell title="Toast Use in" on:click={() => (visible10 = true)} />
	<Toast bind:visible={visible10} message="Transparency is 0" />

	<Cell title="Popup Use in" on:click={() => (visible11 = true)} />
	<Popup bind:visible={visible11} />
</div>
