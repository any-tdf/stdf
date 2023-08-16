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
    <Cell title="Basic usage" on:click={() => (visible1 = true)} />
    <Popup bind:visible={visible1} />

    <Cell title="Top position" on:click={() => (visible2 = true)} />
    <Popup bind:visible={visible2} position="top" />

    <Cell title="Left position" on:click={() => (visible3 = true)} />
    <Popup bind:visible={visible3} position="left" />

    <Cell title="Right side position" on:click={() => (visible4 = true)} />
    <Popup bind:visible={visible4} position="right" />

    <Cell title="Intermediate position" on:click={() => (visible5 = true)} />
    <Popup bind:visible={visible5} position="center" />

    <Cell title="Rounded corners at the top" on:click={() => (visible6 = true)} />
    <Popup bind:visible={visible6} radius="xl" />

    <Cell title="Have rounded corners and spacing" on:click={() => (visible7 = true)} />
    <Popup bind:visible={visible7} radiusPosition="all" radius="3xl" px="4" py="4" />

    <Cell title="The center is spaced and rounded" on:click={() => (visible10 = true)} />
    <Popup bind:visible={visible10} position="center" radiusPosition="all" radius="xl" px="8" />

    <Cell title="Set animation easing to appear" detail="rebound" on:click={() => (visible11 = true)} />
    <Popup bind:visible={visible11} position="center" radiusPosition="all" radius="xl" px="8" easeType="backOut" />

    <Cell title="Let's replace it with a slow animation" detail="bounce" on:click={() => (visible16 = true)} />
    <Popup bind:visible={visible16} easeType="bounceOut" />

    <Cell title="Different size" on:click={() => (visible8 = true)} />
    <Popup bind:visible={visible8} size={80} />

    <Cell title="The left side has different sizes" on:click={() => (visible9 = true)} />
    <Popup bind:visible={visible9} size={80} position="left" />

    <Cell title="The mask is completely transparent and fuzzy" on:click={() => (visible12 = true)} />
    <Popup bind:visible={visible12} position="center" radiusPosition="all" radius="xl" px="8" mask={{ opacity: 0, backdropBlur: 'base' }} />

    <Cell title="Clicking the mask does not close" on:click={() => (visible13 = true)} />
    <Popup bind:visible={visible13} maskClosable={false}>
        <div class="flex flex-col justify-center h-full">
            <Button on:click={() => (visible13 = false)}>Shut down</Button>
        </div>
    </Popup>

    <Cell title="Size automatic" detail="Depends on internal elements" on:click={() => (visible14 = true)} />
    <Popup bind:visible={visible14} size={0} radiusPosition="all" radius="3xl" px="4" py="4" transitionDistance={353}>
        <div class="w-full text-center">
            <div class="py-6 font-bold text-xl">AirPods Pro connected</div>
            <div class="w-1/2 m-auto">
                <img class="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
            </div>
            <div class="flex justify-around py-6 text-primary dark:text-dark">
                <div>set</div>
                <div>music</div>
            </div>
        </div>
    </Popup>

    <Cell title="The left position is automatically sized" on:click={() => (visible20 = true)} />
    <Popup bind:visible={visible20} size={0} position="left" py="48" radiusPosition="right" radius="2xl" transitionDistance={80}>
        <div class="h-full flex flex-col justify-around text-primary dark:text-dark">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="p-6" on:click={() => (visible20 = false)}>Home page</div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="p-6" on:click={() => (visible20 = false)}>set</div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="p-6" on:click={() => (visible20 = false)}>about</div>
        </div>
    </Popup>

    <Cell title="Size automatic background transparent" on:click={() => (visible17 = true)} />
    <Popup bind:visible={visible17} position="top" size={0} px="4" py="8" transparent transitionDistance={136}>
        <div class="w-full bg-black text-white rounded-full flex justify-between p-3">
            <div class="flex">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                    <img class="w-full object-cover" src="/assets/images/avatar_1.jpg" alt="" />
                </div>
                <div class="flex flex-col justify-end pl-4">
                    <div class="text-xs text-white/40">Mobile phone</div>
                    <div>Hu Ge</div>
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

    <Cell title="The center position has a transparent background" on:click={() => (visible18 = true)} />
    <Popup bind:visible={visible18} size={0} position="center" transparent>
        <div class="flex flex-col justify-center">
            <div class="w-1/2 m-auto">
                <img class="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
            </div>
        </div>
    </Popup>

    <Cell title="Reverse color mask" on:click={() => (visible15 = true)} />
    <Popup bind:visible={visible15} mask={{ inverse: true }} />

    <Cell title="Overflow roll" on:click={() => (visible19 = true)} />
    <Popup bind:visible={visible19} size={30} position="center">
        <Aphorism num={4} />
    </Popup>

    <Cell title="allow body roll" on:click={() => (visible21 = true)} />
    <Popup bind:visible={visible21} allowBodyScroll />
</div>

<!-- Aphorism.svelte -->
<!-- 
<script>
    import aphorisms from '../data/aphorisms'; //Incoming data

    export let num = 0; //Display number
    export let compact = false; //Compact or not mode

    //num bars were randomly extracted from aphorisms
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
