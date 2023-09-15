const linkageData = [
	{
		label: 'Yunnan',
		children: [
			{
				label: 'Kunming',
				children: [{ label: 'Panlong District' }, { label: 'Wuhua District' }, { label: 'Guandu District' }, { label: 'Xishan District' }],
			},
			{
				label: 'Qujing',
				children: [
					{ label: 'Qilin District' },
					{ label: 'Zhanyi District' },
					{ label: 'Malong County' },
					{ label: 'Luliang County' },
					{ label: 'Shizong County' },
					{ label: 'Luoping County' },
					{ label: 'Fuyuan County' },
					{ label: 'Huize County' },
					{ label: 'Xuanwei City' },
				],
			},
			{
				label: 'Yuxi',
				children: [
					{ label: 'Hongta District' },
					{ label: 'Jiangchuan District' },
					{ label: 'Chengjiang County' },
					{ label: 'Tonghai County' },
					{ label: 'Huaning County' },
				],
			},
			{
				label: 'Baoshan',
				children: [
					{ label: 'Longyang District' },
					{ label: 'Shidian County' },
					{ label: 'Longling County' },
					{ label: 'Changning County' },
					{ label: 'Tengchong City' },
					{ label: 'Longling County' },
				],
			},
			{
				label: 'Lijiang',
				children: [
					{ label: 'Gucheng District' },
					{ label: 'Yongsheng County' },
					{ label: 'Huaping County' },
					{ label: 'Yulong Naxi Autonomous County' },
					{ label: 'Ninglang Yi Autonomous County' },
				],
			},
			{
				label: "Pu'er",
				children: [
					{ label: 'Simao District' },
					{ label: "Ning'er Hani and Yi Autonomous County" },
					{ label: 'Mojiang Hani Autonomous County' },
					{ label: 'Jingdong Yi Autonomous County' },
					{ label: 'Jinggu Dai and Yi Autonomous County' },
				],
			},
			{
				label: 'Lincang',
				children: [
					{ label: 'Linxiang District' },
					{ label: 'Fengqing County' },
					{ label: 'Yun County' },
					{ label: 'Yongde County' },
					{ label: 'Zhenkang County' },
				],
			},
			{
				label: 'Chuxiong',
				children: [
					{ label: 'Chuxiong City' },
					{ label: 'Shuangbai County' },
					{ label: 'Mouding County' },
					{ label: 'Nanhua County' },
					{ label: "Yao'an County" },
					{ label: 'Dayao County' },
				],
			},
			{
				label: 'Honghe',
				children: [
					{ label: 'Gejiu City' },
					{ label: 'Kaiyuan City' },
					{ label: 'Mengzi City' },
					{ label: 'Mile City' },
					{ label: 'Pingbian Miao Autonomous County' },
					{ label: 'Jianshui County' },
				],
			},
			{
				label: 'Wenshan',
				children: [
					{ label: 'Wenshan City' },
					{ label: 'Yanshan County' },
					{ label: 'Xichou County' },
					{ label: 'Malipo County' },
					{ label: 'Maguan County' },
					{ label: 'Qiubei County' },
					{ label: 'Guangnan County' },
					{ label: 'Funing County' },
				],
			},
		],
	},
	{
		label: 'Guangdong',
		children: [
			{
				label: 'Guangzhou',
				children: [
					{ label: 'Tianhe District' },
					{ label: 'Haizhu District' },
					{ label: 'Liwan District' },
					{ label: 'Yuexiu District' },
					{ label: 'Baiyun District' },
					{ label: 'Huangpu District' },
				],
			},
			{
				label: 'Shenzhen',
				children: [
					{ label: 'Luohu District' },
					{ label: 'Futian District' },
					{ label: 'Nanshan District' },
					{ label: "Bao'an District" },
					{ label: 'Longgang District' },
					{ label: 'Yantian District' },
				],
			},
			{ label: 'Zhuhai', children: [{ label: 'Xiangzhou District' }, { label: 'Doumen District' }, { label: 'Jinwan District' }] },
			{
				label: 'Shantou',
				children: [
					{ label: 'Longhu District' },
					{ label: 'Jinping District' },
					{ label: 'Gongjing District' },
					{ label: 'Chaoyang District' },
					{ label: 'Chaonan District' },
					{ label: 'Chenghai District' },
				],
			},
			{
				label: 'Foshan',
				children: [
					{ label: 'Chancheng District' },
					{ label: 'Nanhai District' },
					{ label: 'Shunde District' },
					{ label: 'Sanshui District' },
					{ label: 'Gaoming District' },
				],
			},
		],
	},
	{
		label: 'Sichuan',
		children: [
			{
				label: 'Chengdu',
				children: [
					{ label: 'Jinjiang District' },
					{ label: 'Qingyang District' },
					{ label: 'Jinniu District' },
					{ label: 'Wuhou District' },
					{ label: 'Chenghua District' },
					{ label: 'Longquanyi District' },
				],
			},
			{
				label: 'Mianyang',
				children: [
					{ label: 'Fucheng District' },
					{ label: 'Youxian District' },
					{ label: 'Anzhou District' },
					{ label: 'Santai County' },
					{ label: 'Yanting County' },
					{ label: 'Zitong County' },
				],
			},
			{
				label: 'Zigong',
				children: [
					{ label: 'Ziliujing District' },
					{ label: 'Gongjing District' },
					{ label: "Da'an District" },
					{ label: 'Yantan District' },
					{ label: 'Rong County' },
					{ label: 'Fushun County' },
				],
			},
			{
				label: 'Panzhihua',
				children: [
					{ label: 'Dong District' },
					{ label: 'Xi District' },
					{ label: 'Renhe District' },
					{ label: 'Miyi County' },
					{ label: 'Yanbian County' },
				],
			},
		],
	},
	{
		label: 'Beijing',
		children: [
			{
				label: 'Beijing',
				children: [
					{ label: 'Dongcheng District' },
					{ label: 'Xicheng District' },
					{ label: 'Chaoyang District' },
					{ label: 'Fengtai District' },
					{ label: 'Shijingshan District' },
					{ label: 'Haidian District' },
				],
			},
		],
	},
	{
		label: 'Zhejiang',
		children: [
			{
				label: 'Hangzhou',
				children: [
					{ label: 'Shangcheng District' },
					{ label: 'Xiacheng District' },
					{ label: 'Jianggan District' },
					{ label: 'Gongshu District' },
					{ label: 'Xihu District' },
					{ label: 'Binjiang District' },
				],
			},
			{
				label: 'Ningbo',
				children: [
					{ label: 'Haishu District' },
					{ label: 'Jiangdong District' },
					{ label: 'Jiangbei District' },
					{ label: 'Beilun District' },
					{ label: 'Zhenhai District' },
					{ label: 'Yinzhou District' },
				],
			},
			{
				label: 'Wenzhou',
				children: [
					{ label: 'Lucheng District' },
					{ label: 'Longwan District' },
					{ label: 'Ouhai District' },
					{ label: 'Dongtou District' },
					{ label: 'Yongjia County' },
					{ label: 'Pingyang County' },
				],
			},
			{
				label: 'Jiaxing',
				children: [
					{ label: 'Nanhu District' },
					{ label: 'Xiuzhou District' },
					{ label: 'Jiashan County' },
					{ label: 'Haiyan County' },
					{ label: 'Haining City' },
					{ label: 'Pinghu City' },
				],
			},
			{
				label: 'Huzhou',
				children: [
					{ label: 'Wuxing District' },
					{ label: 'Nanxun District' },
					{ label: 'Deqing County' },
					{ label: 'Changxing County' },
					{ label: 'Anji County' },
				],
			},
		],
	},
];

const linkageDiffLabeData = [
	{
		province: 'Yunnan',
		children: [
			{
				city: 'Kunming',
				children: [
					{ region: 'Panlong District' },
					{ region: 'Wuhua District' },
					{ region: 'Guandu District' },
					{ region: 'Xishan District' },
					{ region: 'Dongchuan District' },
					{ region: 'Chenggong District' },
					{ region: 'Jinning District' },
					{ region: 'Fumin County' },
					{ region: 'Yiliang County' },
					{ region: 'Shilin Yi Autonomous County' },
					{ region: 'Songming County' },
					{ region: 'Luquan Yi and Miao Autonomous County' },
					{ region: 'Xundian Hui and Yi Autonomous County' },
					{ region: 'Anning City' },
				],
			},
			{
				city: 'Qujing',
				children: [
					{ region: 'Qilin District' },
					{ region: 'Zhanyi District' },
					{ region: 'Malong County' },
					{ region: 'Luliang County' },
					{ region: 'Shizong County' },
					{ region: 'Luoping County' },
					{ region: 'Fuyuan County' },
					{ region: 'Huize County' },
					{ region: 'Xuanwei City' },
				],
			},
			{
				city: 'Yuxi',
				children: [
					{ region: 'Hongta District' },
					{ region: 'Jiangchuan District' },
					{ region: 'Chengjiang County' },
					{ region: 'Tonghai County' },
					{ region: 'Huaning County' },
					{ region: 'Yimen County' },
					{ region: 'Eshan Yi Autonomous County' },
					{ region: 'Xinping Yi and Dai Autonomous County' },
					{ region: 'Yuanjiang Hani, Yi and Dai Autonomous County' },
				],
			},
			{
				city: 'Baoshan',
				children: [
					{ region: 'Longyang District' },
					{ region: 'Shidian County' },
					{ region: 'Longling County' },
					{ region: 'Changning County' },
					{ region: 'Tengchong City' },
				],
			},
			{
				city: 'Lijiang',
				children: [
					{ region: 'Gucheng District' },
					{ region: 'Yongsheng County' },
					{ region: 'Huaping County' },
					{ region: 'Yulong Naxi Autonomous County' },
					{ region: 'Ninglang Yi Autonomous County' },
				],
			},
			{
				city: "Pu'er",
				children: [
					{ region: 'Simao District' },
					{ region: "Ning'er Hani and Yi Autonomous County" },
					{ region: 'Mojiang Hani Autonomous County' },
					{ region: 'Jingdong Yi Autonomous County' },
					{ region: 'Jinggu Dai and Yi Autonomous County' },
					{ region: 'Zhenyuan Yi, Hani and Lahu Autonomous County' },
					{ region: 'Jiangcheng Hani and Yi Autonomous County' },
					{ region: 'Menglian Dai, Lahu and Va Autonomous County' },
					{ region: 'Lancang Lahu Autonomous County' },
					{ region: 'Ximeng Va Autonomous County' },
				],
			},
		],
	},
	{
		province: 'Guangdong',
		children: [
			{
				city: 'Guangzhou',
				children: [
					{ region: 'Tianhe District' },
					{ region: 'Haizhu District' },
					{ region: 'Liwan District' },
					{ region: 'Yuexiu District' },
					{ region: 'Baiyun District' },
					{ region: 'Huangpu District' },
				],
			},
			{
				city: 'Shenzhen',
				children: [
					{ region: 'Luohu District' },
					{ region: 'Futian District' },
					{ region: 'Nanshan District' },
					{ region: "Bao'an District" },
					{ region: 'Longgang District' },
					{ region: 'Yantian District' },
				],
			},
		],
	},
];

export { linkageData, linkageDiffLabeData };
