<!-- Cell Demo -->
<script>
    import { Cell, CellGroup, Toast } from 'stdf';

    let visible = false;
</script>

<div class="flex flex-col space-y-8 py-8">
    <div>
        <Cell title="基础用法" />
        <Cell title="右侧有详情" detail="归零者" />
        <Cell title="详情使用 Slot" detail="slot">
            <span slot="detail" class="text-primary dark:text-dark text-xs">我是插槽内容</span>
        </Cell>
        <Cell title="右侧无箭头" right="none" />
        <Cell title="点击事件" detail="请点击我" on:click={() => (visible = true)} />
        <Toast bind:visible message="你戳到我了！" />
        <Cell title="右侧有详情无箭头" detail="归零者" right="none" />
        <Cell title="右侧开关（点击整行皆可触发开关）" right={{ type: 'switch' }} />
        <Cell title="开关带详情" detail="解释一下" right={{ type: 'switch' }} />
        <Cell title="开关带文字" right={{ type: 'switch', switch: { inside: ['😭', '😄'] } }} />
        <Cell title="开关全圆角" right={{ type: 'switch', switch: { radius: 'full' } }} />
        <Cell title="左侧使用 Icon 组件" left={{ name: 'ri-bank-line', size: 20, theme: true, top: -2 }} />
        <Cell title="右侧使用 Icon 组件" right={{ type: 'icon', name: 'ri-battery-charge-line', size: 20, theme: true }} />
        <Cell title="左侧自定义图片" left="slot">
            <div slot="left" class="w-6 h-6 mr-1">
                <img class="w-auto" src="/assets/images/icon_颁奖.png" alt="" />
            </div>
        </Cell>
        <Cell title="左右都自定义图片" left="slot" right="slot">
            <div slot="left" class="w-6 h-6 mr-1">
                <img class="w-auto" src="/assets/images/icon_评价.png" alt="" />
            </div>
            <div slot="right" class="w-6 h-6 mr-1">
                <img class="w-auto" src="/assets/images/icon_美食.png" alt="" />
            </div>
        </Cell>
        <Cell title="来张大点的图" left="slot">
            <div slot="left" class="w-10 h-10 mr-1">
                <img class="w-auto" src="/assets/images/icon_会员.png" alt="" />
            </div>
        </Cell>
        <Cell title="左侧有次级标题" subTitle="我是次，但我不次" />
        <Cell title="有次级标题和右侧详情" subTitle="我是次，但我不次" detail="归零者" />
        <Cell title="右侧有次级信息" detail="归零者" info="重启者" />
        <Cell title="左右侧都有次级内容" subTitle="我是次，但我不次" detail="归零者" info="重启者" />
        <Cell title="左右侧都有次级内容" subTitle="我是次，但我不次" detail="再来个箭头" info="重启者" />
        <Cell
            title="右右侧都有次级内容"
            subTitle="左侧再来个 Icon"
            detail="再来个箭头"
            info="重启者"
            left={{ name: 'ri-shopping-basket-line', theme: true }}
        />
        <Cell title="图片什么也来吧" left="slot" subTitle="左侧自定义图片" detail="右侧箭头" info="底部无分割线">
            <div slot="left" class="w-10 h-10 mr-1">
                <img class="w-auto" src="/assets/images/icon_火车票.png" alt="" />
            </div>
        </Cell>
        <Cell
            title="标题超长长长长长长长长长长长长长长长长长长长，自动换行。"
            subTitle="我这个次级标题也很长长长长长长长长长长长长长长长长长长长长长长长长长长。"
        />
        <Cell
            title="左侧自定义大图片，标题超长，自动换行。其余的搭配自己去尝试吧。"
            subTitle="我这个次级标题也很...哦不长了。"
            left="slot"
            line={false}
        >
            <div slot="left" class="w-28 h-6 mr-1">
                <img class="w-auto" src="/assets/images/icon_外卖.png" alt="" />
            </div>
        </Cell>
    </div>

    <CellGroup>
        <Cell title="组合使用" mx="0" my="0" shadow="none" line radius="none" />
        <Cell title="组合使用" mx="0" my="0" shadow="none" radius="none" />
    </CellGroup>
    <CellGroup mx="0" radius="none">
        <Cell title="组合使用" detail="无横向间距" mx="0" my="0" shadow="none" line radius="none" />
        <Cell title="组合使用" detail="无圆角" mx="0" my="0" shadow="none" radius="none" />
    </CellGroup>
    <CellGroup shadow="xl" radius="2xl">
        <Cell title="组合使用" detail="加大投影" mx="0" my="0" shadow="none" line radius="none" />
        <Cell title="组合使用" detail="加大圆角" mx="0" my="0" shadow="none" radius="none" />
    </CellGroup>

    <div>
        <Cell title="左右无间距" mx="0" radius="none" />
        <Cell title="无圆角" radius="none" />
        <Cell title="基础圆角" radius="base" />
        <Cell title="中等圆角" radius="md" />
        <Cell title="大圆角" radius="lg" />
        <Cell title="加大圆角" radius="xl" />
        <Cell title="更大圆角" radius="2xl" />
        <Cell title="全圆角" radius="full" />
        <Cell title="加大投影" shadow="lg" />
    </div>
    <div>
        <Cell title="自定义文字颜色" injClass="text-primary dark:text-dark" />
        <Cell title="自定义背景颜色" injClass="!bg-purple/20 active:!bg-purple/10" line={false} />
    </div>
    <div>
        <Cell love title="关爱版" />
        <Cell love title="关爱版" detail="关爱版" />
        <Cell love title="关爱版" left={{ name: 'ri-hand-heart-line', theme: true }} />
    </div>
</div>
