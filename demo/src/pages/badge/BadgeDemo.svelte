<!-- Badge Demo -->
<script>
    import { Badge, Avatar, Button, Icon, Input, Cell } from '../../../../packages/stdf';

    let isShow = true;
    const changeShowFun = () => {
        isShow = !isShow;
    };
</script>

<div class="pt-1 pb-4">
    <div class="mx-4 mt-8 font-bold text-lg">基础用法</div>
    <div class="p-4 flex justify-around">
        <Badge>
            <Avatar />
        </Badge>
        <Badge text="24">
            <Avatar />
        </Badge>
        <Badge text="99+">
            <Avatar />
        </Badge>
        <Badge text="New">
            <Avatar />
        </Badge>
    </div>

    <div class="mx-4 mt-8 font-bold text-lg">不同圆角</div>
    <div class="p-4 flex justify-around">
        <Badge radius="base">
            <Avatar />
        </Badge>
        <Badge text="24" radius="none">
            <Avatar />
        </Badge>
        <Badge text="24" radius="base">
            <Avatar />
        </Badge>
        <Badge text="Hot" radius="leaf">
            <Avatar />
        </Badge>
    </div>

    <div class="mx-4 mt-8 font-bold text-lg">位于左侧</div>
    <div class="p-4 flex justify-around">
        <Badge isLeft>
            <Avatar />
        </Badge>
        <Badge isLeft text="24">
            <Avatar />
        </Badge>
        <Badge isLeft text="24" radius="leaf">
            <Avatar />
        </Badge>
        <Badge isLeft text="厉害">
            <Avatar />
        </Badge>
    </div>

    <div class="mx-4 mt-8 font-bold text-lg">搭配其他组件</div>
    <div class="p-4 flex justify-around">
        <Badge text="帅" radius="leaf">
            <Icon name="ri-spy-fill" />
        </Badge>
        <Badge text="棒" radius="leaf">
            <Icon name="ri-medal-fill" />
        </Badge>
        <Badge text="Happy" radius="leaf" offsetX={-12}>
            <Icon name="ri-cake-2-fill" />
        </Badge>
    </div>
    <Badge text="Hot" offsetX={18} offsetY={8}>
        <Button>搭配 Button</Button>
    </Badge>
    <Badge text="必填" offsetX={18} offsetY={26}>
        <Input title="搭配 Input" />
    </Badge>
    <Cell title="搭配 Cell" detail="slot">
        <span slot="detail"><Badge isInner /></span>
    </Cell>
    <Cell title="搭配 Cell" detail="slot" line={false}>
        <span slot="detail"><Badge text="99+" isInner /></span>
    </Cell>
    <Cell title="搭配无圆角 Cell" detail="slot" radius="none">
        <span slot="detail"><Badge text="新版本" radius="base" isInner /></span>
    </Cell>
    <Cell title="搭配全圆角 Cell" detail="slot" radius="full">
        <span slot="detail"><Badge isInner /></span>
    </Cell>

    <div class="mx-4 mt-8 font-bold text-lg">徽标动画</div>
    <div class="p-4 flex justify-around">
        <Badge {isShow}>
            <Avatar />
        </Badge>
        <Badge text="24" {isShow}>
            <Avatar />
        </Badge>
        <Badge text="24" radius="base" {isShow}>
            <Avatar />
        </Badge>
        <Badge text="Hot" radius="leaf" {isShow}>
            <Avatar />
        </Badge>
    </div>
    <Cell title={!isShow ? '隐藏' : '显示'} detail="slot">
        <span slot="detail"><Badge isInner {isShow} /></span>
    </Cell>
    <Button on:click={changeShowFun}>点击{isShow ? '隐藏' : '显示'}徽标</Button>

    <div class="mx-4 mt-8 font-bold text-lg">自定义背景色与边框</div>
    <div class="p-4 flex justify-around">
        <Badge text="Theme" injClass="!bg-primary dark:!bg-dark text-white dark:text-black">
            <Avatar />
        </Badge>
        <Badge text="New" injClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0]">
            <Avatar />
        </Badge>
        <Badge radius="base" injClass="ring-2 ring-[#ebeef2] dark:ring-[#414248]">
            <Avatar image="./assets/images/avatar_1.jpg" />
        </Badge>
        <Badge offsetX={9} offsetY={9} injClass="ring-2 ring-[#ebeef2] dark:ring-[#414248]">
            <Avatar radius="full" image="./assets/images/avatar_1.jpg" />
        </Badge>
    </div>
</div>
