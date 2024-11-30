<!-- Button Demo -->
<script lang="ts">
	import { Button, Icon, Toast, Loading } from '$lib/index.js';

	let visible = $state(false);
</script>

<div class="flex flex-col space-y-8 py-8">
	<div>
		<div class="p-4 font-bold">Different states</div>
		<Button>Default</Button>
		<Button state="success">Success</Button>
		<Button state="warning">Warning</Button>
		<Button state="error">Error</Button>
		<Button state="info">Information</Button>
	</div>
	<div>
		<div class="p-4 font-bold">Different rounded style</div>
		<Button>Default</Button>
		<Button radius="none">No rounded</Button>
		<Button radius="xl">Large rounded corner</Button>
		<Button radius="2xl">Larger corner</Button>
		<Button radius="full">Full rounded corner</Button>
	</div>
	<div>
		<div class="p-4 font-bold">Different fill mode</div>
		<Button>Default</Button>
		<Button fill="line">Colorless linear</Button>
		<Button fill="lineLight">Light color linearity</Button>
		<Button fill="lineTheme">Theme color linear</Button>
		<Button fill="text">Colorless pure text</Button>
		<Button fill="textTheme">Pure text of theme color</Button>
		<Button fill="colorLight">Light color filling</Button>
	</div>
	<div>
		<div class="p-4 font-bold">Different border style</div>
		<Button fill="lineTheme">Solid line</Button>
		<Button fill="lineTheme" line="dashed">Dashed line</Button>
		<Button fill="lineTheme" line="dotted">Dotted line</Button>
	</div>
	<div>
		<div class="p-4 font-bold">Different size</div>
		<Button size="full" radius="none">There is no rounded corner</Button>
		<Button>Default</Button>
		<Button size="md">Medium</Button>
		<Button size="sm">Small</Button>
		<Button size="auto">AUTO</Button>
		<Button size="auto">
			<div class="px-1">
				<Icon name="ri-plane-fill" size={20} top={-2} />
			</div>
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">Different heights</div>
		<Button heightOut="0">The external height is 0</Button>
		<Button heightIn="0">Internal height is 0</Button>
	</div>
	<div>
		<div class="p-4 font-bold">Fixed size</div>
		<div class="flex items-center justify-around">
			<Button customSize customWidth={40} customHeight={40} radius="full">W</Button>
			<Button customSize customWidth={40} customHeight={40} radius="xl">&</Button>
			<Button customSize customWidth={40} customHeight={40}>H</Button>
			<Button customSize customWidth={40} customHeight={40} radius="none">equal</Button>
			<Button fill="lineTheme" customSize customWidth={40} customHeight={40}>
				<Icon name="ri-plane-fill" size={20} top={-2} />
			</Button>
			<Button radius="full" fill="lineTheme" customSize customWidth={40} customHeight={40}>
				<Icon name="ri-plane-fill" size={20} top={-2} />
			</Button>
			<Button radius="full" line="dashed" fill="lineTheme" customSize customWidth={40} customHeight={40}>
				<Icon name="ri-plane-fill" size={20} top={-2} />
			</Button>
			<Button radius="full" customSize customWidth={24} customHeight={24} heightIn="0">
				<Icon name="ri-plane-fill" size={12} top={-2} />
			</Button>
		</div>
	</div>
	<div>
		<div class="p-4 font-bold">Disable</div>
		<Button disabled>Disable</Button>
		<Button fill="lineTheme" disabled>Disable</Button>
	</div>
	<div>
		<div class="p-4 font-bold">With icon</div>
		<Button icon={{ name: 'ri-share-forward-2-fill', size: 18, top: -2 }}>Throw the two way foil</Button>
		<Button fill="lineTheme" icon={{ name: 'ri-mic-off-fill', size: 16, top: -2 }}>Start the surface wall plan</Button>
	</div>
	<div>
		<div class="p-4 font-bold">With loading (disabled by default)</div>
		<Button loading={{ inverse: true, height: '6', width: '6' }}>Loading</Button>
		<Button loading={{ inverse: true, width: '16', height: '6', type: '1_28' }}>Loading</Button>
		<Button loading={{ inverse: true, height: '6', width: '6' }} disabledLoading={false}>Loading</Button>
	</div>
	<div>
		<div class="p-4 font-bold">With icon (passed through Snippet)</div>
		<Button>
			<Icon name="ri-share-forward-2-fill" size={18} top={-2} />
			Throw the two way foil
		</Button>
		<Button fill="lineTheme">
			<Icon name="ri-mic-off-fill" size={16} top={-2} />
			Start the surface wall plan
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">Load (passed through Snippet)</div>
		<Button>
			<Loading inverse height="6" width="6" />
		</Button>
		<Button>
			<Loading inverse width="16" height="6" type="1_17" />
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">Love version</div>
		<Button love>Care version button</Button>
		<Button love fill="lineTheme">
			<Icon name="ri-hand-heart-line" size={22} top={-2} />
			Care version button
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">Customize</div>
		<Button injClass="bg-[#C84031] dark:bg-[#77B941]">Solid color filling</Button>
		<Button injClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0] !text-white">Gradient filling</Button>
		<Button fill="line" injClass="border-[#C84031] dark:border-[#77B941] !text-[#C84031] dark:!text-[#77B941]">Linear</Button>
		<Button injClass="shadow-md shadow-black/30 dark:shadow-white/30">Shadow</Button>
		<Button radius="full" injClass="shadow-lg shadow-primary/40 dark:shadow-dark/40">Shadow</Button>
	</div>
	<div>
		<div class="p-4 font-bold">Button group</div>
		<Button fill="lineTheme" heightIn="0" group>
			<div class="flex w-full">
				<button class="flex-1 border-r border-primary py-2 active:opacity-80 dark:border-dark">
					<Icon name="ri-apps-2-line" size={18} top={-2} />
					Application
				</button>
				<button class="flex-1 border-r border-primary py-2 active:opacity-80 dark:border-dark">
					<Icon name="ri-star-line" size={18} top={-2} />
					Collect
				</button>
				<button class="flex-1 py-2 active:opacity-80" onclick={() => (visible = true)}>
					<Icon name="ri-share-forward-line" size={18} top={-2} />
					Share
				</button>
			</div>
		</Button>
		<Button radius="full" heightIn="0" group>
			<div class="flex w-full">
				<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black">
					<Icon name="ri-apps-2-line" size={18} top={-2} />
					Application
				</button>
				<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black">
					<Icon name="ri-star-line" size={18} top={-2} />
					Collect
				</button>
				<button class="flex-1 py-2 active:opacity-80" onclick={() => (visible = true)}>
					<Icon name="ri-share-forward-line" size={18} top={-2} />
					Share
				</button>
			</div>
		</Button>
	</div>
</div>
<Toast bind:visible message="Click share in the button group!" />
