<script>
    //图标名称
    //Icon name
    export let name = '';

    //图标大小
    //Icon size
    export let size = 24;

    //是否跟随主题色
    //Whether to follow the theme color
    export let theme = false;

    //透明度
    //Opacity
    export let alpha = 1;

    //项目存放 symbol.svg 文件的路径
    //The path where the symbol.svg file is stored in the project
    export let path = '/assets/fonts/symbol.svg';

    //偏移量
    //Offset
    export let top = 0;

    //注入CSS
    //Inject CSS
    export let injClass = '';
</script>

<i class={`cursor-pointer inline-block relative ${theme ? 'text-primary dark:text-dark' : ''} ${injClass}`} style="top:{top}px;">
    {#if name === 'slot'}
        <slot><span>无插槽内容！</span></slot>
    {:else}
        <svg width={size} height={size} style="fill: currentColor;fill-opacity :{alpha};display: inline;" viewBox="0 0 512 512">
            <use xlink:href="{path}#{name}" />
        </svg>
    {/if}
</i>
