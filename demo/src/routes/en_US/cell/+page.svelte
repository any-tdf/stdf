<!-- Cell Demo -->
<script>
	import { Cell, CellGroup, Toast } from '../../../../../packages/stdf/components';

	let visible = false;
</script>

<div class="flex flex-col space-y-8 py-8">
	<div>
		<Cell title="Basic usage" />
		<Cell title="There are details on the right are details on the right" detail="Zero" />
		<Cell title="Use for details Slot" detail="slot">
			<span slot="detail" class="text-primary dark:text-dark text-xs">I am a slot content</span>
		</Cell>
		<Cell title="There is no arrow on the right" right="none" />
		<Cell title="Pure display, no click effect" right="none" clickAll={false} />
		<Cell title="Click event" detail="Please click me" on:click={() => (visible = true)} />
		<Toast bind:visible message="You poke to me!" />
		<Cell title="There are details on the right without arrows" detail="Zero" right="none" />
		<Cell title="The right switch (click the whole line to trigger the switch)" right={{ type: 'switch' }} />
		<Cell title="Switch with details" detail="explain" right={{ type: 'switch' }} />
		<Cell title="Switch with text" right={{ type: 'switch', switch: { inside: ['😭', '😄'] } }} />
		<Cell title="Switch full round corner" right={{ type: 'switch', switch: { radius: 'full' } }} />
		<Cell title="Just click on the switch to trigger" clickAll={false} right={{ type: 'switch' }} />
		<Cell title="Use on the left Icon" left={{ name: 'ri-bank-line', size: 20, theme: true, top: -2 }} />
		<Cell title="Use on the right side Icon" right={{ type: 'icon', name: 'ri-battery-charge-line', size: 20, theme: true }} />
		<Cell title="Left custom picture" left="slot">
			<div slot="left" class="mr-1 shrink-0">
				<img class="w-6 h-6" src="/assets/images/icon_颁奖.png" alt="" />
			</div>
		</Cell>
		<Cell title="Custom pictures are all left and right" left="slot" right="slot">
			<div slot="left" class="mr-1 shrink-0">
				<img class="w-6 h-6" src="/assets/images/icon_评价.png" alt="" />
			</div>
			<div slot="right" class="mr-1 shrink-0">
				<img class="w-6 h-6" src="/assets/images/icon_美食.png" alt="" />
			</div>
		</Cell>
		<Cell title="Come to a big picture" left="slot">
			<div slot="left" class="mr-1 shrink-0">
				<img class="w-10 h-10" src="/assets/images/icon_会员.png" alt="" />
			</div>
		</Cell>
		<Cell title="There is a secondary title on the left" subTitle="I am, but I am not second" />
		<Cell title="There are secondary title and right details" subTitle="I am, but I am not second" detail="Zero" />
		<Cell title="There is secondary information on the right" detail="Zero" info="Restart" />
		<Cell
			title="There are secondary content on the left and right sides"
			subTitle="I am, but I am not second"
			detail="Zero"
			info="Restart"
		/>
		<Cell
			title="There are secondary content on the left and right sides"
			subTitle="I am, but I am not second"
			detail="Come again"
			info="Restart"
		/>
		<Cell
			title="There are secondary content on the right and right"
			subTitle="Come again on the left Icon"
			detail="Come again"
			info="Restart"
			left={{ name: 'ri-shopping-basket-line', theme: true }}
		/>
		<Cell
			title="Come on the picture too"
			left="slot"
			subTitle="Left custom picture"
			detail="Right arrow"
			info="There is no segmentation line at the bottom"
		>
			<div slot="left" class="mr-1 shrink-0">
				<img class="w-10 h-10" src="/assets/images/icon_火车票.png" alt="" />
			</div>
		</Cell>
		<Cell
			title="The title is long, long, long, long, long, long, long, long, long, long, long, long, long, long, and long, and automatically changed."
			subTitle="My secondary title is also very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long, long, long."
		/>
		<Cell
			title="The big picture on the left is a big picture, the title is super long, and it is automatically changed. Try the rest of the match."
			subTitle="My secondary title is also very good...Oh not long."
			left="slot"
			line={false}
		>
			<div slot="left" class="mr-1 shrink-0">
				<img class="w-20 h-20" src="/assets/images/icon_外卖.png" alt="" />
			</div>
		</Cell>
	</div>

	<CellGroup>
		<Cell title="Group" mx="0" my="0" shadow="none" line radius="none" />
		<Cell title="Group" mx="0" my="0" shadow="none" radius="none" />
	</CellGroup>
	<CellGroup mx="0" radius="none">
		<Cell title="Group" detail="No horizontal spacing" mx="0" my="0" shadow="none" line radius="none" />
		<Cell title="Group" detail="Non rounded" mx="0" my="0" shadow="none" radius="none" />
	</CellGroup>
	<CellGroup shadow="xl" radius="2xl">
		<Cell title="Group" detail="Increase projection" mx="0" my="0" shadow="none" line radius="none" />
		<Cell title="Group" detail="Increase the corner" mx="0" my="0" shadow="none" radius="none" />
	</CellGroup>

	<div>
		<Cell title="Left -right distance" mx="0" radius="none" />
		<Cell title="Non -rounded" radius="none" />
		<Cell title="Basic rounded corner" radius="base" />
		<Cell title="Medium corner" radius="md" />
		<Cell title="Large rounded corner" radius="lg" />
		<Cell title="Increase the corner" radius="xl" />
		<Cell title="Larger corner" radius="2xl" />
		<Cell title="All -rounded corner" radius="full" />
		<Cell title="Increase projection" shadow="lg" />
	</div>
	<div>
		<Cell title="Custom text color" injClass="text-primary dark:text-dark" />
		<Cell title="Custom background color" injClass="!bg-purple/20 active:!bg-purple/10" line={false} />
	</div>
	<div>
		<Cell love title="Love version" />
		<Cell love title="Love version" detail="Love version" />
		<Cell love title="Love version" left={{ name: 'ri-hand-heart-line', theme: true }} />
	</div>
</div>
