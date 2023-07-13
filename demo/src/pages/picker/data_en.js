const someProvinceList = [
    { label: 'Yunnan' },
    { label: 'Beijing' },
    { label: 'Guangdong' },
    { label: 'Chongqing' },
    { label: 'Sichuan' },
    { label: 'Hubei' },
    { label: 'Henan' },
    { label: 'Hunan' },
    { label: 'Shandong' },
    { label: 'Jiangsu' },
    { label: 'Zhejiang' },
    { label: 'Jiangxi' },
    { label: 'Anhui' },
    { label: 'Fujian' },
];
const weekList = [
    { label: 'Monday' },
    { label: 'Tuesday' },
    { label: 'Wednesday' },
    { label: 'Thursday' },
    { label: 'Friday' },
    { label: 'Saturday' },
    { label: 'Sunday' },
];
const amOrPmList = [{ label: 'AM' }, { label: 'PM' }];
const timeList = [
    { label: '01:00' },
    { label: '02:00' },
    { label: '03:00' },
    { label: '04:00' },
    { label: '05:00' },
    { label: '06:00' },
    { label: '07:00' },
    { label: '08:00' },
    { label: '09:00' },
    { label: '10:00' },
    { label: '11:00' },
    { label: '12:00' },
];
const cityList = [
    { cityName: 'kunming' },
    { cityName: 'qujing' },
    { cityName: 'yuxi' },
    { cityName: 'baoshan' },
    { cityName: 'zhaotong' },
    { cityName: 'lijiang' },
    { cityName: 'puer' },
    { cityName: 'lincang' },
    { cityName: 'chuxiong' },
    { cityName: 'honghe' },
    { cityName: 'wenshan' },
];
const linkageData = [
    {
        label: 'Yunnan',
        children: [
            {
                label: 'Kunming',
                children: [
                    { label: 'Panlong District' },
                    { label: 'Wuhua District' },
                    { label: 'Guandu District' },
                    { label: 'Xishan District' },
                    { label: 'Dongchuan District' },
                ],
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
                children: [{ label: 'Gucheng District' }, { label: 'Yongsheng County' }, { label: 'Huaping County' }],
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
                    { label: 'Linxia District' },
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
            {
                label: 'Zhuhai',
                children: [{ label: 'Xiangzhou District' }, { label: 'Doumen District' }, { label: 'Jinwan District' }],
            },
            {
                label: 'Shantou',
                children: [
                    { label: 'Longhu District' },
                    { label: 'Jinping District' },
                    { label: 'Haojiang District' },
                    { label: 'Chaoyang District' },
                    { label: "Chao'an District" },
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
                label: 'Beijing City',
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
const linkagDiffLabelKeyData = [
    {
        province: 'Yunnan',
        children: [
            {
                city: 'Kunming',
                children: [
                    { region: 'Panlong Qu' },
                    { region: 'Wuhua Qu' },
                    { region: 'Guandu Qu' },
                    { region: 'Xishan Qu' },
                    { region: 'Dongchuan Qu' },
                    { region: 'Chenggong Qu' },
                    { region: 'Jinning Qu' },
                ],
            },
            {
                city: 'Qujing',
                children: [
                    { region: 'Qilin Qu' },
                    { region: 'Zhanyi Qu' },
                    { region: 'Malong Xian' },
                    { region: 'Luliang Xian' },
                    { region: 'Shizong Xian' },
                    { region: 'Luoping Xian' },
                ],
            },
            {
                city: 'Yuxi',
                children: [
                    { region: 'Hongta Qu' },
                    { region: 'Jiangchuan Qu' },
                    { region: 'Chengjiang Xian' },
                    { region: 'Tonghai Xian' },
                    { region: 'Huaning Xian' },
                    { region: 'Yimen Xian' },
                ],
            },
        ],
    },
    {
        province: 'Guizhou',
        children: [
            {
                city: 'Guiyang',
                children: [
                    { region: 'Nanming Qu' },
                    { region: 'Yunyan Qu' },
                    { region: 'Huaxi Qu' },
                    { region: 'Wudang Qu' },
                    { region: 'Baiyun Qu' },
                    { region: 'Guanshanhu Qu' },
                ],
            },
            {
                city: 'Zunyi',
                children: [
                    { region: 'Honghuagang Qu' },
                    { region: 'Huichuan Qu' },
                    { region: 'Bozhou Qu' },
                    { region: 'Tongzi Xian' },
                    { region: 'Suiyang Xian' },
                    { region: 'Zhengan Xian' },
                ],
            },
            {
                city: 'Liupanshui',
                children: [
                    { region: 'Zhongshan Qu' },
                    { region: 'Liuzhi Special District' },
                    { region: 'Shuicheng Xian' },
                    { region: 'Pan Xian' },
                ],
            },
        ],
    },
    {
        province: 'Sichuan',
        children: [
            {
                city: 'Chengdu',
                children: [
                    { region: 'Jinjiang Qu' },
                    { region: 'Qingyang Qu' },
                    { region: 'Jinniu Qu' },
                    { region: 'Wuhou Qu' },
                    { region: 'Chenghua Qu' },
                    { region: 'Longquanyi Qu' },
                ],
            },
            {
                city: 'Mianyang',
                children: [
                    { region: 'Fucheng Qu' },
                    { region: 'Youxian Qu' },
                    { region: 'Anzhou Qu' },
                    { region: 'Santai Xian' },
                    { region: 'Yanling Xian' },
                    { region: 'Zitong Xian' },
                ],
            },
            {
                city: 'Panzhihua',
                children: [
                    { region: 'Dongqu' },
                    { region: 'Xiqu' },
                    { region: 'Renhe Qu' },
                    { region: 'Miyi Xian' },
                    { region: 'Yanbian Xian' },
                ],
            },
        ],
    },
    {
        province: 'Beijing',
        children: [
            {
                city: 'Beijing',
                children: [
                    { region: 'Dongcheng Qu' },
                    { region: 'Xicheng Qu' },
                    { region: 'Chaoyang Qu' },
                    { region: 'Fengtai Qu' },
                    { region: 'Shijingshan Qu' },
                    { region: 'Haidian Qu' },
                ],
            },
        ],
    },
];
const linkagCustomChildrenKeyData = [
    {
        label: 'YunNan',
        child: [
            {
                label: 'KunMing',
                child: [
                    { label: 'PanLongQu' },
                    { label: 'WuHuaQu' },
                    { label: 'GuanDuQu' },
                    { label: 'XiShanQu' },
                    { label: 'DongChuanQu' },
                    { label: 'ChengGongQu' },
                    { label: 'JinNingQu' },
                ],
            },
            {
                label: 'QuJing',
                child: [
                    { label: 'QiLinQu' },
                    { label: 'ZhanYiQu' },
                    { label: 'MaLongXian' },
                    { label: 'LuLiangXian' },
                    { label: 'ShiZongXian' },
                    { label: 'LuoPingXian' },
                ],
            },
            {
                label: 'YuXi',
                child: [
                    { label: 'HongTaQu' },
                    { label: 'JiangChuanQu' },
                    { label: 'ChengJiangXian' },
                    { label: 'TongHaiXian' },
                    { label: 'HuaNingXian' },
                    { label: 'YiMenXian' },
                ],
            },
        ],
    },
    {
        label: 'GuiZhou',
        child: [
            {
                label: 'GuiYang',
                child: [
                    { label: 'NanMingQu' },
                    { label: 'YunYanQu' },
                    { label: 'HuaXiQu' },
                    { label: 'WuDangQu' },
                    { label: 'BaiYunQu' },
                    { label: 'GuanShanHuQu' },
                ],
            },
            {
                label: 'ZunYi',
                child: [
                    { label: 'HongHuaGangQu' },
                    { label: 'HuiChuanQu' },
                    { label: 'BoZhouQu' },
                    { label: 'TongZiXian' },
                    { label: 'SuiYangXian' },
                    { label: 'ZhengAnXian' },
                ],
            },
            {
                label: 'LiuPanShui',
                child: [{ label: 'ZhongShanQu' }, { label: 'LiuZhiTeQu' }, { label: 'ShuiChengXian' }, { label: 'PanXian' }],
            },
        ],
    },
    {
        label: 'SiChuan',
        child: [
            {
                label: 'ChengDu',
                child: [
                    { label: 'JinJiangQu' },
                    { label: 'QingYangQu' },
                    { label: 'JinNiuQu' },
                    { label: 'WuHouQu' },
                    { label: 'ChengHuaQu' },
                    { label: 'LongQuanYiQu' },
                ],
            },
            {
                label: 'MianYang',
                child: [
                    { label: 'FuChengQu' },
                    { label: 'YouXianQu' },
                    { label: 'AnZhouQu' },
                    { label: 'SanTaiXian' },
                    { label: 'YanTingXian' },
                    { label: 'ZiTongXian' },
                ],
            },
            {
                label: 'PanZhiHua',
                child: [{ label: 'DongQu' }, { label: 'XiQu' }, { label: 'RenHeQu' }, { label: 'MiYiXian' }, { label: 'YanBianXian' }],
            },
        ],
    },
    {
        label: 'BeiJing',
        child: [
            {
                label: 'BeiJing',
                child: [
                    { label: 'DongChengQu' },
                    { label: 'XiChengQu' },
                    { label: 'ChaoYangQu' },
                    { label: 'FengTaiQu' },
                    { label: 'ShiJingShanQu' },
                    { label: 'HaiDianQu' },
                ],
            },
        ],
    },
    {
        label: 'ZheJiang',
        child: [
            {
                label: 'HangZhou',
                child: [
                    { label: 'XiHuQu' },
                    { label: 'ShangChengQu' },
                    { label: 'XiaChengQu' },
                    { label: 'JiangGanQu' },
                    { label: 'GongShuQu' },
                    { label: 'BinJiangQu' },
                ],
            },
            {
                label: 'NingBo',
                child: [
                    { label: 'HaiShuQu' },
                    { label: 'JiangDongQu' },
                    { label: 'JiangBeiQu' },
                    { label: 'BeiLunQu' },
                    { label: 'ZhenHaiQu' },
                    { label: 'YinZhouQu' },
                ],
            },
            {
                label: 'WenZhou',
                child: [
                    { label: 'LuChengQu' },
                    { label: 'LongWanQu' },
                    { label: 'OuHaiQu' },
                    { label: 'DongTouQu' },
                    { label: 'YongJiaXian' },
                    { label: 'PingYangXian' },
                ],
            },
        ],
    },
];

export { someProvinceList, weekList, amOrPmList, timeList, cityList, linkageData, linkagDiffLabelKeyData, linkagCustomChildrenKeyData };
