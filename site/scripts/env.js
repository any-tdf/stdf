import fs from 'node:fs';

//得到标准时区的时间的函数
const getLocalTime = i => {
	//参数i为时区值数字，比如北京为东八区则输进8,纽约为西5区输入-5
	if (typeof i !== 'number') return;
	var d = new Date();
	//得到1970年一月一日到现在的秒数
	var len = d.getTime();
	//本地时间与GMT时间的时间偏移差
	var offset = d.getTimezoneOffset() * 60000;
	//得到现在的格林尼治时间
	var utcTime = len + offset;
	return new Date(utcTime + 3600000 * i);
};

// 获取当前时间，返回中文和英文时间格式，24 小时制
let now_en = getLocalTime(-4).toLocaleString('en-US', { hour12: false });
let now_zh = getLocalTime(+8).toLocaleString('zh-CN', { hour12: false });

// 去掉秒，即去除最后的 ':xx'
now_en = now_en.slice(0, -3) + '(UTC-04:00)';
now_zh = now_zh.slice(0, -3) + '(UTC+08:00)';

console.log('now_en', now_en);
console.log('now_zh', now_zh);

// 如果已存在 .env 文件，则删除
if (fs.existsSync('.env')) {
	fs.unlinkSync('.env');
}

// 将当前时间写入 .env 文件
fs.writeFileSync('.env', `VITE_BUILD_TIME_EN=${now_en}\nVITE_BUILD_TIME_ZH=${now_zh}`);
