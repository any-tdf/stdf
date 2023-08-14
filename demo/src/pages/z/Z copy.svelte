<script>
    import { Swiper, Cell, Steps } from '../../../../packages/stdf/components';

    const imgs = [
        { type: 'img', url: './assets/images/wall_1.jpg' },
        { type: 'img', url: './assets/images/wall_2.jpg' },
        { type: 'img', url: './assets/images/wall_3.jpg' },
        { type: 'img', url: './assets/images/wall_4.jpg' },
    ];

    const steps = [
        { step: { title: '起床', desc: '起床搬砖了！' } },
        { step: { title: '吃饭', desc: '吃吃吃，肥死你。' } },
        { step: { title: '喝水', desc: '慢慢走路，多多喝水。' } },
        { step: { title: '打豆豆', desc: '打豆豆很爽。' } },
        { step: { title: '睡觉', desc: '吃太饱，睡不着。' } },
    ];
    const steps_en = [
        { step: { title: 'Get up', desc: 'Get up and move bricks!' } },
        { step: { title: 'Eat', desc: 'Eat, eat, eat, eat, fat you.' } },
        { step: { title: 'Drink', desc: 'Walk slowly and drink lots of water.' } },
        { step: { title: 'Beat beans', desc: "Pplay peas it's cool." } },
        { step: { title: 'sleep', desc: 'Too full to sleep.' } },
    ];
</script>

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


<div class="pt-4 pb-2 text-center text-xl font-bold">Cell</div>

<!-- <Cell title="开关全圆角" right={{ type: 'switch', switch: { radius: 'full' } }}/>  -->
<Cell title="Witch full raduis Switch" right={{ type: 'switch', switch: { radius: 'full' } }} />

    <!-- right={{ type: 'switch', switch: { radius: 'full' } }}  -->

<!-- <div class="pt-4 pb-2 text-center text-xl font-bold">Steps</div> -->

<!-- <Steps {steps} current={3} vertical /> -->
<!-- <Steps steps={steps_en} current={3} vertical /> -->
