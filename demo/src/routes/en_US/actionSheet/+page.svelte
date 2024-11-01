<!-- ActionSheet Demo -->
<script>
	import { Cell, ActionSheet, Toast } from '../../../../../packages/stdf/components';

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible7 = $state(false);
	let visible8 = $state(false);
	let visible9 = $state(false);
	let visible10 = $state(false);
	let visible11 = $state(false);
	let visible12 = $state(false);

	const actions = [{ content: 'Option one' }, { content: 'Option two' }, { content: 'Option three' }];

	let toastVisible1 = $state(false);
	let toastVisible2 = $state(false);
	let toastVisible3 = $state(false);
	let index = $state(0);
	let item = $state({ content: '' });
	const clickActionFunc = (i, action) => {
		index = i;
		item = action;
		toastVisible3 = true;
	};
</script>

<div class="py-4">
	<Cell title="Basic usage" onclick={() => (visible1 = true)} />
	<ActionSheet bind:visible={visible1} {actions} />

	<Cell title="If you have canceled operation and click on the mask, you cannot turn off" onclick={() => (visible2 = true)} />
	<ActionSheet bind:visible={visible2} {actions} showCancel popup={{ maskClosable: false }} />

	<Cell title="Different styles" onclick={() => (visible3 = true)} />
	<ActionSheet
		bind:visible={visible3}
		actions={[
			{ content: 'Conventional option' },
			{ content: 'Theme option', style: 'theme' },
			{ content: 'Disable option', style: 'disabled' },
			{ content: 'Warning option', style: 'danger' },
		]}
	/>

	<Cell title="Title and description information" onclick={() => (visible4 = true)} />
	<ActionSheet
		bind:visible={visible4}
		actions={[
			{ content: 'Option one' },
			{ content: 'Option two', desc: 'Here is description information description information' },
			{ content: 'Option three', desc: 'Here is description information' },
		]}
		title="This is the title, which can be briefly explained."
	/>

	<Cell title="Come on the top" onclick={() => (visible5 = true)} />
	<ActionSheet bind:visible={visible5} {actions} popup={{ radius: 'xl' }} />

	<Cell title="There is a spacing on both sides" onclick={() => (visible6 = true)} />
	<ActionSheet bind:visible={visible6} {actions} popup={{ radius: 'xl', px: '2' }} />

	<Cell title="Supervision and closing incident" onclick={() => (visible7 = true)} />
	<ActionSheet bind:visible={visible7} {actions} onclose={() => (toastVisible1 = true)} />
	<Toast bind:visible={toastVisible1} message="closed ActionSheet!" />

	<Cell title="Supervision and canceling incident" onclick={() => (visible8 = true)} />
	<ActionSheet bind:visible={visible8} {actions} showCancel oncancel={() => (toastVisible2 = true)} />
	<Toast bind:visible={toastVisible2} message="Click to cancel!" />

	<Cell title="Survening options click event" onclick={() => (visible9 = true)} />
	<ActionSheet bind:visible={visible9} {actions} onclickAction={clickActionFunc} />
	<Toast bind:visible={toastVisible3} message={`Click the ${index + 1} item,${item.content}!`} />

	<Cell title="Click the option not to be closed" onclick={() => (visible10 = true)} />
	<ActionSheet bind:visible={visible10} {actions} actionClosable={false} />

	<Cell title="Options with pictures" onclick={() => (visible11 = true)} />
	<ActionSheet
		bind:visible={visible11}
		actions={[
			{ content: 'Lina', showImg: true, imgSrc: '/assets/images/dota_火女.png', imgRadius: 'base' },
			{ content: 'Earthshaker', showImg: true, imgSrc: '/assets/images/dota_小牛.png', imgRadius: 'base' },
			{ content: 'Morphling', showImg: true, imgSrc: '/assets/images/dota_水人.png', imgRadius: 'base' },
		]}
	/>

	<Cell title="Option left" onclick={() => (visible12 = true)} />
	<ActionSheet
		bind:visible={visible12}
		actions={[
			{ content: 'Apple', showImg: true, imgSrc: '/assets/logos/apple.png', imgRadius: 'none' },
			{ content: 'Google', showImg: true, imgSrc: '/assets/logos/google.png', imgRadius: 'none' },
			{ content: 'Microsoft', showImg: true, imgSrc: '/assets/logos/microsoft.png', imgRadius: 'none' },
			{ content: 'Adobe', showImg: true, imgSrc: '/assets/logos/adobe.png', imgRadius: 'none' },
			{ content: 'Figma', showImg: true, imgSrc: '/assets/logos/figma.png', imgRadius: 'none' },
		]}
		align="left"
	/>
</div>
