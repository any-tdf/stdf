<script>
    import { createEventDispatcher } from 'svelte';

    // 定义事件派发器
    // Define event dispatcher
    const dispatch = createEventDispatcher();

    export let active = false;

    export let radius = 'md'; // 'base'/'md'/'lg'/'xl'/'full'/'none'

    export let type = 'border'; // 'border'/'block'/'bold'

    const typeClass = {
        border: 'border-primary dark:border-dark text-primary dark:text-dark',
        block: 'bg-primary text-white dark:bg-dark dark:text-black',
        bold: 'font-bold text-primary dark:text-dark border-transparent',
    };

    const radiusClass = {
        base: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
        none: 'rounded-none',
    };

    const clickFunc = () => {
        active = !active;
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    on:click
    class="flex-1 py-2 border cursor-pointer {active
        ? typeClass[type] || typeClass.border
        : 'border-transparent' + (type === 'bold' ? ' opacity-50' : '')} {radiusClass[radius] || radiusClass.base}"
>
    <slot />
</div>
