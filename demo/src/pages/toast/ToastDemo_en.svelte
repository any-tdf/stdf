<!-- Toast Demo -->
<script>
    import { Toast, Cell, Button, Loading } from '../../../../packages/stdf';

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
    let visible22 = false;
    let visible23 = false;
    let visible24 = false;
    let visible25 = false;
    let visible26 = false;
    let visible27 = false;
    let visible28 = false;
    let visible29 = false;
    let visible30 = false;
    let visible31 = false;
    let visible32 = false;

    let time = 4;
    let timer = null;
    const useSlotFun = () => {
        visible25 = true;
        timer = setInterval(() => {
            time--;
            if (time <= 0) {
                clearInterval(timer);
                visible25 = false;
                time = 3;
            }
        }, 1000);
    };
</script>

<div class="py-4">
    <Cell title="Basic usage" on:click={() => (visible1 = true)} />
    <Toast bind:visible={visible1} message="Light hint" />

    <Cell title="Long text prompt" on:click={() => (visible2 = true)} />
    <Toast bind:visible={visible2} message="When the character count is too long, it is generally not recommended to display too much content here!" />

    <Cell title="Do not block clicks" on:click={() => (visible3 = true)} />
    <Toast bind:visible={visible3} clickable message="The content below the mask can also be clicked" />

    <Cell title="Fixed display time" on:click={() => (visible4 = true)} />
    <Toast bind:visible={visible4} duration={6000} message="It turns off automatically after 6 seconds" />

    <Cell title="Non-automatic closing" on:click={() => (visible5 = true)} />
    <Toast bind:visible={visible5} duration={0} clickable message="This prompt will not automatically close, please click the button to close" />

    <Cell title="Success message" on:click={() => (visible6 = true)} />
    <Toast bind:visible={visible6} type="success" message="Success message" />

    <Cell title="Failure prompt" on:click={() => (visible7 = true)} />
    <Toast bind:visible={visible7} type="error" message="Failure prompt" />

    <Cell title="Warning prompt" on:click={() => (visible8 = true)} />
    <Toast bind:visible={visible8} type="warning" message="Warning prompt" />

    <Cell title="Information prompt" on:click={() => (visible9 = true)} />
    <Toast bind:visible={visible9} type="info" message="Information prompt" />

    <Cell title="Load prompt" on:click={() => (visible30 = true)} />
    <Toast bind:visible={visible30} type="loading" message="Under load..." />

    <Cell title="Theme color loading prompt" on:click={() => (visible31 = true)} />
    <Toast bind:visible={visible31} type="loading" loading={{ theme: true }} message="Under load..." />

    <Cell title="Loading prompt for # 1_3" on:click={() => (visible32 = true)} />
    <Toast bind:visible={visible32} type="loading" loading={{ type: '1_3' }} message="Under load..." />

    <Cell title="Custom type" on:click={() => (visible27 = true)} />
    <Toast bind:visible={visible27} type="ri-thumb-up-fill" message="You are so good!" />

    <Cell title="The mask is opaque" on:click={() => (visible10 = true)} />
    <Toast bind:visible={visible10} mask={{ opacity: 0.3 }} message="Mask transparency is 0.3" />

    <Cell title="Reverse color mask" on:click={() => (visible11 = true)} />
    <Toast bind:visible={visible11} mask={{ inverse: true, opacity: 0.5 }} message="Reverse color mask" />

    <Cell title="Mask blur" on:click={() => (visible12 = true)} />
    <Toast bind:visible={visible12} mask={{ opacity: 0, backdropBlur: 'base' }} message="The content below the mask is blurry" />

    <Cell title="Faster transition" on:click={() => (visible13 = true)} />
    <Toast bind:visible={visible13} transitionParams={{ duration: 150 }} message="The transition time is 150ms" />

    <Cell title="Slow transition" on:click={() => (visible14 = true)} />
    <Toast bind:visible={visible14} transitionParams={{ duration: 1000 }} message="The transition time is 1s" />

    <Cell title="Fade in" on:click={() => (visible15 = true)} />
    <Toast bind:visible={visible15} transitionType="fade" message="Fade in presentation" />

    <Cell title="Move down" on:click={() => (visible16 = true)} />
    <Toast bind:visible={visible16} transitionType="fly" transitionParams={{ y: -150 }} message="Move down into presentation" />

    <Cell title="Move in to the right" on:click={() => (visible17 = true)} />
    <Toast bind:visible={visible17} transitionType="fly" transitionParams={{ x: -150 }} message="Move right into presentation" />

    <Cell title="expansion" on:click={() => (visible18 = true)} />
    <Toast bind:visible={visible18} transitionType="slide" message="Unfold and present" />

    <Cell title="blur" on:click={() => (visible19 = true)} />
    <Toast bind:visible={visible19} transitionType="blur" transitionParams={{ duration: 1000 }} message="Fuzzy rendering" />

    <Cell title="No transition" on:click={() => (visible20 = true)} />
    <Toast bind:visible={visible20} transitionType="none" message="Direct presentation without transition" />

    <Cell title="Exit zoom animation" on:click={() => (visible28 = true)} />
    <Toast bind:visible={visible28} outDuration={300} message="The zoom animation time on exit is 300ms" />

    <Cell title="Exit Move out animation" on:click={() => (visible29 = true)} />
    <Toast
        bind:visible={visible29}
        outDuration={300}
        transitionType="fly"
        transitionParams={{ y: -150 }}
        message="When exiting, move out animation time is 300ms"
    />

    <Cell title="Delayed occurrence" on:click={() => (visible21 = true)} />
    <Toast bind:visible={visible21} transitionParams={{ delay: 1000 }} message="Click for 1 second and then display" />

    <Cell title="top" on:click={() => (visible22 = true)} />
    <Toast bind:visible={visible22} position="top" message="Tips at the top" />

    <Cell title="bottom" on:click={() => (visible23 = true)} />
    <Toast bind:visible={visible23} position="bottom" message="Tips at the bottom" />

    <Cell title="Top increase distance" on:click={() => (visible24 = true)} />
    <Toast bind:visible={visible24} position="top" py="40" message="The tip is at the top and the distance is increased" />

    <Cell title="use Slot" on:click={useSlotFun} />
    <Toast bind:visible={visible25} useSlot duration={0}>
        <div class="flex flex-col space-y-4">
            <div>Customize the prompt content</div>
            <Loading inverse />
            <div>Close in {time} seconds</div>
        </div>
    </Toast>

    <Cell title="Different styles of rounded corners" on:click={() => (visible26 = true)} />
    <Toast bind:visible={visible26} radius="xl" message="Rounded corners were added" />
</div>

<div class="flex sticky bottom-0 z-10 bg-white/60 dark:bg-gray1/60 backdrop-blur">
    <div class="flex-1">
        <Button fill="lineTheme" on:click={() => (visible5 = false)}>Manual shutdown</Button>
    </div>
</div>
