<script>
    import { getContext } from 'svelte';
    import Icon from '../icon/Icon.svelte';

    // 名称
    // name
    export let name = '';

    // 文本位置
    // text position
    export let textPosition = 'r';

    // 图标
    // icon
    export let icon = 'default';

    // 选中图标
    // icon checked
    export let iconChecked = 'default';
    const STDF_radioValueStore = getContext('STDF_radioValueContext');
    const STDF_radioHorizontalStore = getContext('STDF_radioHorizontalContext');
    const clickRadioFun = () => {
        STDF_radioValueStore.set(name);
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class={`flex grow active:opacity-80 ${textPosition === 'l' && !$STDF_radioHorizontalStore ? 'justify-between' : ''} ${
        textPosition === 'b' || textPosition === 't'
            ? 'flex-col items-center'
            : $STDF_radioHorizontalStore
            ? 'justify-center'
            : 'items-center'
    }`}
    on:click={clickRadioFun}
>
    {#if textPosition === 'l' || textPosition === 't'}
        <div class={`${textPosition === 'l' && 'mr-0.5'} ${!$STDF_radioHorizontalStore ? 'grow' : ''}`}>
            <slot />
        </div>
    {/if}
    <div class:hidden={$STDF_radioValueStore !== name}>
        {#if iconChecked === 'none'}
            <!-- none -->
        {:else if iconChecked === 'default'}
            <Icon name="ri-radio-button-line" theme top={textPosition === 't' || textPosition === 'b' ? 0 : -1} />
        {:else}
            <Icon {...iconChecked} theme />
        {/if}
    </div>
    <div class:hidden={$STDF_radioValueStore === name}>
        {#if icon === 'none'}
            <!-- none -->
        {:else if icon === 'default'}
            <Icon name="ri-checkbox-blank-circle-line" alpha={0.1} top={textPosition === 't' || textPosition === 'b' ? 0 : -1} />
        {:else}
            <Icon {...icon} alpha={0.1} />
        {/if}
    </div>
    {#if textPosition === 'r' || textPosition === 'b'}
        <div class={`${textPosition === 'r' && 'ml-0.5'} ${!$STDF_radioHorizontalStore ? 'grow' : ''}`}>
            <slot />
        </div>
    {/if}
</div>
