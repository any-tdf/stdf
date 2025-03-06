<!-- Toast Demo -->
<script lang="ts">
	import { Toast, Cell, Button, Loading } from '$lib/index.js';

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
	let visible13 = $state(false);
	let visible14 = $state(false);
	let visible15 = $state(false);
	let visible16 = $state(false);
	let visible17 = $state(false);
	let visible18 = $state(false);
	let visible19 = $state(false);
	let visible20 = $state(false);
	let visible21 = $state(false);
	let visible22 = $state(false);
	let visible23 = $state(false);
	let visible24 = $state(false);
	let visible25 = $state(false);
	let visible26 = $state(false);
	let visible27 = $state(false);
	let visible28 = $state(false);
	let visible29 = $state(false);
	let visible30 = $state(false);
	let visible31 = $state(false);
	let visible32 = $state(false);

	let time = $state(4);
	let timer: number | null = null;
	const useSnippetFun = () => {
		visible25 = true;
		timer = setInterval(() => {
			time--;
			if (time <= 0) {
				clearInterval(timer!);
				visible25 = false;
				time = 3;
			}
		}, 1000);
	};
</script>

<div class="py-4">
	<Cell title="Basic usage" onclick={() => (visible1 = true)} />
	<Toast bind:visible={visible1} message="Light hint" />

	<Cell title="Long text prompt" onclick={() => (visible2 = true)} />
	<Toast
		bind:visible={visible2}
		message="When the character count is too long, it is generally not recommended to display too much content here!"
	/>

	<Cell title="Do not block clicks" onclick={() => (visible3 = true)} />
	<Toast bind:visible={visible3} clickable message="The content below the mask can also be clicked" />

	<Cell title="Fixed display time" onclick={() => (visible4 = true)} />
	<Toast bind:visible={visible4} duration={6000} message="It turns off automatically after 6 seconds" />

	<Cell title="Non-automatic closing" onclick={() => (visible5 = true)} />
	<Toast
		bind:visible={visible5}
		duration={0}
		clickable
		message="This prompt will not automatically close, please click the button to close"
	/>

	<Cell title="Success message" onclick={() => (visible6 = true)} />
	<Toast bind:visible={visible6} type="success" message="Success message" />

	<Cell title="Failure prompt" onclick={() => (visible7 = true)} />
	<Toast bind:visible={visible7} type="error" message="Failure prompt" />

	<Cell title="Warning prompt" onclick={() => (visible8 = true)} />
	<Toast bind:visible={visible8} type="warning" message="Warning prompt" />

	<Cell title="Information prompt" onclick={() => (visible9 = true)} />
	<Toast bind:visible={visible9} type="info" message="Information prompt" />

	<Cell title="Load prompt" onclick={() => (visible30 = true)} />
	<Toast bind:visible={visible30} type="loading" message="Under load..." />

	<Cell title="Theme color loading prompt" onclick={() => (visible31 = true)} />
	<Toast bind:visible={visible31} type="loading" loading={{ theme: true }} message="Under load..." />

	<Cell title="Loading prompt for # 1_3" onclick={() => (visible32 = true)} />
	<Toast bind:visible={visible32} type="loading" loading={{ type: '1_3' }} message="Under load..." />

	<Cell title="Custom type" onclick={() => (visible27 = true)} />
	<Toast bind:visible={visible27} type="icon" icon={{ name: 'ri-thumb-up-fill' }} message="You are so good!" />

	<Cell title="The mask is opaque" onclick={() => (visible10 = true)} />
	<Toast bind:visible={visible10} mask={{ opacity: '0.3' }} message="Mask transparency is 0.3" />

	<Cell title="Reverse color mask" onclick={() => (visible11 = true)} />
	<Toast bind:visible={visible11} mask={{ inverse: true, opacity: '0.5' }} message="Reverse color mask" />

	<Cell title="Mask blur" onclick={() => (visible12 = true)} />
	<Toast bind:visible={visible12} mask={{ opacity: '0', backdropBlur: 'sm' }} message="The content below the mask is blurry" />

	<Cell title="Faster transition" onclick={() => (visible13 = true)} />
	<Toast bind:visible={visible13} transitionParams={{ duration: 150 }} message="The transition time is 150ms" />

	<Cell title="Slow transition" onclick={() => (visible14 = true)} />
	<Toast bind:visible={visible14} transitionParams={{ duration: 1000 }} message="The transition time is 1s" />

	<Cell title="Fade in" onclick={() => (visible15 = true)} />
	<Toast bind:visible={visible15} transitionType="fade" message="Fade in presentation" />

	<Cell title="Move down" onclick={() => (visible16 = true)} />
	<Toast bind:visible={visible16} transitionType="fly" transitionParams={{ y: -150 }} message="Move down into presentation" />

	<Cell title="Move in to the right" onclick={() => (visible17 = true)} />
	<Toast bind:visible={visible17} transitionType="fly" transitionParams={{ x: -150 }} message="Move right into presentation" />

	<Cell title="expansion" onclick={() => (visible18 = true)} />
	<Toast bind:visible={visible18} transitionType="slide" message="Unfold and present" />

	<Cell title="blur" onclick={() => (visible19 = true)} />
	<Toast bind:visible={visible19} transitionType="blur" transitionParams={{ duration: 1000 }} message="Fuzzy rendering" />

	<Cell title="No transition" onclick={() => (visible20 = true)} />
	<Toast bind:visible={visible20} transitionType={null} message="Direct presentation without transition" />

	<Cell title="Exit zoom animation" onclick={() => (visible28 = true)} />
	<Toast bind:visible={visible28} outDuration={300} message="The zoom animation time on exit is 300ms" />

	<Cell title="Exit Move out animation" onclick={() => (visible29 = true)} />
	<Toast
		bind:visible={visible29}
		outDuration={300}
		transitionType="fly"
		transitionParams={{ y: -150 }}
		message="When exiting, move out animation time is 300ms"
	/>

	<Cell title="Delayed occurrence" onclick={() => (visible21 = true)} />
	<Toast bind:visible={visible21} transitionParams={{ delay: 1000 }} message="Click for 1 second and then display" />

	<Cell title="top" onclick={() => (visible22 = true)} />
	<Toast bind:visible={visible22} position="top" message="Tips at the top" />

	<Cell title="bottom" onclick={() => (visible23 = true)} />
	<Toast bind:visible={visible23} position="bottom" message="Tips at the bottom" />

	<Cell title="Top increase distance" onclick={() => (visible24 = true)} />
	<Toast bind:visible={visible24} position="top" py="40" message="The tip is at the top and the distance is increased" />

	<Cell title="use Snippet" onclick={useSnippetFun} />
	<Toast bind:visible={visible25} duration={0}>
		<div class="flex flex-col space-y-4">
			<div>Customize the prompt content</div>
			<Loading inverse />
			<div>Close in {time} seconds</div>
		</div>
	</Toast>

	<Cell title="Different styles of rounded corners" onclick={() => (visible26 = true)} />
	<Toast bind:visible={visible26} radius="xl" message="Rounded corners were added" />
</div>

<div class="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
	<div class="flex-1">
		<Button fill="lineTheme" onclick={() => (visible5 = false)}>Manual shutdown</Button>
	</div>
</div>
