<!-- Radio Demo -->
<script>
    import { RadioGroup, Radio, Divider, Button } from 'stdf';

    const dota = [
        { label: 'Jugg', name: 'Juggernaut', desc: 'The master is a melee agile hero, and he can quickly cut into the battle.' },
        { label: 'SB', name: 'Spirit Breaker', desc: 'Barlason, the soul -cracked man is a powerful Gank -type melee hero.' },
        { label: 'Kotl', name: 'Keeper of the Light', desc: 'Izalo, Guardian of Light, he is a famous auxiliary intellectual hero.' },
        { label: 'Mag', name: 'Magnus', desc: 'Mighty? Why not BAN mighty? Why not BAN mighty?' },
    ];
    let value = dota[0].name;
    const dotaFun = e => {
        value = e.detail;
    };
    const dotaImgs = ['Lina', 'ES', 'Mor', 'Sni', 'SV'];
    const dotaForImgs = ['火女', '小牛', '水人', '火枪', '斯温'];
    let imgValue = dotaImgs[3];
    const dotaImgsFun = e => {
        imgValue = e.detail;
    };
    const dotaVoices = [
        { label: 'karl', name: 'karl', voices: ['"From the great mystery."'] },
        { label: 'Storm', name: 'Storm', voices: ['"Hey ~ Quickly wake up, drink coffee, we are attacked on the tower."'] },
        {
            label: 'Bat',
            name: 'Bat',
            voices: [
                '"Oh, Lina, what about Mrs. My Village?"',
                "'Oh, popular, you don't have to run when you see me.'",
                '"Crystal room woman, you are like a tall cup full of ice water."',
            ],
        },
        { label: 'Tide', name: 'Tide', voices: ['"I can still eat a seaweed."'] },
    ];
    let voiceValue = dotaVoices[0].name;
    const dotaVoicesFun = e => {
        voiceValue = e.detail;
    };
</script>

<div class="px-4">
    <div class="mt-8 mb-4 font-bold text-2xl">Horizontal arrangement</div>
    <div class="mt-6 mb-4 font-bold text-lg">Simple usage</div>
    <RadioGroup {value} horizontal>
        {#each dota as item}
            <Radio name={item.name}>{item.label}</Radio>
        {/each}
    </RadioGroup>

    <div class="mt-8 mb-4 font-bold text-lg">The text is in different places</div>
    <RadioGroup {value} horizontal>
        {#each dota as item}
            <Radio name={item.name} textPosition="l">{item.label}</Radio>
        {/each}
    </RadioGroup>
    <Divider />
    <RadioGroup {value} horizontal>
        {#each dota as item}
            <Radio name={item.name} textPosition="b">{item.label}</Radio>
        {/each}
    </RadioGroup>
    <Divider />
    <RadioGroup {value} horizontal>
        {#each dota as item}
            <Radio name={item.name} textPosition="t">{item.label}</Radio>
        {/each}
    </RadioGroup>

    <div class="mt-8 mb-4 font-bold text-lg">Custom icon</div>
    <RadioGroup value="Juggernaut" horizontal>
        <Radio icon={{ name: 'ri-checkbox-line' }} iconChecked={{ name: 'ri-checkbox-fill' }} name="Juggernaut">Jugg</Radio>
        <Radio icon={{ name: 'ri-checkbox-circle-line' }} iconChecked={{ name: 'ri-checkbox-circle-fill' }} name="Spirit Breaker">SB</Radio>
        <Radio icon={{ name: 'ri-checkbox-multiple-line' }} iconChecked={{ name: 'ri-checkbox-multiple-fill' }} name="Keeper of the Light"
            >Kotl</Radio
        >
        <Radio icon={{ name: 'ri-check-line' }} iconChecked={{ name: 'ri-check-fill' }} name="Magnus">Mag</Radio>
    </RadioGroup>

    <div class="mt-8 mb-4 font-bold text-lg">Picture option</div>
    <RadioGroup value={imgValue} horizontal on:change={dotaImgsFun}>
        {#each dotaImgs as dota, i}
            <Radio
                name={dota}
                textPosition="t"
                icon={{ name: 'ri-arrow-up-s-line' }}
                iconChecked={{ name: 'ri-arrow-up-s-fill', size: 30 }}
            >
                <div class={`w-12 h-12 mb-1 rounded overflow-hidden ${imgValue === dota && 'ring-2 ring-primary dark:ring-dark'}`}>
                    <img class="w-full h-full object-cover" src={`./assets/images/dota_${dotaForImgs[i]}.png`} alt="" />
                </div>
            </Radio>
        {/each}
    </RadioGroup>
    <div class="text-sm">What, are you choosing again <span class="text-[red] font-bold text-lg">{imgValue}！！</span></div>

    <div class="mt-8 mb-4 font-bold text-lg">No icon && use Button</div>
    <RadioGroup {value} horizontal on:change={dotaFun}>
        {#each dota as item}
            <Radio name={item.name} icon="none" iconChecked="none">
                <Button fill={value === item.name ? 'base' : 'lineLight'} heightIn="0">{item.label}</Button>
            </Radio>
        {/each}
    </RadioGroup>

    <div class="mt-8 mb-4 font-bold text-lg">No icon && Customize the selection effect</div>
    <RadioGroup {value} horizontal on:change={dotaFun}>
        {#each dota as item}
            <Radio name={item.name} icon="none" iconChecked="none">
                <div
                    class={`border py-0.5 px-5 text-sm rounded ${
                        value === item.name
                            ? 'text-primary dark:text-dark bg-primary/10 dark:bg-dark/10'
                            : 'bg-gray9 dark:bg-gray4 border-gray8 dark:border-gray5 text-gray6'
                    }`}
                >
                    {item.label}
                </div>
            </Radio>
        {/each}
    </RadioGroup>
</div>
<Divider />
<div class="px-4 pb-8">
    <div class="mb-4 font-bold text-2xl">Longitudinal arrangement</div>
    <div class="mt-8 mb-4 font-bold text-lg">Basic usage</div>
    <RadioGroup {value}>
        {#each dota as item}
            <Radio name={item.name}>{item.label}</Radio>
        {/each}
    </RadioGroup>

    <div class="mt-8 mb-4 font-bold text-lg">Long text option</div>
    <RadioGroup {value}>
        {#each dota as item}
            <Radio name={item.name}>{item.desc}</Radio>
        {/each}
    </RadioGroup>

    <div class="mt-8 mb-4 font-bold text-lg">Text to the left</div>
    <RadioGroup {value}>
        {#each dota as item, i}
            <Radio name={item.name} textPosition="l">
                {item.label}
                {#if i !== dota.length - 1}
                    <div class="h-px mt-1 bg-gray8 dark:bg-gray5" />
                {/if}
            </Radio>
        {/each}
    </RadioGroup>

    <div class="mt-8 mb-4 font-bold text-lg">Complex option && Customize the selection effect</div>
    <RadioGroup value={voiceValue} on:change={dotaVoicesFun}>
        {#each dotaVoices as item, i}
            <Radio name={item.name}>
                <div class={`ml-2 ${voiceValue === item.name ? 'text-primary dark:text-dark' : ''}`}>
                    {item.label}
                    {#each item.voices as voice}
                        <div class="text-xs">{voice}</div>
                    {/each}
                    {#if i !== dotaVoices.length - 1}
                        <div class="h-px mt-1 bg-gray8 dark:bg-gray5" />
                    {/if}
                </div>
            </Radio>
        {/each}
    </RadioGroup>
</div>
