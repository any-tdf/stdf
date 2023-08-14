<script>
    // 填充模式：base/line/lineTheme/text/textTheme/colorLight
    // Fill mode: base/line/lineTheme/text/textTheme/colorLight
    export let fill = 'base';

    // 状态：theme/success/warning/error/info
    // State: theme/success/warning/error/info
    export let state = 'theme';

    // 圆角风格：none/base/xl/full
    // Corner style: none/base/xl/full
    export let radius = 'base';

    // 尺寸：full/big/md/sm/auto
    // Size: full/big/md/sm/auto
    export let size = 'big';

    // 边框风格：solid/dashed/dotted
    // Border style: solid/dashed/dotted
    export let line = 'solid';

    // 注入CSS
    // Inject CSS
    export let injClass = '';

    // 是否开启关爱版
    // Whether to open the care version
    export let love = false;

    // 按钮外部高度
    // Button outer height
    export let heightOut = '2';

    // 按钮高度
    // Button height
    export let heightIn = '3';

    // 是否使用按钮组
    // Whether to use button group
    export let group = false;

    // 是否禁用
    // Whether to disable
    export let disabled = false;

    // 是否自定义大小
    // Whether to customize size
    export let customSize = false;

    // 自定义宽度
    // Custom width
    export let customWidth = 0;

    // 自定义高度
    // Custom height
    export let customHeight = 0;

    // 状态样式
    // State style
    const stateObj = {
        theme: 'bg-primary dark:bg-dark',
        success: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-error',
        info: 'bg-info',
    };

    // 圆角风格样式
    // Corner style style
    const radiusObj = {
        none: 'rounded-none',
        base: 'rounded',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
    };

    // 填充模式样式
    // Fill mode style
    const fillObj = {
        base: '',
        line: 'border border-gray1 dark:border-white !text-black dark:!text-white/90',
        lineLight: 'border border-black/20 dark:border-white/20 !text-black dark:!text-white/90',
        lineTheme: 'border border-primary dark:border-dark !text-primary dark:!text-dark',
        text: '!text-black dark:!text-white/90',
        textTheme: '!text-primary dark:!text-dark',
        colorLight: '!bg-black/5 dark:!bg-white/10 !text-black dark:!text-white',
    };

    // 尺寸样式
    // Size style
    const sizeObj = {
        full: 'w-full',
        big: 'w-full',
        md: 'w-1/2',
        sm: 'w-1/4',
        auto: 'w-auto',
    };

    // 边框风格样式
    // Border style style
    const lineObj = {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
    };

    // 按钮外部高度样式
    // Button outer height style
    const heightOutObj = {
        '0': 'py-0',
        '1': 'py-1',
        '2': 'py-2',
        '3': 'py-3',
        '4': 'py-4',
    };

    // 按钮高度样式
    // Button height style
    const heightInObj = {
        '0': 'py-0',
        '1': 'py-1',
        '2': 'py-2',
        '3': 'py-3',
        '4': 'py-4',
    };

    // 是否块级元素
    $: block = (size === 'full' || size === 'big') && !customSize;

    // 文字颜色
    $: textColor = state === 'theme' ? 'text-white dark:text-black' : 'text-white';
</script>

<div
    class={`${heightOutObj[heightOut] || heightOutObj['2']} ${size === 'big' && !customSize ? 'px-4' : 'px-0'} ${
        block ? 'block' : 'inline'
    } ${love ? 'text-xl' : ''}`}
>
    <button
        on:click
        class={`truncate ${!group && !disabled ? 'active:opacity-80' : ''} ${heightInObj[heightIn] || heightInObj['3']} ${
            sizeObj[size] || sizeObj.big
        } ${textColor} ${lineObj[line] || lineObj.solid} ${radiusObj[radius] || radiusObj.base} ${
            fill === 'base' && (stateObj[state] || stateObj.theme)
        } ${fillObj[fill] || fillObj.base} ${injClass} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        {disabled}
        style={customSize ? `width:${customWidth}px;height:${customHeight}px;padding:0;` : ''}
    >
        <slot />
    </button>
</div>
