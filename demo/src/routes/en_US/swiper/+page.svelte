<!-- Swiper Demo -->
<script>
	import { Swiper } from 'stdf';
	import Item from './Item_en.svelte';

	const data = [
		{ type: 'img', url: '/assets/images/wall_1.jpg' },
		{ type: 'img', url: '/assets/images/wall_2.jpg' },
		{ type: 'img', url: '/assets/images/wall_3.jpg' },
		{ type: 'img', url: '/assets/images/wall_4.jpg' },
	];

	const componentData = [
		{ type: 'component', component: Item },
		{ type: 'img', url: '/assets/images/wall_1.jpg' },
	];

	let indexClick = -1;
	const clickImgFun = i => {
		indexClick = i.detail;
	};

	let indexChange = 0;
	const changeContainerFun = i => {
		indexChange = i.detail;
	};
</script>

<div class="font-bold text-lg mx-4 mt-10 mb-2">Basic usage</div>
<Swiper {data} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">The initial index is 2</div>
<Swiper {data} initActive={2} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Interval of 8 seconds</div>
<Swiper {data} interval={8} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Transition 1500 ms</div>
<Swiper {data} duration={1500} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Turn off autoplay</div>
<Swiper {data} autoplay={false} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">External indicator</div>
<Swiper {data} indicatePosition="out" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Off indicator</div>
<Swiper {data} indicatePosition="none" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Right-align indicator</div>
<Swiper {data} indicateAlign="right" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Dot indicator</div>
<Swiper {data} indicateStyle="point" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Linear indicator</div>
<Swiper {data} indicateStyle="line" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Long line indicator</div>
<Swiper {data} indicateStyle="longLine" interval={8} />
<div class="mt-10" />
<Swiper {data} indicateStyle="longLine" interval={8} indicatePosition="out" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Square indicator</div>
<Swiper {data} indicateRadius={false} />
<div class="mt-10" />
<Swiper {data} indicateStyle="point" indicateRadius={false} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	Specifies the color behind the indicator
	<p class="font-thin text-xs mb-2">injection Class</p>
</div>
<Swiper {data} indicateInjClass="from-black/0 to-purple/50" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	Specify indicator color
	<p class="font-thin text-xs mb-2">Remove the background color at the same time</p>
</div>
<Swiper {data} indicateInjClass="bg-none" indicateColor="bg-orange" indicateActiveColor="bg-green" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">Specifies the container aspect ratio</div>
<Swiper {data} aspectRatio={[4, 1]} />

<div class="font-bold text-lg mx-4 mt-10">
	Configure the inside margins of the container
	<p class="font-thin text-xs mb-2">Also specify indicator color, remove indicator back color, and configure container interior fillet</p>
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
<div class="mt-10" />
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
	Add a drop shadow inside the container
	<p class="font-normal text-xs mb-2">injection Class</p>
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

<div class="font-bold text-lg mx-4 mt-10 mb-2">Inactive container X and Z offsets</div>
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
<div class="mt-10" />
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
<div class="mt-10" />
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

<div class="font-bold text-lg mx-4 mt-10 mb-2">Inactive container X, Y, Z axis rotation</div>
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
<div class="mt-10" />
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
<div class="mt-10" />
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
<div class="mt-10" />
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
<div class="mt-10" />
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
<div class="mt-10" />
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

<div class="font-bold text-lg mx-4 mt-10 mb-2">The container injection Class was not activated</div>
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
<div class="mt-10" />
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

<div class="font-bold text-lg mx-4 mt-10 mb-2">Specified container width</div>
<div class="flex justify-center">
	<Swiper {data} containerWidth={(document.body.clientWidth / 4) * 3} />
</div>

<div class="font-bold text-lg mx-4 mt-10 mb-2">Container content uses components</div>
<Swiper data={componentData} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	Listen for change events
	<p class=" font-normal text-xs mb-2">Currently active index values:{indexChange}</p>
</div>
<Swiper {data} on:change={changeContainerFun} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	Listen for click events
	<p class="font-normal text-xs mb-2">Click on the index value: {indexClick === -1 ? 'Not clicked' : indexClick}</p>
</div>
<Swiper {data} on:clickimg={clickImgFun} />

<!-- Item.svelte -->
<!-- 
<script>
    import { Button, Avatar } from 'stdf';
</script>

<div class="flex flex-col space-y-4 items-center">
    <div class="text-center">This container uses a single component as its content</div>
    <div>
        <Avatar />
    </div>
    <div class="w-full">
        <Button>button</Button>
    </div>
</div>
 -->
