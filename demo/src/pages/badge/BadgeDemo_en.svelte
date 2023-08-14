<!-- Badge Demo -->
<script>
    import { Badge, Avatar, Button, Icon, Input, Cell } from '../../../../packages/stdf/components';

    let isShow = true;
    const changeShowFun = () => {
        isShow = !isShow;
    };
</script>

<div class="pt-1 pb-4">
    <div class="mx-4 mt-8 font-bold text-lg">Basic usage</div>
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

    <div class="mx-4 mt-8 font-bold text-lg">Different rounded corners</div>
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

    <div class="mx-4 mt-8 font-bold text-lg">Located on the left</div>
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
        <Badge isLeft text="sharp">
            <Avatar />
        </Badge>
    </div>

    <div class="mx-4 mt-8 font-bold text-lg">Match other components</div>
    <div class="p-4 flex justify-around">
        <Badge text="Cool" radius="leaf" offsetX={-6}>
            <Icon name="ri-spy-fill" />
        </Badge>
        <Badge text="Great" radius="leaf" offsetX={-10}>
            <Icon name="ri-medal-fill" />
        </Badge>
        <Badge text="Happy" radius="leaf" offsetX={-12}>
            <Icon name="ri-cake-2-fill" />
        </Badge>
    </div>
    <Badge text="Hot" offsetX={18} offsetY={8}>
        <Button>Match Button</Button>
    </Badge>
    <Badge text="Required" offsetX={30} offsetY={26}>
        <Input title="Match Input" />
    </Badge>
    <Cell title="Match Cell" detail="slot">
        <span slot="detail"><Badge isInner /></span>
    </Cell>
    <Cell title="Match Cell" detail="slot" line={false}>
        <span slot="detail"><Badge text="99+" isInner /></span>
    </Cell>
    <Cell title="Match no radius corner Cell" detail="slot" radius="none">
        <span slot="detail"><Badge text="new version" radius="base" isInner /></span>
    </Cell>
    <Cell title="Match full radius Cell" detail="slot" radius="full">
        <span slot="detail"><Badge isInner /></span>
    </Cell>

    <div class="mx-4 mt-8 font-bold text-lg">Badge animation</div>
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
    <Cell title={!isShow ? 'Hidden' : 'Show'} detail="slot">
        <span slot="detail"><Badge isInner {isShow} /></span>
    </Cell>
    <Button on:click={changeShowFun}>Click {isShow ? 'Hidden' : 'Show'} Badge</Button>

    <div class="mx-4 mt-8 font-bold text-lg">Custom background color and border</div>
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
