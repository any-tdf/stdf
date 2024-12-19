import vscode from 'vscode';
import path from 'path';
import { exec } from 'child_process';

// 组件列表
// components list
import menuList from './menuList';
const componentList = ArrChildFun(menuList);

async function activate() {
    // 如果没有设置，返回 undefined
    // If not set, return undefined
    const result = vscode.workspace.getConfiguration().get('STDF');
    // 获取插件语言
    // Get plugin language
    const isZh = result.English ? false : true;

    // 读取当前工程的 package.json 文件
    // Read the package.json file of the current project
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    const packageJson = workspaceFolder
        ? await import(path.join(workspaceFolder.uri.fsPath, 'package.json'), { assert: { type: 'json' } })
        : null;

    // 判断当前工程是否引入了 stdf 组件库
    // Determine whether the current project has introduced the stdf component library
    const isImportStdf = packageJson?.dependencies?.stdf || packageJson?.devDependencies?.stdf ? true : false;

    // 如果 isImportStdf 为 true 时，读�� stdf 组件库的版本号做为当前版本号
    // If isImportStdf is true, read the version number of the stdf component library as the current version number
    let currentVersion = isImportStdf ? packageJson.dependencies?.stdf || packageJson.devDependencies?.stdf : '';
    // 如果 currentVersion 开头为 ^，则去掉 ^
    // If currentVersion starts with ^, remove ^
    if (currentVersion.startsWith('^')) {
        currentVersion = currentVersion.slice(1);
    }

    // stdf 组件库的最新版本号
    // The latest version number of the stdf component library
    const latestVersion = (await getLatestVersion('stdf')) || (isZh ? '获取失败' : 'Failed to get');

    // 当前文件是 .svelte 文件时且 isImportStdf 为 true 时，才注册悬浮提示
    // When the current file is a .svelte file and isImportStdf is true, register the hover prompt
    if (vscode.window.activeTextEditor.document.languageId === 'svelte' && isImportStdf) {
        vscode.languages.registerHoverProvider('svelte', {
            provideHover: async function (document, position) {
                // 获取当前悬浮的单词
                // Get the word currently hovering
                const word = document.getText(document.getWordRangeAtPosition(position));
                // 将单词首字母小写
                // Lowercase the first letter of the word
                const wordLower = word.charAt(0).toLowerCase() + word.slice(1);
                // 如果单词为 components 数组中的一项，则显示提示信息，内容为 ./doc/components/${wordLower}/api.md 文件的内容
                // If the word is an item in the components array, display the prompt information, and the content is the content of the ./doc/components/${wordLower}/api.md file
                if (componentList.includes(word)) {
                    // 组合当前 STDF 版本和最新版本
                    // Combine the current STDF version and the latest version
                    const versionContent = `STDF ${isZh ? '当前' : 'Current'}：${currentVersion} &nbsp; ${
                        isZh ? '最新' : 'Latest'
                    }：${latestVersion} &nbsp; [${isZh ? '查看更新日志' : 'See changelog'}](https://next.stdf.design/guide/changelog)`;

                    // 获取对应组件的 api.md 文件的路径
                    // Get the path of the api.md file of the corresponding component
                    const apiPath = path.join(__dirname, `./docs/components/${wordLower}/api${isZh ? '' : '_en'}.md`);

                    // 读取 api.md 文件的内容
                    // Read the contents of the api.md file
                    const fs = await import('fs/promises');
                    const apiContent = await fs.readFile(apiPath, 'utf-8');
                    // 在 apiContent 后面添加示例、API、指南、组件源码的链接
                    // Add links to examples, API, guides, and component source code after apiContent
                    const baseUrl = 'https://next.stdf.design/components?nav=';
                    const baseUrlCode = 'https://github.com/any-tdf/stdf/blob/next/packages/stdf/components/';
                    const baseUrlCodeGitee = 'https://gitee.com/dufu1991/stdf/blob/main/packages/stdf/components/';
                    const addContent = `**[${isZh ? '示例' : 'Demo'}](${baseUrl}${wordLower}&tab=0&lang=${
                        isZh ? 'zh_CN' : 'en_US'
                    }) &nbsp; [API](${baseUrl}${wordLower}&tab=1&lang=${isZh ? 'zh_CN' : 'en_US'}) &nbsp; [${
                        isZh ? '指南' : 'Guide'
                    }](${baseUrl}${wordLower}&tab=2&lang=${isZh ? 'zh_CN' : 'en_US'}) &nbsp; [${
                        isZh ? '更新日志' : 'Changelog'
                    }](${baseUrl}${wordLower}&tab=4&lang=${isZh ? 'zh_CN' : 'en_US'}) &nbsp; [${
                        isZh ? '源码 (GitHub)' : 'Source code(GitHub)'
                    }](${baseUrlCode}${wordLower}/${word}.svelte) &nbsp; [${
                        isZh ? '源码 (Gitee)' : 'Source code(Gitee)'
                    }](${baseUrlCodeGitee}${wordLower}/${word}.svelte)**`;
                    const allContent =
                        versionContent +
                        '\n\n' +
                        '---' +
                        '\n\n' +
                        apiContent +
                        '\n\n' +
                        '---' +
                        '\n\n' +
                        addContent +
                        '\n\n' +
                        '\n\n' +
                        '---';

                    // 返回提示信息
                    // Return prompt information
                    return new vscode.Hover(allContent);
                }
            },
        });
    }
}

//数组处理
//Array processing
function ArrChildFun(arr) {
    let newArr = [];
    for (let e = 0; e < arr.length; e++) {
        newArr.push(...arr[e].childs);
    }
    //再将 newArr 内的 title_en 组成一维数组
    //Then the title_en in newArr is composed of one-dimensional array
    let newArr2 = [];
    for (let e = 0; e < newArr.length; e++) {
        newArr2.push(newArr[e].title_en);
    }
    return newArr2;
}

// 获取指定 npm 包的最新版本号
// Get the latest version number of the specified npm package
async function getLatestVersion(packageName) {
    return new Promise(resolve => {
        exec(`npm show ${packageName} version`, (error, stdout, stderr) => {
            if (error || stderr) {
                resolve(null);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
