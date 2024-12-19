export type MenuListChild = {
	title: string;
	title_zh: string;
	title_en: string;
	nav: string;
	tip: string;
	tip_en: string;
	alias: string;
};
export type MenuList = { class: string; class_en: string; childs: MenuListChild[] };

export const menuList: MenuList[] = [
	{
		class: '通用',
		class_en: 'Universal',
		childs: [
			{
				title: '按钮 Button',
				title_zh: '按钮',
				title_en: 'Button',
				nav: 'button',
				tip: '按下它，让世界变得更美好吧。',
				tip_en: 'Press it and make the world a better place.',
				alias: 'button|按钮'
			},
			{
				title: '底部浮窗 BottomSheet',
				title_zh: '底部浮窗',
				title_en: 'BottomSheet',
				nav: 'bottomSheet',
				tip: '浮窗犹如小偷，突然出现让你焦灼，却也能唤起你的警觉。',
				tip_en: 'The floating window is like a thief, suddenly appearing to make you anxious, but it can also arouse your alertness.',
				alias:
					'bottomSheet|底部浮窗 | 底部 | 底|部 | 浮窗|bottomSheet 底部浮窗|bottomSheet 底部浮窗 | 底部弹窗|bottomSheet 底部弹窗|bottomSheet 底部弹窗 | 底部弹出框|bottomSheet 底部弹出框|bottomSheet 底部弹出框 | 底部弹出层|bottomSheet 底部弹出层|bottomSheet 底部弹出层'
			},
			{
				title: '图标 Icon',
				title_zh: '图标',
				title_en: 'Icon',
				nav: 'icon',
				tip: '使用 SVG Sprites，请参照指南引入与使用。',
				tip_en: 'Use SVG Sprites, please refer to the guide to import and use.',
				alias: 'icon|图标|svg'
			},
			{
				title: '遮罩 Mask',
				title_zh: '遮罩',
				title_en: 'Mask',
				nav: 'mask',
				tip: '遮罩虽能掩盖身形，却无法掩藏内心。',
				tip_en: 'Although the mask can cover the figure, it cannot hide the heart.',
				alias: 'mask|遮罩 | 遮|罩|mask 遮罩|mask 遮罩 | 遮罩层|mask 遮罩层|mask 遮罩层|Overlay|maskOverlay|mask Overlay'
			},
			{
				title: '弹出层 Popup',
				title_zh: '弹出层',
				title_en: 'Popup',
				nav: 'popup',
				tip: '机会就像弹珠，只有你努力地推它，它才会弹出来。',
				tip_en: 'Opportunity is like a marble, only if you push it hard, it will pop out.',
				alias:
					'popup|弹出层 | 弹出 | 弹|出 | 层|popup 弹出层|popup 弹出层 | 弹窗|popup 弹窗|popup 弹窗 | 弹出框|popup 弹出框|popup 弹出框 | 弹出层|popup 弹出层|popup 弹出层'
			}
		]
	},
	{
		class: '布局',
		class_en: 'Layout',
		childs: [
			{
				title: '分割线 Divider',
				title_zh: '分割线',
				title_en: 'Divider',
				nav: 'divider',
				tip: '分开的日子越久，最初的喜悦越发淡薄。',
				tip_en: 'The longer the days are separated, the more the initial joy fades.',
				alias: 'divider|分割线 | 分割|line'
			},
			{
				title: '网格 Grids',
				title_zh: '网格',
				title_en: 'Grids',
				nav: 'grids',
				tip: '可是怎么说，总觉得，我们之间留了太多空白格。',
				tip_en: 'How can I say, I always feel that there are too many blank grids between us.',
				alias: 'grids|网格|grid|row|col|column'
			},
			{
				title: '占位符 Placeholder',
				title_zh: '占位符',
				title_en: 'Placeholder',
				nav: 'placeholder',
				tip: '人生重要的不是所站的位置，而是所朝的方向。',
				tip_en: 'What is important in life is not the position you stand, but the direction you face.',
				alias: 'placeholder|占位符 | 占位'
			},
			{
				title: '骨架屏 Skeleton',
				title_zh: '骨架屏',
				title_en: 'Skeleton',
				nav: 'skeleton',
				tip: '骨架是支撑身体的关键，而人生信念则是支撑生命的骨架。',
				tip_en: 'The skeleton is the key to supporting the body, and the belief in life is the skeleton that supports life.',
				alias: 'skeleton|骨架屏 | 骨架'
			}
		]
	},
	{
		class: '导航',
		class_en: 'Navigation',
		childs: [
			{
				title: '索引栏 IndexBar',
				title_zh: '索引栏',
				title_en: 'IndexBar',
				nav: 'indexBar',
				tip: '你不迷途知返，我怎么给你以索引？',
				tip_en: "If you don't know the way back, how can I give you an index?",
				alias: 'indexBar|索引栏|indexbar|index|bar|索引|index 栏 | 索引条|index 条|index 条'
			},
			{
				title: '导航栏 NavBar',
				title_zh: '导航栏',
				title_en: 'NavBar',
				nav: 'navBar',
				tip: '没有指引，在黑暗中只能乱撞。',
				tip_en: 'Without guidance, you can only bump in the dark.',
				alias: 'navBar|导航栏|navbar|nav|bar|导航|nav-bar|nav bar'
			},
			{
				title: '分页 Pagination',
				title_zh: '分页',
				title_en: 'Pagination',
				nav: 'pagination',
				tip: '人生就像一部电影，不论多么精彩，也有谢幕的时候。',
				tip_en: 'Life is like a movie, no matter how wonderful it is, there is a curtain call.',
				alias: 'pagination|分页|page|分 | 页|pagination 分页|pagination 分页|page 分页|page 分页'
			},
			{
				title: '步骤条 Steps',
				title_zh: '步骤条',
				title_en: 'Steps',
				nav: 'steps',
				tip: '人生没有白走的路，每一步都算数。',
				tip_en: 'Life has no wasted steps, every step counts.',
				alias: 'steps|step|步骤条 | 步骤|step 条|step 条 | 步骤栏|step 栏|step 栏'
			},
			{
				title: '标签栏 TabBar',
				title_zh: '标签栏',
				title_en: 'TabBar',
				nav: 'tabBar',
				tip: '看脚下一片黑暗，望头顶星光璀璨。',
				tip_en: "Looking down, it's all darkness; looking up, the stars are shining brightly.",
				alias: 'tabBar|标签栏|tabbar|tab|bar|标签|tab 栏'
			},
			{
				title: '标签页 Tabs',
				title_zh: '标签页',
				title_en: 'Tabs',
				nav: 'tabs',
				tip: '偶尔隐藏，是为了在合适的时候更好地绽放。',
				tip_en: 'Occasionally hide, it is to bloom better at the right time.',
				alias: 'tabs|tab|标签页 | 标签|tab 页'
			}
		]
	},
	{
		class: '数据输入',
		class_en: 'Data entry',
		childs: [
			{
				title: '动作面板 ActionSheet',
				title_zh: '动作面板',
				title_en: 'ActionSheet',
				nav: 'actionSheet',
				tip: '我的世界只有一个选项，就是你。',
				tip_en: 'There is only one option in my world, and that is you.',
				alias:
					'actionSheet|动作面板 | 动作 | 动|作 | 面板|actionSheet 动作面板|actionSheet 动作面板 | 动作面板|actionSheet 动作面板|actionSheet 动作面板 | 动作面板|actionSheet 动作面板|actionSheet 动作面板'
			},
			{
				title: '异步选择器 AsyncPicker',
				title_zh: '异步选择器',
				title_en: 'AsyncPicker',
				nav: 'asyncPicker',
				tip: '错过的话，就请错过一辈子吧！',
				tip_en: 'If you miss it, please miss it for a lifetime!',
				alias: 'asyncPicker|异步选择器 | 异步|asyncPicker 异步选择器|asyncPicker 异步选择器|async picker|asyncpicker|异步 picker|异步 picker'
			},
			{
				title: '日历 Calendar',
				title_zh: '日历',
				title_en: 'Calendar',
				nav: 'calendar',
				tip: '在无人问津日子里，正是登峰造极的好时机。',
				tip_en: 'In the days when no one cares, it is a good time to reach the peak.',
				alias:
					'calendar|日历 | 日|历|calendar 日历|calendar 日历 | 日期|calendar 日期|calendar 日期 | 周选择|calendar 周选择|calendar 周选择 | 周|calendar 周|calendar 周 | 日期区间 | 月选择 | 日期范围选择'
			},
			{
				title: '复选框 Checkbox',
				title_zh: '复选框',
				title_en: 'Checkbox',
				nav: 'checkbox',
				tip: '要么全不，要么全部。',
				tip_en: 'Either all or none.',
				alias:
					'checkbox|复选框 | 复选|checkbox 复选框|checkbox 复选框 | 复选按钮|checkbox 复选按钮|checkbox 复选按钮 | 多选框 | 多选|checkbox 多选框|checkbox 多选框 | 多选按钮|checkbox 多选按钮|checkbox 多选按钮'
			},
			{
				title: '输入框 Input',
				title_zh: '输入框',
				title_en: 'Input',
				nav: 'input',
				tip: '对方正在输入......',
				tip_en: 'The other party is typing...',
				alias:
					'input|输入框 | 输入|input 输入框|input 输入框|Textarea|textarea|文本域 | 文本框 | 文本|textarea 文本域|textarea 文本域 | 多行输入框 | 多行输入 | 多行|textarea 多行输入框|textarea 多行输入框'
			},
			{
				title: '数字键盘 NumKeyboard',
				title_zh: '数字键盘',
				title_en: 'NumKeyboard',
				nav: 'numKeyboard',
				tip: '3 0624700 | 3 0624770 | 5 34202 13942 | 4314 0624',
				tip_en: '3 0624700 | 3 0624770 | 5 34202 13942 | 4314 0624',
				alias:
					'numKeyboard|数字键盘 | 数字 | 键盘|numKeyboard 数字键盘|numKeyboard 数字键盘 | 金额键盘|numKeyboard 金额键盘|numKeyboard 金额键盘|number|keyboard|amount|money|'
			},
			{
				title: '选择器 Picker',
				title_zh: '选择器',
				title_en: 'Picker',
				nav: 'picker',
				tip: '采摘花瓣时，你得不到花的美丽。',
				tip_en: 'When you pick petals, you don’t get the beauty of the flower.',
				alias: 'picker|选择器 | 选择|picker 选择器|picker 选择器'
			},
			{
				title: '单选框 Radio',
				title_zh: '单选框',
				title_en: 'Radio',
				nav: 'radio',
				tip: '如果要在正确和善良中选择一个，请选择善良。',
				tip_en: 'If you have to choose between right and good, choose good.',
				alias: 'radio|单选框 | 单选|radio 单选框|radio 单选框 | 单选按钮|radio 单选按钮|radio 单选按钮'
			},
			{
				title: '评分 Rate',
				title_zh: '评分',
				title_en: 'Rate',
				nav: 'rate',
				tip: '散场时，对方剩余的手机电量，就是这场约会的评分。',
				tip_en: 'At the end of the game, the remaining battery power of the other party is the score of this date.',
				alias: 'rate|评分 | 评|分|rate 评分|rate 评分'
			},
			{
				title: '滑块 Slider',
				title_zh: '滑块',
				title_en: 'Slider',
				nav: 'slider',
				tip: '请滑动解锁您的烦恼。',
				tip_en: 'Please slide to unlock your troubles.',
				alias: 'slider|滑块 | 滑|块|slider 滑块|slider 滑块'
			},
			{
				title: '开关 Switch',
				title_zh: '开关',
				title_en: 'Switch',
				nav: 'switch',
				tip: '死亡是一个开关，活着却是一根绳索。',
				tip_en: 'Death is a switch, but life is a rope.',
				alias: 'switch|开关 | 开|关|switch 开关|switch 开关'
			},
			{
				title: '步进器 Stepper',
				title_zh: '步进器',
				title_en: 'Stepper',
				nav: 'stepper',
				tip: '人生如同诗行，或进或退皆成章。保持心灵节奏，生命之诗韵味悠长。',
				tip_en:
					'Life is like a poem, advancing or retreating all form chapters. Maintain the rhythm of the soul, and the poetic flavor of life will last long.',
				alias: 'stepper|步进器 | 步|进 | 器|stepper 步进器|stepper 步进器'
			},
			{
				title: '时间选择器 TimePicker',
				title_zh: '时间选择器',
				title_en: 'TimePicker',
				nav: 'timePicker',
				tip: '死亡不是失去生命，而是走出了时间的枷锁。',
				tip_en: 'Death is not the loss of life, but the release of the shackles of time.',
				alias:
					'timePicker|时间选择器 | 时间|timePicker 时间选择器|timePicker 时间选择器|time picker|timepicker|时间 picker|时间 picker|日期选择器 | 日期|datePicker 日期选择器|datePicker 日期选择器|date picker|datepicker|日期 picker|日期 picker'
			}
		]
	},
	{
		class: '信息展示',
		class_en: 'Info display',
		childs: [
			{
				title: '头像 Avatar',
				title_zh: '头像',
				title_en: 'Avatar',
				nav: 'avatar',
				tip: '其实我发给您的头像，是情侣头像...',
				tip_en: 'Actually, the avatar I sent to you is a couple avatar...',
				alias: 'avatar|头像 | 头|像|avatar 头像|avatar 头像'
			},
			{
				title: '徽标 Badge',
				title_zh: '徽标',
				title_en: 'Badge',
				nav: 'badge',
				tip: '在标记消失之前，回到我身边。',
				tip_en: 'Before the mark disappears, come back to me.',
				alias: 'badge|徽标 | 徽|标|badge 徽标|badge 徽标 | 标记|badge 标记|badge 标记'
			},
			{
				title: '单元格 Cell',
				title_zh: '单元格',
				title_en: 'Cell',
				nav: 'cell',
				tip: '当全世界抛弃您的时候请记住，您身上有几亿细胞都在为你而活。',
				tip_en: 'When the whole world abandons you, remember that there are billions of cells on your body that are living for you.',
				alias: 'cell|单元格 | 单元|cell 单元格|cell 单元格'
			},
			{
				title: '通告栏 NoticeBar',
				title_zh: '通告栏',
				title_en: 'NoticeBar',
				nav: 'noticeBar',
				tip: '我方开放地下城，这是告知，不是商量。',
				tip_en: 'Our side opens the dungeon, this is to inform, not to discuss.',
				alias:
					'noticeBar|通告栏 | 通告 | 通|栏|noticeBar 通告栏|noticeBar 通告栏 | 通知栏|noticeBar 通知栏|noticeBar 通知栏 | 公告栏|noticeBar 公告栏|noticeBar 公告栏'
			},
			{
				title: '进度条 Progress',
				title_zh: '进度条',
				title_en: 'Progress',
				nav: 'progress',
				tip: '好运进度：▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
				tip_en: 'Good luck progr: ▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
				alias: 'progress|进度条 | 进度 | 进|度|progress 进度条|progress 进度条'
			},
			{
				title: '进度环 ProgressLoop',
				title_zh: '进度环',
				title_en: 'ProgressLoop',
				nav: 'progressLoop',
				tip: '人生不是一个完美的圆环，一旦完美，你就再没有任何可能性。',
				tip_en: 'Life is not a perfect circle. Once perfect, you have no possibility.',
				alias:
					'progressLoop|进度环 | 进度 | 进|度|progressLoop 进度环|progressLoop 进度环 | 环形进度条|progressLoop 环形进度条|progressLoop 环形进度条|progress loop|progress-loop'
			},
			{
				title: '轮播 Swiper',
				title_zh: '轮播',
				title_en: 'Swiper',
				nav: 'swiper',
				tip: '人世间悲喜烂剧，昼夜轮播不停。',
				tip_en: 'The ups and downs of life, day and night, are not stopping.',
				alias: 'swiper|轮播 | 轮|播|swiper 轮播|swiper 轮播 | 轮播图|swiper 轮播图|swiper 轮播图 | 走马灯|swiper 走马灯|swiper 走马灯|carousel'
			}
		]
	},
	{
		class: '反馈',
		class_en: 'Feedback',
		childs: [
			{
				title: '对话框 Dialog',
				title_zh: '对话框',
				title_en: 'Dialog',
				nav: 'dialog',
				tip: '无法确定任何事情，尤其是按下“确定”键的那一刻，我最不确定。',
				tip_en: 'Nothing can be determined, especially at the moment when the "OK" button is pressed, I am the most uncertain.',
				alias:
					'dialog|对话框 | 对话 | 对|话 | 框|dialog 对话框|dialog 对话框 | 对话框|dialog 对话框|dialog 对话框 | 对话框|dialog 对话框|dialog 对话框 | 对话框|dialog 对话框|dialog 对话框'
			},
			{
				title: '加载 Loading',
				title_zh: '加载',
				title_en: 'Loading',
				nav: 'loading',
				tip: '不要再苦苦等待答案了，没有回复已是答案。',
				tip_en: "Don't wait for the answer, no reply is the answer.",
				alias: 'loading|加载 | 加载中|loading 加载|loading 加载|loading 加载中|loading 加载中|loading 加载中...|loading 加载中...'
			},
			{
				title: '弹框 Modal',
				title_zh: '弹框',
				title_en: 'Modal',
				nav: 'modal',
				tip: '弹框即人生，要么选择关闭，要么选择继续。',
				tip_en: 'The modal is life, either choose to close or choose to continue.',
				alias:
					'modal|弹框 | 弹|框|modal 弹框|modal 弹框 | 弹窗|modal 弹窗|modal 弹窗 | 弹出框|modal 弹出框|modal 弹出框 | 弹框|modal 弹框|modal 弹框 | 模态框|modal 模态框|modal 模态框'
			},
			{
				title: '轻提示 Toast',
				title_zh: '轻提示',
				title_en: 'Toast',
				nav: 'toast',
				tip: '总有一些东西，要用消失来证明它的珍贵。',
				tip_en: 'There are always some things that have to disappear to prove their value.',
				alias:
					'toast|轻提示 | 轻|提示|toast 轻提示|toast 轻提示 | 轻弹窗|toast 轻弹窗|toast 轻弹窗 | 轻提示框|toast 轻提示框|toast 轻提示框 | 吐司|toast 吐司|toast 吐司'
			}
		]
	}
];
