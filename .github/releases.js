// 读取项目 /doc/guide/changelog.md 文件，生成 releases 文本

// 读取 ../doc/guide/changelog.md 和 ../doc/guide/changelog_en.md 文件，分别获取文件前两个二级标题之间的内容，包括空格和换行符
// 例如：
// ## 0.0.11
//
// - 优化 Input，详见 [Input](https://stdf.design/#/components?nav=input&tab=4)。
//
// ## 0.0.10
// 只取 ## 0.0.11 和 ## 0.0.10 之间的内容
// 结果为：
// - 优化 Input，详见 [Input](https://stdf.design/#/components?nav=input&tab=4)。

// 获取内容暂存为变量 changelogContent
// 英文版的 changelog_en.md 文件同理，获取内容暂存为变量 changelogEnContent
// 然后将获取的两个内容按照 Markdown 格式用单独一行 --- 分开，保存到 ./releases.md 文件中

const fs = require('fs');
const path = require('path');
// const { version } = require('../../package.json');

const changelogPath = path.resolve(__dirname, '../doc/guide/changelog.md');
const changelogEnPath = path.resolve(__dirname, '../doc/guide/changelog_en.md');
const releasesPath = path.resolve(__dirname, './releases.md');

const changelog = fs.readFileSync(changelogPath, 'utf-8');
const changelogEn = fs.readFileSync(changelogEnPath, 'utf-8');

// 注意只取前两个二级标题之间的内容，二级标题不要
const changelogContent = changelog.match(/##\s[\d\.]+\n\n([\s\S]*?)\n\n##\s[\d\.]+/)[1];
const changelogEnContent = changelogEn.match(/##\s[\d\.]+\n\n([\s\S]*?)\n\n##\s[\d\.]+/)[1];

const releasesContent = `${changelogContent}\n\n---\n\n${changelogEnContent}`;

// 打印出 releasesContent
console.log('releasesContent: ', releasesContent);

fs.writeFileSync(releasesPath, releasesContent);
