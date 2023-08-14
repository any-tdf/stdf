<!-- Avatar Demo -->
<script>
    import { Avatar } from '../../../../packages/stdf/components';

    const icons = [
        { icon: { name: 'ri-aliens-fill', theme: true, top: -1, size: 16 }, size: 'xs' },
        { icon: { name: 'ri-user-smile-line', top: -1 }, size: 'sm' },
        { icon: { name: 'ri-shield-user-line', theme: true, top: 0, size: 32 }, size: 'md' },
        { icon: { name: 'ri-emotion-line', theme: true, top: -1, size: 46 }, size: 'lg' },
    ];
</script>

<div class="py-8 px-4">
    <div class="font-bold">不同圆角</div>
    <div class="flex justify-between mt-4 mb-8">
        <Avatar />
        <Avatar radius="none" />
        <Avatar radius="full" />
    </div>
    <div class="flex justify-between mt-4 mb-8">
        <Avatar radius="xl" />
        <Avatar radius="2xl" />
        <Avatar radius="3xl" />
    </div>

    <div class="font-bold">不同图片类型与大小</div>
    <div class="flex justify-between mt-4 mb-8">
        <Avatar image="./assets/images/avatar_2.png" imgSize="s" />
        <Avatar image="./assets/images/avatar_2.png" imgSize="m" />
        <Avatar image="./assets/images/avatar_2.png" />
        <Avatar image="./assets/images/avatar_1.jpg" />
    </div>

    <div class="font-bold">自定义背景色</div>
    <div class="flex justify-between mt-4 mb-8">
        <Avatar image="./assets/images/avatar_2.png" imgSize="m" injClass="!bg-success" />
        <Avatar image="./assets/images/avatar_2.png" imgSize="m" injClass="!bg-[#D65786]" />
        <Avatar image="./assets/images/avatar_2.png" imgSize="m" injClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0] !text-white" />
        <Avatar image="./assets/images/avatar_2.png" imgSize="m" injClass="!bg-[rgba(0,0,0,0)]" />
    </div>

    <div class="font-bold">不同边框</div>
    <div class="flex justify-between mt-4 mb-8">
        <Avatar image="./assets/images/avatar_2.png" imgSize="m" line="solid" />
        <Avatar image="./assets/images/avatar_2.png" imgSize="m" line="dashed" />
        <Avatar image="./assets/images/avatar_2.png" imgSize="m" line="dotted" />
        <Avatar image="./assets/images/avatar_2.png" imgSize="m" line="solid" injClass="border-[red] dark:border-[green]" />
    </div>

    <div class="font-bold">替换文本</div>
    <div class="flex justify-between mt-4 mb-8">
        <Avatar alt="张" altSize="xs" />
        <Avatar alt="张" altSize="sm" />
        <Avatar alt="张" />
        <Avatar alt="张" altSize="lg" />
    </div>

    <div class="font-bold">替换 Icon</div>
    <div class="flex justify-between mt-4 mb-8">
        {#each icons as icon}
            <Avatar icon={icon.icon} size={icon.size} />
        {/each}
    </div>

    <div class="font-bold">不同大小</div>
    <div class="flex justify-between">
        <div class="flex flex-col items-center space-y-4 mt-4 mb-8">
            <Avatar size="xs" icon={{ name: 'ri-bear-smile-line', size: 16, theme: true }} />
            <Avatar size="sm" image="./assets/images/avatar_1.jpg" />
            <Avatar line="solid" />
            <Avatar size="lg" image="./assets/images/avatar_2.png" imgSize="m" />
            <Avatar size="xl" alt="张" altSize="xl" />
        </div>
        <div class="flex flex-col items-center space-y-4 mt-4 mb-8">
            <Avatar radius="full" size="xs" icon={{ name: 'ri-bear-smile-line', size: 16, theme: true }} />
            <Avatar radius="full" size="sm" image="./assets/images/avatar_1.jpg" />
            <Avatar radius="full" line="solid" />
            <Avatar radius="full" size="lg" image="./assets/images/avatar_2.png" imgSize="m" />
            <Avatar radius="full" size="xl" alt="张" altSize="xl" />
        </div>
    </div>
</div>
