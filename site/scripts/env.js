import fs from 'node:fs';

// 获取当前时间，返回中文和英文时间格式，24 小时制
const now_en = new Date().toLocaleString('en-US', { hour12: false });
const now_zh = new Date().toLocaleString('zh-CN', { hour12: false });
console.log('now_en', now_en);
console.log('now_zh', now_zh);

// 如果已存在 .env 文件，则删除
if (fs.existsSync('.env')) {
	fs.unlinkSync('.env');
}

// 将当前时间写入 .env 文件
fs.writeFileSync('.env', `VITE_BUILD_TIME_EN=${now_en}\nVITE_BUILD_TIME_ZH=${now_zh}`);
