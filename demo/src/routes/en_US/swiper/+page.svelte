<!-- Swiper Demo -->
<script>
	import { Swiper } from '../../../../../packages/stdf/components';
	import Item from './Item_en.svelte';

	/**
	 * @typedef {Object} Img
	 * @property {'img'} type Type
	 * @property {String} url Image URL
	 */

	/**
	 * @typedef {Object} Component
	 * @property {'component'} type Type
	 * @property {Object} component Component
	 */

	/**
	 * Data
	 * @type {(Img|Component)[]}
	 * @default []
	 */
	const data = [
		{ type: 'img', url: '/assets/images/wall_1.jpg' },
		{ type: 'img', url: '/assets/images/wall_2.jpg' },
		{ type: 'img', url: '/assets/images/wall_3.jpg' },
		{ type: 'img', url: '/assets/images/wall_4.jpg' },
	];

	let indexClick = $state(-1);
	let indexChange = $state(0);
</script>

<div class="font-bold text-lg mx-4 mt-10 mb-2">Basic Usage</div>
<Swiper {data} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Initial Index 2</div>
<Swiper {data} initActive={2} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">8s Interval</div>
<Swiper {data} interval={8} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">1500ms Duration</div>
<Swiper {data} duration={1500} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Disable Autoplay</div>
<Swiper {data} autoplay={false} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">External Indicator</div>
<Swiper {data} indicatePosition="out" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Hide Indicator</div>
<Swiper {data} indicatePosition={null} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Right Aligned Indicator</div>
<Swiper {data} indicateAlign="right" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Dot Indicator</div>
<Swiper {data} indicateStyle="point" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Line Indicator</div>
<Swiper {data} indicateStyle="line" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Long Line Indicator</div>
<Swiper {data} indicateStyle="longLine" interval={8} />
<div class="mt-10"></div>
<Swiper {data} indicateStyle="longLine" interval={8} indicatePosition="out" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Square Indicator</div>
<Swiper {data} indicateRadius={false} />
<div class="mt-10"></div>
<Swiper {data} indicateStyle="point" indicateRadius={false} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	Custom Indicator Background
	<p class="font-thin text-xs mb-2">Inject Class</p>
</div>
<Swiper {data} indicateInjClass="from-black/0 to-extend0/50" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	Custom Indicator Color
	<p class="font-thin text-xs mb-2">Remove Background</p>
</div>
<Swiper {data} indicateInjClass="bg-none" indicateColor="bg-extend2" indicateActiveColor="bg-extend1" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Custom Aspect Ratio</div>
<Swiper {data} aspectRatio={[4, 1]} />

<div class="font-bold text-lg mx-4 mt-10">
	Container Padding
	<p class="font-thin text-xs mb-2">With Custom Colors and Radius</p>
</div>
<Swiper
	{data}
	px="6"
	py="6"
	indicateInjClass="bg-none"
	indicateColor="bg-black/5 dark:bg-white/10"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	interval={8}
	indicateStyle="longLine"
/>
<div class="mt-10"></div>
<Swiper
	{data}
	px="6"
	py="6"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="full"
	aspectRatio={[3, 1]}
/>

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	Inner Shadow
	<p class="font-normal text-xs mb-2">Inject Class</p>
</div>
<Swiper
	{data}
	px="6"
	py="6"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="full"
	aspectRatio={[3, 1]}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
/>

<div class="font-bold text-lg mx-4 mt-10 mb-2">Inactive Item X, Z Translation</div>
<Swiper
	{data}
	px="16"
	py="6"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	aspectRatio={[3, 1]}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
	translateX={100}
/>
<div class="mt-10"></div>
<Swiper
	{data}
	px="4"
	py="8"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	translateZ={400}
	translateX={-200}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
/>
<div class="mt-10"></div>
<Swiper
	{data}
	px="12"
	py="8"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	translateZ={600}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
/>

<div class="font-bold text-lg mx-4 mt-10 mb-2">Inactive Item X, Y, Z Rotation</div>
<Swiper
	{data}
	px="4"
	py="8"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	rotateX={90}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
	duration={2000}
/>
<div class="mt-10"></div>
<Swiper
	{data}
	px="4"
	py="8"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	rotateY={90}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
	duration={2000}
/>
<div class="mt-10"></div>
<Swiper
	{data}
	px="4"
	py="8"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	rotateZ={90}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
	duration={2000}
/>
<div class="mt-10"></div>
<Swiper
	{data}
	px="4"
	py="8"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	rotateX={90}
	rotateY={90}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
	duration={2000}
/>
<div class="mt-10"></div>
<Swiper
	{data}
	px="4"
	py="8"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	rotateX={90}
	rotateZ={90}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
	duration={2000}
/>
<div class="mt-10"></div>
<Swiper
	{data}
	px="4"
	py="8"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	rotateY={90}
	rotateZ={90}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
	duration={2000}
/>

<div class="font-bold text-lg mx-4 mt-10 mb-2">Custom Inactive Item Style</div>
<Swiper
	{data}
	px="24"
	py="6"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
	radius="xl"
	aspectRatio={[3, 1]}
	translateX={160}
	duration={2000}
	notActiveInjClass="grayscale"
/>
<div class="mt-10"></div>
<Swiper
	{data}
	px="24"
	py="6"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
	radius="xl"
	aspectRatio={[3, 1]}
	translateX={160}
	duration={2000}
	notActiveInjClass="blur"
/>

<div class="font-bold text-lg mx-4 mt-10 mb-2">Custom Container Width</div>
<div class="flex justify-center">
	<Swiper {data} containerWidth={(document.body.clientWidth / 4) * 3} />
</div>

<div class="font-bold text-lg mx-4 mt-10 mb-2">Component as Content</div>
<Swiper
	data={[
		{ type: 'component', component: Item },
		{ type: 'img', url: '/assets/images/wall_1.jpg' },
	]}
/>

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	onchange Event
	<p class=" font-normal text-xs mb-2">Current Index: {indexChange}</p>
</div>
<Swiper {data} onchange={current => (indexChange = current)} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	onclick Event
	<p class="font-normal text-xs mb-2">Clicked Index: {indexClick === -1 ? 'None' : indexClick}</p>
</div>
<Swiper {data} onclick={current => (indexClick = current)} />

<!-- Item_en.svelte -->
<!--
<script>
	import { Button, Avatar } from 'stdf';
</script>

<div class="flex flex-col space-y-4 items-center">
	<div class="text-center">This container uses a single component as its content</div>
	<div><Avatar /></div>
	<div class="w-full"><Button>button</Button></div>
</div>
-->
