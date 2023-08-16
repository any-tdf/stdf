<!-- Popup Demo -->
<script>
    import { Cell, Popup, Button, Icon } from 'stdf';
    import Aphorism from '../../components/Aphorism.svelte';

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
    let visible12 = false;
    let visible13 = false;
    let visible14 = false;
    let visible15 = false;
    let visible16 = false;
    let visible17 = false;
    let visible18 = false;
    let visible19 = false;
    let visible20 = false;
    let visible21 = false;

    let size = 40;
</script>

<div class="py-4">
    <Cell title="基础用法" on:click={() => (visible1 = true)} />
    <Popup bind:visible={visible1} />

    <Cell title="顶部位置" on:click={() => (visible2 = true)} />
    <Popup bind:visible={visible2} position="top" />

    <Cell title="左侧位置" on:click={() => (visible3 = true)} />
    <Popup bind:visible={visible3} position="left" />

    <Cell title="右侧位置" on:click={() => (visible4 = true)} />
    <Popup bind:visible={visible4} position="right" />

    <Cell title="中间位置" on:click={() => (visible5 = true)} />
    <Popup bind:visible={visible5} position="center" />

    <Cell title="顶部位置有圆角" on:click={() => (visible6 = true)} />
    <Popup bind:visible={visible6} radius="xl" />

    <Cell title="有圆角和间距" on:click={() => (visible7 = true)} />
    <Popup bind:visible={visible7} radiusPosition="all" radius="3xl" px="4" py="4" />

    <Cell title="中间位置有间距和圆角" on:click={() => (visible10 = true)} />
    <Popup bind:visible={visible10} position="center" radiusPosition="all" radius="xl" px="8" />

    <Cell title="设置出现动画缓动" detail="回弹" on:click={() => (visible11 = true)} />
    <Popup bind:visible={visible11} position="center" radiusPosition="all" radius="xl" px="8" easeType="backOut" />

    <Cell title="换一个出现动画缓动" detail="弹跳" on:click={() => (visible16 = true)} />
    <Popup bind:visible={visible16} easeType="bounceOut" />

    <Cell title="不同大小" on:click={() => (visible8 = true)} />
    <Popup bind:visible={visible8} size={80} />

    <Cell title="左侧位置不同大小" on:click={() => (visible9 = true)} />
    <Popup bind:visible={visible9} size={80} position="left" />

    <Cell title="遮罩完全透明且模糊" on:click={() => (visible12 = true)} />
    <Popup bind:visible={visible12} position="center" radiusPosition="all" radius="xl" px="8" mask={{ opacity: 0, backdropBlur: 'base' }} />

    <Cell title="点击遮罩不会关闭" on:click={() => (visible13 = true)} />
    <Popup bind:visible={visible13} maskClosable={false}>
        <div class="flex flex-col justify-center h-full">
            <Button on:click={() => (visible13 = false)}>关闭</Button>
        </div>
    </Popup>

    <Cell title="大小自动" detail="取决于内部元素" on:click={() => (visible14 = true)} />
    <Popup bind:visible={visible14} size={0} radiusPosition="all" radius="3xl" px="4" py="4" transitionDistance={353}>
        <div class="w-full text-center">
            <div class="py-6 font-bold text-xl">AirPods Pro 已连接</div>
            <div class="w-1/2 m-auto">
                <img class="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
            </div>
            <div class="flex justify-around py-6 text-primary dark:text-dark">
                <div>设置</div>
                <div>音乐</div>
            </div>
        </div>
    </Popup>

    <Cell title="左侧位置自动大小" on:click={() => (visible20 = true)} />
    <Popup bind:visible={visible20} size={0} position="left" py="48" radiusPosition="right" radius="2xl" transitionDistance={80}>
        <div class="h-full flex flex-col justify-around text-primary dark:text-dark">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="p-6" on:click={() => (visible20 = false)}>首页</div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="p-6" on:click={() => (visible20 = false)}>设置</div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="p-6" on:click={() => (visible20 = false)}>关于</div>
        </div>
    </Popup>

    <Cell title="大小自动背景透明" on:click={() => (visible17 = true)} />
    <Popup bind:visible={visible17} position="top" size={0} px="4" py="8" transparent transitionDistance={136}>
        <div class="w-full bg-black text-white rounded-full flex justify-between p-3">
            <div class="flex">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                    <img class="w-full object-cover" src="/assets/images/avatar_1.jpg" alt="" />
                </div>
                <div class="flex flex-col justify-end pl-4">
                    <div class="text-xs text-white/40">手机</div>
                    <div>胡歌</div>
                </div>
            </div>
            <div class="flex space-x-3">
                <div
                    class="w-12 h-12 rounded-full bg-[#ff3b30] flex flex-col justify-center items-center"
                    style="transform: rotate(135deg);"
                >
                    <Icon name="ri-phone-fill" />
                </div>
                <div class="w-12 h-12 rounded-full bg-[#4cd964] flex flex-col justify-center items-center">
                    <Icon name="ri-phone-fill" />
                </div>
            </div>
        </div>
    </Popup>

    <Cell title="居中位置背景透明" on:click={() => (visible18 = true)} />
    <Popup bind:visible={visible18} size={0} position="center" transparent>
        <div class="flex flex-col justify-center">
            <div class="w-1/2 m-auto">
                <img class="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
            </div>
        </div>
    </Popup>

    <Cell title="反色遮罩" on:click={() => (visible15 = true)} />
    <Popup bind:visible={visible15} mask={{ inverse: true }} />

    <Cell title="溢出滚动" on:click={() => (visible19 = true)} />
    <Popup bind:visible={visible19} size={30} position="center">
        <Aphorism num={4} />
    </Popup>

    <Cell title="允许 body 滚动" on:click={() => (visible21 = true)} />
    <Popup bind:visible={visible21} allowBodyScroll />
</div>

<!-- Aphorism.svelte -->
<!-- 
<script>
    import aphorisms from '../data/aphorisms'; //引入数据

    export let num = 0; //显示条数
    export let compact = false; //是否紧凑模式

    //从 aphorisms 随机取出 num 条数据
    const aphorismsList = aphorisms.sort(() => Math.random() - 0.5).slice(0, num);
</script>

<div class={`${compact ? '' : 'px-4 py-8 '}divide-y divide-black/5 dark:divide-white/5`}>
    {#each aphorismsList as item}
        <div class:py-6={num > 1}>
            <div class="text-sm text-justify">{item.text}</div>
            <div class="text-right mt-1" class:italic={item.fromItalic}>{item.from}</div>
        </div>
    {/each}
</div>
-->
