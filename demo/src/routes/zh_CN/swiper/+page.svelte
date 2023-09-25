<!-- Swiper Demo -->
<script>
	import { Swiper } from '../../../../../packages/stdf/components';
	import Item from './Item.svelte';

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

<div class="font-bold text-lg mx-4 mt-10 mb-2">基础用法</div>
<Swiper {data} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">初始索引为2</div>
<Swiper {data} initActive={2} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">间隔8秒</div>
<Swiper {data} interval={8} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">过渡1500毫秒</div>
<Swiper {data} duration={1500} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">关闭自动播放</div>
<Swiper {data} autoplay={false} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">外部指示器</div>
<Swiper {data} indicatePosition="out" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">关闭指示器</div>
<Swiper {data} indicatePosition="none" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">指示器右对齐</div>
<Swiper {data} indicateAlign="right" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">圆点指示器</div>
<Swiper {data} indicateStyle="point" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">线性指示器</div>
<Swiper {data} indicateStyle="line" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">长线指示器</div>
<Swiper {data} indicateStyle="longLine" interval={8} />
<div class="mt-10" />
<Swiper {data} indicateStyle="longLine" interval={8} indicatePosition="out" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">方形指示器</div>
<Swiper {data} indicateRadius={false} />
<div class="mt-10" />
<Swiper {data} indicateStyle="point" indicateRadius={false} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	指定指示器背景色
	<p class="font-thin text-xs mb-2">注入 Class</p>
</div>
<Swiper {data} indicateInjClass="from-black/0 to-purple/50" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	指定指示器颜色
	<p class="font-thin text-xs mb-2">同时去除背景色</p>
</div>
<Swiper {data} indicateInjClass="bg-none" indicateColor="bg-orange" indicateActiveColor="bg-green" />

<div class="font-bold text-lg mx-4 mt-10 mb-2">指定容器宽高比</div>
<Swiper {data} aspectRatio={[4, 1]} />

<div class="font-bold text-lg mx-4 mt-10">
	配置容器内边距
	<p class="font-thin text-xs mb-2">同时指定指示器颜色、去除指示器背景色、配置容器内部圆角</p>
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
	容器内部增加投影
	<p class="font-normal text-xs mb-2">注入 Class</p>
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

<div class="font-bold text-lg mx-4 mt-10 mb-2">未激活容器X、Z轴偏移</div>
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

<div class="font-bold text-lg mx-4 mt-10 mb-2">未激活容器X、Y、Z轴旋转</div>
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

<div class="font-bold text-lg mx-4 mt-10 mb-2">未激活容器注入 Class</div>
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

<div class="font-bold text-lg mx-4 mt-10 mb-2">指定容器宽度</div>
<div class="flex justify-center">
	<Swiper {data} containerWidth={(document.body.clientWidth / 4) * 3} />
</div>

<div class="font-bold text-lg mx-4 mt-10 mb-2">容器内容使用组件</div>
<Swiper data={componentData} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	监听 change 事件
	<p class=" font-normal text-xs mb-2">当前激活索引值：{indexChange}</p>
</div>
<Swiper {data} on:change={changeContainerFun} />

<div class="font-bold text-lg mx-4 mt-10 mb-2">
	监听 click 事件
	<p class="font-normal text-xs mb-2">点击索引值：{indexClick === -1 ? '未点击' : indexClick}</p>
</div>
<Swiper {data} on:clickimg={clickImgFun} />

<!-- Item.svelte -->
<!-- <script>
    import { Button, Avatar } from '../../../../../packages/stdf/components';
</script>

<div class="flex flex-col space-y-4 items-center">
    <div class="text-center">此容器使用单个组件作为内容</div>
    <div>
        <Avatar />
    </div>
    <div class="w-full">
        <Button>按 钮</Button>
    </div>
</div> -->
