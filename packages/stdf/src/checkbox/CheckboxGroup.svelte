<script>
    import { setContext, createEventDispatcher } from 'svelte';
    import { writable } from 'svelte/store';

    // 定义事件派发器
    // Define event dispatcher
    const dispatch = createEventDispatcher();

    // 排列方式，h水平 v垂直,inline行内
    // layout type, h horizontal, v vertical, inline inline
    export let layout = 'v';

    // 选中的值
    // checked value
    const STDF_checkboxCheckedsStore = writable([]);

    // 排列方式
    // layout type
    const STDF_checkboxLayoutStore = writable(layout);

    // 传递给子组件的选定值
    // checked value passed to child component
    setContext('STDF_checkboxCheckedsContext', STDF_checkboxCheckedsStore);
    setContext('STDF_checkboxLayoutContext', STDF_checkboxLayoutStore);

    // 监听排列方式变化
    STDF_checkboxCheckedsStore.subscribe(v => {
        dispatch('change', v);
    });
</script>

<div class={`${layout === 'inline' ? '' : `flex ${layout === 'h' ? 'justify-between' : 'flex-col space-y-2'}`}`}>
    <slot />
</div>
