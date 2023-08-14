<script>
    import Icon from '../icon/Icon.svelte';

    // Skeleton类型，支持div、p、img、video、code、qrcode、barcode。
    // Skeleton type, support div, p, img, video, code, qrcode, barcode.
    export let type = 'div';
    export let width = '6';
    export let height = '6';
    export let radius = 'base';
    export let padding = '1';
    export let lines = 3;
    export let iconRatio = 0.6;

    const radiusObj = {
        none: ' rounded-none',
        base: ' rounded',
        md: ' rounded-md',
        xl: ' rounded-xl',
        '2xl': ' rounded-2xl',
        '3xl': ' rounded-3xl',
        full: ' rounded-full',
    };
    const widthObj = {
        full: ' w-full',
        '2': ' w-2',
        '4': ' w-4',
        '6': ' w-6',
        '8': ' w-8',
        '12': ' w-12',
        '16': ' w-16',
        '24': ' w-24',
        '32': ' w-32',
        '48': ' w-48',
        '64': ' w-64',
        '96': ' w-96',
    };
    const heightObj = {
        '1': ' h-1',
        '2': ' h-2',
        '4': ' h-4',
        '6': ' h-6',
        '8': ' h-8',
        '12': ' h-12',
        '16': ' h-16',
        '24': ' h-24',
        '32': ' h-32',
        '48': ' h-48',
        '64': ' h-64',
        '96': ' h-96',
    };
    const paddingObj = {
        '0.5': ' p-0.5',
        '1': ' p-1',
        '2': ' p-2',
        '4': ' p-4',
    };
    const randomArr = ['w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-3/4', 'w-2/5', 'w-3/5', 'w-4/5', 'w-5/6'];
    const typeIconFun = type => {
        switch (type) {
            case 'img':
                return 'ri-image-2-fill';
            case 'video':
                return 'ri-movie-2-fill';
            case 'code':
                return 'ri-code-box-fill';
            case 'qrcode':
                return 'ri-qr-code-fill';
            case 'barcode':
                return 'ri-barcode-fill';
            default:
                return 'ri-qr-code-fill';
        }
    };
</script>

<div class={`animate-pulse ${type === 'p' || width === 'full' ? 'block' : 'inline-block'}${paddingObj[padding] || paddingObj['1']}`}>
    {#if type === 'p'}
        <div class="flex flex-col space-y-2">
            {#each new Array(lines - 1) as item}
                <div class={`bg-gray7 dark:bg-gray6 w-full${heightObj[height] || heightObj['6']}${radiusObj[radius] || radiusObj.base}`} />
            {/each}
            <div
                class={`bg-gray7 dark:bg-gray6 ${randomArr[Math.floor(Math.random() * randomArr.length)]}${
                    heightObj[height] || heightObj['6']
                }${radiusObj[radius] || radiusObj.base}`}
            />
        </div>
    {:else}
        <div
            class={`bg-gray7 dark:bg-gray6${widthObj[width] || widthObj.full}${heightObj[height] || heightObj['6']}${
                radiusObj[radius] || radiusObj.base
            } flex justify-center`}
        >
            {#if type === 'img' || type === 'video' || type === 'code' || type === 'qrcode' || type === 'barcode'}
                <div class={`m-auto`} style="width:{iconRatio * 100 + '%'}">
                    <Icon name={typeIconFun(type)} size="100%" alpha={0.2} />
                </div>
            {/if}
        </div>
    {/if}
</div>
