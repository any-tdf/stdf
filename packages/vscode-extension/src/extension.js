const vscode = require('vscode');
const path = require('path');

// 组件列表
// components list
const componentList = require('./componentList');

function activate(context) {
    // 如果没有设置，返回undefined
    // If not set, return undefined
    const result = vscode.workspace.getConfiguration().get('STDF');
    // 获取插件语言
    // Get plugin language
    const isZh = result.English ? false : true;

    // 读取当前工程的 package.json 文件
    // Read the package.json file of the current project
    const packageJson = require(path.join(vscode.workspace.rootPath, 'package.json'));
    // 判断当前工程是否引入了 stdf 组件库
    // Determine whether the current project has introduced the stdf component library
    const isImportStdf = packageJson?.dependencies?.stdf || packageJson?.devDependencies?.stdf ? true : false;

    // 当前文件是 .svelte 文件时且 isImportStdf 为 true 时，才注册悬浮提示
    // When the current file is a .svelte file and isImportStdf is true, register the hover prompt
    if (vscode.window.activeTextEditor.document.languageId === 'svelte' && isImportStdf) {
        vscode.languages.registerHoverProvider('svelte', {
            provideHover(document, position, token) {
                // 获取当前悬浮的单词
                // Get the word currently hovering
                const word = document.getText(document.getWordRangeAtPosition(position));
                // 将单词首字母小写
                // Lowercase the first letter of the word
                const wordLower = word.charAt(0).toLowerCase() + word.slice(1);
                // 如果单词为 components 数组中的一项，则显示提示信息，内容为 ../../doc/components/${componentspaths}/api.md 文件的内容
                // If the word is an item in the components array, the prompt information is displayed, and the content is the content of the ../../doc/components/${componentspaths}/api.md file
                if (componentList.includes(word)) {
                    // 获取对应组件的 api.md 文件的路径
                    // Get the path of the api.md file of the corresponding component
                    const apiPath = path.join(__dirname, `./doc/components/${wordLower}/api${isZh ? '' : '_en'}.md`);

                    // 读取 api.md 文件的内容
                    // Read the contents of the api.md file
                    const apiContent = require('fs').readFileSync(apiPath, 'utf-8');
                    // 在 apiContent 后面添加示例、API、指南的链接
                    // Add links to examples, API, and guides after apiContent
                    const baseUrl = 'https://stdf.design/#/components?nav=';
                    const addContent = `**[${isZh ? '示例' : 'Demo'}](${baseUrl}${wordLower}&tab=0&lang=${
                        isZh ? 'zh_CN' : 'en_US'
                    }) &nbsp; [API](${baseUrl}${wordLower}&tab=1&lang=${isZh ? 'zh_CN' : 'en_US'}) &nbsp; [${
                        isZh ? '指南' : 'Guide'
                    }](${baseUrl}${wordLower}&tab=2&lang=${isZh ? 'zh_CN' : 'en_US'})**`;
                    const allContent = apiContent + '\n\n' + '---' + '\n\n' + addContent;

                    // 返回提示信息
                    // Return prompt information
                    return new vscode.Hover(allContent);
                }
            },
        });
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
