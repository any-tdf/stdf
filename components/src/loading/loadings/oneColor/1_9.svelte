<script>
    export let theme = false;
    export let inverse = false;
    export let size = 'w-8 h-8';
    export let customColor = []; //自定义颜色
    export let speed = 1; //速度系数，基础为1，数值越大，速度越快

    const colorClass = () => {
        if (inverse) {
            return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
        } else {
            return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
        }
    };
</script>

<div class={`relative ${size} m-auto`}>
    {#each new Array(3) as item, i}
        <div
            class={`absolute${colorClass()} w-1/3 h-1/3 rounded-full loading`}
            style="animation-delay: {i - 2}s;background: {customColor[0]};animation-duration: {1.5 /
                speed}s;-webkit-animation-duration: {1.5 / speed}s;"
        />
    {/each}
</div>

<style>
    .loading {
        animation: loading 1.5s linear infinite;
    }

    @keyframes loading {
        0% {
            transform: translate(200%, 200%);
        }
        25% {
            transform: translate(0, 200%);
        }
        50% {
            transform: translate(0, 0);
        }
        75% {
            transform: translate(200%, 0);
        }
        100% {
            transform: translate(200%, 200%);
        }
    }
</style>
