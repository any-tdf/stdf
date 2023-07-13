<script>
    import { Swiper, Cell, Button, Progress, Divider } from '../../../../components';

    const imgs = [
        { type: 'img', url: './assets/images/wall_1.jpg' },
        { type: 'img', url: './assets/images/wall_2.jpg' },
        { type: 'img', url: './assets/images/wall_3.jpg' },
        { type: 'img', url: './assets/images/wall_4.jpg' },
    ];
</script>

<div class="pt-4 pb-2 text-center text-xl font-bold">Button</div>
<Button radius='full'>确定</Button>
<Divider />


<div class="pt-4 pb-2 text-center text-xl font-bold">Cell</div>
<Cell title="开关全圆角" right={{ type: 'switch', switch: { radius: 'full' } }} />
<Divider />

<div class="pt-4 pb-2 text-center text-xl font-bold">Swiper</div>
<Swiper
    data={imgs}
    interval={100}
    px="6"
    py="6"
    indicateInjClass="bg-none"
    radius="2xl"
    indicateColor="bg-black/5 dark:bg-white/10"
    indicateActiveColor="bg-primary dark:bg-dark"
    indicateStyle="longLine"
/>
<Divider />

<div class="pt-4 pb-4 text-center text-xl font-bold">Progress</div>
<div class="px-4"><Progress radius="base" percentPosition="block" /></div>
