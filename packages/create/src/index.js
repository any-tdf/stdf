#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as p from '@clack/prompts';
import { bold, cyan, grey, red, blue } from 'kleur/colors';
import minimist from 'minimist';
import pacote from 'pacote';

import * as langAll from './lang';

// 获取最新版本号
// Get the latest version number
const getLatestVersion = async packageName => {
    const manifest = await pacote.manifest(`${packageName}@latest`);
    return manifest.version;
};

// 获取 create 当前版本
// Get create-stdf current version
const { version } = JSON.parse(fs.readFileSync(fileURLToPath(new URL('../package.json', import.meta.url)), 'utf-8'));

// 获取 create-stdf 的最新版本号
// Get the latest version number of create-stdf
const createStdfV = await getLatestVersion('create-stdf');

// 显示版本号
// Display version number
console.log(`
${grey(`create-stdf@${version}`)}
`);

if (version != createStdfV) {
    console.log(
        red(`😢 Recommended to use the latest version: ${createStdfV}
		`),
    );
}

const spinner = p.spinner();

p.intro('Welcome to use STDF!');

let lang = langAll.en_US;

// 获取命令行参数
// Get command line parameters
const argv = minimist(process.argv.slice(2));

// 获取项目名称和模板名称和语言
// Get project name and template name
const argvProjectName = argv._[0];
const argvTemplate = argv.template || argv.t;
const argvLanguage = argv.language || argv.l;
const argvIconUsage = argv.iconUsage || argv.i;
const argvThemeMode = argv.themeMode || argv.theme;

// 语言列表
// Language list
const languages = [];

// 循环 langAll 对象，将语言列表中的语言名字替换为对应的语言名字，且按照 sort 排序
// Loop through the langAll object and replace the language name in the language list with the corresponding language name, and sort by sort
for (const key in langAll) {
    languages.push({ value: key, label: langAll[key].name, sort: langAll[key].sort });
}

// 按照 sort 排序
// Sort by sort
languages.sort((a, b) => a.sort - b.sort);

// 如果命令行参数中有语言，且语言列表中有该语言，使用该语言，否则使用英语
// If there is a language in the command line parameters and the language list has the language, use the language, otherwise use English
lang = argvLanguage && languages.find(item => item.value === argvLanguage) ? langAll[argvLanguage] : langAll.en_US;

// 模板列表
// Template list
const templateOptions = [
    { value: 'sktt', label: 'SvelteKit & Tailwind & TypeScript', template: 'sktt', ts: true, finish: true },
    { value: 'skt', label: 'SvelteKit & Tailwind', template: 'skt', ts: false, finish: true },
    { value: 'vstt', label: 'Vite & Svelte & Tailwind & TypeScript', template: 'vstt', ts: true, finish: true },
    { value: 'vst', label: 'Vite & Svelte & Tailwind', template: 'vst', ts: false, finish: true },
    { value: 'skut', label: 'SvelteKit & UnoCSS & TypeScript', template: 'skut', ts: true, finish: false },
    { value: 'sku', label: 'SvelteKit & UnoCSS', template: 'sku', ts: false, finish: false },
    { value: 'vsut', label: 'Vite & Svelte & UnoCSS & TypeScript', template: 'vsut', ts: true, finish: false },
    { value: 'vsu', label: 'Vite & Svelte & UnoCSS', template: 'vsu', ts: false, finish: false },
];

// 包管理工具列表
// Package management tool list
const packageManagerOptions = [
    { value: 'bun', label: 'Bun', install: 'bun i', dev: 'bun dev' },
    { value: 'npm', label: 'NPM', install: 'npm i', dev: 'npm run dev' },
    { value: 'pnpm', label: 'PNPM', install: 'pnpm i', dev: 'pnpm dev' },
    { value: 'yarn', label: 'Yarn', install: 'yarn', dev: 'yarn run dev' },
];

// 图标使用方式列表
// Icon usage method list
const iconUsageOptions = [
    { value: 'any-tdf-icon', label: '@any-tdf/vite-plugin-svg-symbol', hintKey: 'iconSvgSymbolHint' },
    { value: 'iconify', label: 'iconify', hintKey: 'iconIconifyHint' },
    { value: 'both', label: '@any-tdf/vite-plugin-svg-symbol & iconify', hintKey: 'iconBothHint' },
    { value: 'none', label: 'none', hintKey: 'iconNoneHint' },
];

const themeModeOptions = [
    { value: 'single', labelKey: 'tms' },
    { value: 'multi', labelKey: 'tmm' },
    { value: 'all', labelKey: 'tma' },
];

const getThemeModeOptions = () =>
    themeModeOptions.map(item => ({
        value: item.value,
        label: lang[item.labelKey],
    }));

// 如果命令行参数中有项目名称
// If there is project name in command line parameters
if (argvProjectName) {
    let itemTemplate = null;
    if (argvTemplate) {
        itemTemplate = templateOptions.find(item => item.value === argvTemplate);
        if (!itemTemplate) {
            p.intro(red(lang.pectn + ' (' + templateOptions.map(item => item.value).join(', ') + ')'));
            process.exit(0);
        }
        if (!itemTemplate.finish) {
            p.intro(red(itemTemplate.label + ' ' + lang.hnay));
            process.exit(0);
        }
    } else {
        itemTemplate = templateOptions[0];
    }
    let itemIconUsage = null;
    if (argvIconUsage) {
        itemIconUsage = iconUsageOptions.find(item => item.value === argvIconUsage);
        if (!itemIconUsage) {
            p.intro(red(lang.pic + ' (' + iconUsageOptions.map(item => item.value).join(', ') + ')'));
            process.exit(0);
        }
    } else {
        itemIconUsage = iconUsageOptions[0];
    }
    let itemThemeMode = null;
    if (argvThemeMode) {
        itemThemeMode = themeModeOptions.find(item => item.value === argvThemeMode);
        if (!itemThemeMode) {
            p.intro(red(lang.ptm + ' (' + themeModeOptions.map(item => item.value).join(', ') + ')'));
            process.exit(0);
        }
    } else {
        itemThemeMode = themeModeOptions.find(item => item.value === 'multi');
    }
    // 判断是否已存在，提示"项目名称已存在"
    // Determine whether it already exists, prompt "Project name already exists"
    if (fs.existsSync(argvProjectName)) {
        p.intro(red('🚫 ' + argvProjectName + ' ' + lang.pane));
        process.exit(0);
    }
    createFunc(argvProjectName, itemTemplate, itemIconUsage, packageManagerOptions[0], itemThemeMode);
} else {
    (async () => {
        // 选择一种语言
        // Select a language
        const languageType = await p.select({
            message: bold('Please select your preferred language'),
            options: languages,
        });
        if (p.isCancel(languageType)) {
            p.cancel(red('⛔ ') + lang.oc);
            process.exit(0);
        }
        lang = langAll[languageType];

        //  选择一个模板
        // Select a template
        let template = await p.select({
            message: bold(lang.psat),
            options: templateOptions.map(item => ({
                ...item,
                label: item.finish ? item.label : `(${lang.hnay}) ${item.label}`,
                disabled: !item.finish,
            })),
        });

        if (p.isCancel(template)) {
            p.cancel(red('⛔ ') + lang.oc);
            process.exit(0);
        }

        // 选择图标使用方式
        // Select icon usage method
        const iconUsage = await p.select({
            message: bold(lang.psai),
            options: iconUsageOptions.map(item => ({
                value: item.value,
                label: `${item.label} - ${lang[item.hintKey]}`,
            })),
        });

        if (p.isCancel(iconUsage)) {
            p.cancel(red('⛔ ') + lang.oc);
            process.exit(0);
        }

        // 选择主题模式
        // Select theme mode
        const themeMode = await p.select({
            message: bold(lang.pstm) + ' - ' + grey(lang.themeGeneratorHint),
            options: getThemeModeOptions(),
        });

        if (p.isCancel(themeMode)) {
            p.cancel(red('⛔ ') + lang.oc);
            process.exit(0);
        }

        // 输入项目名称
        // Enter the project name
        const projectName = await p.text({
            message: bold(lang.pn),
            placeholder: 'stdf-project',
            validate: value => {
                if (!value) {
                    // 判断是否为空，提示"项目名称不能为空"
                    // Determine whether it is empty, prompt "Project name cannot be empty"
                    return lang.pncbne;
                }
                if (fs.existsSync(value)) {
                    // 判断是否已存在，提示"项目名称已存在"
                    // Determine whether it already exists, prompt "Project name already exists"
                    return '🚫 ' + value + ' ' + lang.pane;
                }
            },
        });

        if (p.isCancel(projectName)) {
            p.cancel(red('⛔ ') + lang.oc);
            process.exit(0);
        }

        // 使用什么包管理工具 npm / pnpm / yarn / bun / deno
        // What package management tool to use npm / pnpm / yarn / bun / deno
        const packageManager = await p.select({
            message: bold(lang.pm),
            options: packageManagerOptions,
        });

        if (p.isCancel(packageManager)) {
            p.cancel(red('⛔ ') + lang.oc);
            process.exit(0);
        }

        // 根据 template 的值，复制对应目录下的所有文件到当前目录
        // According to the value of template, copy all files under the corresponding directory to the current directory
        createFunc(
            projectName,
            templateOptions.find(i => i.value === template),
            iconUsageOptions.find(i => i.value === iconUsage),
            packageManagerOptions.find(i => i.value === packageManager),
            themeModeOptions.find(i => i.value === themeMode),
        );
    })();
}

function createFunc(projectName, templateItem, iconUsageItem, packageManagerItem, themeModeItem) {
    // 如果 projectName 是数字，转为字符串
    // If projectName is a number, convert it to a string
    if (typeof projectName === 'number') {
        projectName = projectName.toString();
    }

    // 项目目录
    // Project directory
    const projectDir = path.join(path.resolve(), projectName);

    spinner.start('🚀 ' + lang.cfsing);

    fs.mkdirSync(projectDir);

    // 获取模板目录的绝对路径，考虑到 Windows 系统的兼容性，使用 path.join
    // Get the absolute path of the template directory, considering the compatibility of the Windows system, use path.join
    const templatePath = path.resolve(fileURLToPath(import.meta.url), '../..', `templates/${templateItem.template}`);

    // 将 templatePath 目录下的所有文件复制到 projectDir 目录下
    // Copy all files under the templatePath directory to the projectDir directory
    fs.copy(templatePath, projectDir)
        .then(async () => {
            // 读取 package.json 文件
            // Read the package.json file
            const packageJson = JSON.parse(fs.readFileSync(`${projectDir}/package.json`, 'utf-8'));

            // 将项目内的 package.json 中的 name 属性修改为 projectName
            // Modify the name attribute in package.json in the project to projectName
            packageJson.name = projectName;

            // 获取 stdf 的最新版本号
            // Get the latest version number of stdf
            const stdfV = await getLatestVersion('stdf');
            packageJson.devDependencies['stdf'] = `^${stdfV}`;

            const isVite = templateItem.value.includes('v');
            const isTs = templateItem.ts;
            const isUno = templateItem.value.includes('u');
            const themeMode = themeModeItem?.value || 'multi';
            const appSveltePath = isVite ? `${projectDir}/src/App.svelte` : `${projectDir}/src/routes/+page.svelte`;

            const addIconifyFun = async () => {
                if (isUno) {
                    // UnoCSS 模板使用 presetIcons，通过 CDN 加载图标，无需额外依赖
                    // UnoCSS template uses presetIcons, loads icons via CDN, no additional dependencies needed
                    const iconifySnippetPath = fileURLToPath(new URL('../snippet/iconify-unocss.txt', import.meta.url));
                    const iconifySnippet = fs.readFileSync(iconifySnippetPath, 'utf-8');

                    if (isVite) {
                        // 使用 Vite
                        // 在 ${projectDir}/src/App.svelte 的 <Calendar bind:visible /> 下方增加图标使用示例
                        const appSvelte = fs.readFileSync(`${projectDir}/src/App.svelte`, 'utf-8');
                        const appSvelteLines = appSvelte.split('\n');
                        appSvelteLines.splice(appSvelteLines.indexOf('<Calendar bind:visible />') + 1, 0, iconifySnippet);
                        fs.writeFileSync(`${projectDir}/src/App.svelte`, appSvelteLines.join('\n'), 'utf-8');
                    } else {
                        // 使用 SvelteKit
                        // 在 ${projectDir}/src/routes/+page.svelte 的 <Calendar bind:visible /> 下方增加图标使用示例
                        const pageSvelte = fs.readFileSync(`${projectDir}/src/routes/+page.svelte`, 'utf-8');
                        const pageSvelteLines = pageSvelte.split('\n');
                        pageSvelteLines.splice(pageSvelteLines.indexOf('<Calendar bind:visible />') + 1, 0, iconifySnippet);
                        fs.writeFileSync(`${projectDir}/src/routes/+page.svelte`, pageSvelteLines.join('\n'), 'utf-8');
                    }
                } else {
                    // Tailwind 模板使用 @iconify/tailwind4 插件
                    // Tailwind template uses @iconify/tailwind4 plugin
                    const iconifyTailwind4V = await getLatestVersion('@iconify/tailwind4');
                    const bitcoin_iconsV = await getLatestVersion('@iconify-json/bitcoin-icons');
                    const duo_iconsV = await getLatestVersion('@iconify-json/duo-icons');
                    const fluent_colorV = await getLatestVersion('@iconify-json/fluent-color');
                    packageJson.devDependencies['@iconify/tailwind4'] = `^${iconifyTailwind4V}`;
                    packageJson.devDependencies['@iconify-json/bitcoin-icons'] = `^${bitcoin_iconsV}`;
                    packageJson.devDependencies['@iconify-json/duo-icons'] = `^${duo_iconsV}`;
                    packageJson.devDependencies['@iconify-json/fluent-color'] = `^${fluent_colorV}`;
                    // 在 ${projectDir}/src/app.css 的第 4 行增加 @plugin "@iconify/tailwind4" {
                    // 	prefixes: duo-icons, bitcoin-icons, fluent-color;
                    // }
                    const appCss = fs.readFileSync(`${projectDir}/src/app.css`, 'utf-8');
                    const appCssLines = appCss.split('\n');
                    const iconifyBlock = ['@plugin "@iconify/tailwind4" {', '\tprefixes: duo-icons, bitcoin-icons, fluent-color;', '}', ''];
                    const themeIndex = appCssLines.findIndex(line => line.trim().startsWith('@theme'));
                    const insertIndex = themeIndex === -1 ? appCssLines.length : themeIndex;
                    appCssLines.splice(insertIndex, 0, ...iconifyBlock);
                    fs.writeFileSync(`${projectDir}/src/app.css`, appCssLines.join('\n'), 'utf-8');

                    const iconifySnippet = fs.readFileSync(fileURLToPath(new URL('../snippet/iconify.txt', import.meta.url)), 'utf-8');

                    if (isVite) {
                        // 使用 Vite
                        // 在 ${projectDir}/src/App.svelte 的 <Calendar bind:visible /> 下方增加图标使用示例
                        const appSvelte = fs.readFileSync(`${projectDir}/src/App.svelte`, 'utf-8');
                        const appSvelteLines = appSvelte.split('\n');
                        appSvelteLines.splice(appSvelteLines.indexOf('<Calendar bind:visible />') + 1, 0, iconifySnippet);
                        fs.writeFileSync(`${projectDir}/src/App.svelte`, appSvelteLines.join('\n'), 'utf-8');
                    } else {
                        // 使用 SvelteKit
                        // 在 ${projectDir}/src/routes/+page.svelte 的 <Calendar bind:visible /> 下方增加图标使用示例
                        const pageSvelte = fs.readFileSync(`${projectDir}/src/routes/+page.svelte`, 'utf-8');
                        const pageSvelteLines = pageSvelte.split('\n');
                        pageSvelteLines.splice(pageSvelteLines.indexOf('<Calendar bind:visible />') + 1, 0, iconifySnippet);
                        fs.writeFileSync(`${projectDir}/src/routes/+page.svelte`, pageSvelteLines.join('\n'), 'utf-8');
                    }
                }
            };
            const addStdfIconFun = async () => {
                const svgSymbolV = await getLatestVersion('@any-tdf/vite-plugin-svg-symbol');
                packageJson.devDependencies['@any-tdf/vite-plugin-svg-symbol'] = `^${svgSymbolV}`;
                const viteConfig = fs.readFileSync(`${projectDir}/vite.config.${isTs ? 'ts' : 'js'}`, 'utf-8');
                const viteConfigLines = viteConfig.split('\n');
                viteConfigLines.splice(1, 0, `import svgSymbol from '@any-tdf/vite-plugin-svg-symbol';`);

                // 根据模板类型确定要查找的 export default 行
                // Determine the export default line to find based on template type
                const cssPlugin = isUno ? 'UnoCSS()' : 'tailwindcss()';
                const frameworkPlugin = isVite ? 'svelte()' : 'sveltekit()';
                const exportLine = `export default defineConfig({ plugins: [${frameworkPlugin}, ${cssPlugin}] });`;
                // 输出目录：SvelteKit 使用 static，Vite 使用 public
                // Output directory: SvelteKit uses static, Vite uses public
                const outDir = isVite ? 'public' : 'static';

                // 生成新的 export default defineConfig 配置，将 svgSymbol 放在 plugins 数组中
                // Generate new export default defineConfig configuration, put svgSymbol in plugins array
                const newExportLine = `// 一般来说，一个应用的 svg 不多时都放在一个文件夹下，合并为一个 symbol 即可。此处演示了不同文件夹下的图标如何合并为不同的 symbol。
// Generally speaking, when the svg of an application is not much, it is placed in a folder and merged into one symbol. This example shows how the icons in different folders are merged into different symbols.
export default defineConfig({
\tplugins: [
\t\t${frameworkPlugin},
\t\t${cssPlugin},
\t\tsvgSymbol([
\t\t\t{ inFile: 'src/lib/svgs/Heroicons', outFile: '${outDir}/symbols' },
\t\t\t{ inFile: 'src/lib/svgs/IconPark', outFile: '${outDir}/symbols' },
\t\t\t{ inFile: 'src/lib/svgs/Remix', outFile: '${outDir}/symbols' }
\t\t])
\t]
});`;

                // 将 export default defineConfig 行替换为新的配置
                // Replace the export default defineConfig line with the new configuration
                viteConfigLines.splice(
                    viteConfigLines.indexOf(exportLine),
                    1,
                    newExportLine,
                );
                fs.writeFileSync(`${projectDir}/vite.config.${isTs ? 'ts' : 'js'}`, viteConfigLines.join('\n'), 'utf-8');
                // 将 snippet/svgs 整个目录复制到 ${projectDir}/src/lib 目录下
                // Copy the snippet/svgs directory to the ${projectDir}/src/lib directory
                fs.copySync(fileURLToPath(new URL('../snippet/svgs', import.meta.url)), `${projectDir}/src/lib/svgs`);

                if (isVite) {
                    // 在 ${projectDir}/src/App.svelte 的 <Calendar bind:visible /> 下方增加图标使用示例
                    const appSvelte = fs.readFileSync(`${projectDir}/src/App.svelte`, 'utf-8');
                    const appSvelteLines = appSvelte.split('\n');
                    const svgSymbolSnippetHtml = fs.readFileSync(fileURLToPath(new URL('../snippet/svg-symbol.txt', import.meta.url)), 'utf-8');
                    appSvelteLines.splice(appSvelteLines.indexOf('<Calendar bind:visible />') + 1, 0, svgSymbolSnippetHtml);
                    fs.writeFileSync(`${projectDir}/src/App.svelte`, appSvelteLines.join('\n'), 'utf-8');
                } else {
                    // 在 ${projectDir}/src/routes/+page.svelte 的 <Calendar bind:visible /> 下方增加图标使用示例
                    const pageSvelte = fs.readFileSync(`${projectDir}/src/routes/+page.svelte`, 'utf-8');
                    const pageSvelteLines = pageSvelte.split('\n');
                    const svgSymbolSnippetHtml = fs.readFileSync(fileURLToPath(new URL('../snippet/svg-symbol.txt', import.meta.url)), 'utf-8');
                    pageSvelteLines.splice(pageSvelteLines.indexOf('<Calendar bind:visible />') + 1, 0, svgSymbolSnippetHtml);
                    fs.writeFileSync(`${projectDir}/src/routes/+page.svelte`, pageSvelteLines.join('\n'), 'utf-8');
                }
            };

            // 如果 iconUsageItem 的值为 iconify
            // If the value of iconUsageItem is iconify
            if (iconUsageItem.value === 'iconify') {
                await addIconifyFun();
            }

            // 如果 iconUsageItem 的值为 any-tdf-icon，则获取 @any-tdf/vite-plugin-svg-symbol 的最新版本号
            // If the value of iconUsageItem is any-tdf-icon, get the latest version number of @any-tdf/vite-plugin-svg-symbol
            if (iconUsageItem.value === 'any-tdf-icon') {
                await addStdfIconFun();
            }

            // 如果 iconUsageItem 的值为 both，则同时调用 addIconifyFun 和 addStdfIconFun
            // If the value of iconUsageItem is both, call addIconifyFun and addStdfIconFun
            if (iconUsageItem.value === 'both') {
                await addIconifyFun();
                await addStdfIconFun();
            }

            const updateThemeCss = (cssContent, mode) => {
                const pluginRegex = /@plugin "stdf\/theme" \{[\s\S]*?\}\n\n?/;
                const multiPlugin = '@plugin "stdf/theme" {\n\tname: "STDF, Sage, GoldWood";\n}\n\n';
                const allPlugin = '@plugin "stdf/theme" {\n\tall: true;\n}\n\n';
                const insertPlugin = (content, pluginBlock) => {
                    if (content.match(pluginRegex)) {
                        return content.replace(pluginRegex, pluginBlock);
                    }
                    const themeIndex = content.indexOf('@theme');
                    if (themeIndex === -1) {
                        return `${pluginBlock}${content}`;
                    }
                    return content.replace('@theme', `${pluginBlock}@theme`);
                };

                if (mode === 'single') {
                    return cssContent.replace(pluginRegex, '');
                }
                if (mode === 'all') {
                    return insertPlugin(cssContent, allPlugin);
                }
                return insertPlugin(cssContent, multiPlugin);
            };

            const updateThemeSvelte = (svelteContent, mode) => {
                // 模板默认是单主题模式，不需要修改
                // Template default is single theme mode, no modification needed
                if (mode === 'single') {
                    return svelteContent;
                }

                let content = svelteContent;

                // 多主题模式：使用 Tabs 切换 4 个主题
                // Multi theme mode: use Tabs to switch 4 themes
                if (mode === 'multi') {
                    // 添加 Tabs 导入
                    content = content.replace(
                        /import \{ Button, ButtonGroup, Cell, Icon, Calendar \} from 'stdf';/,
                        "import { Button, ButtonGroup, Cell, Icon, Calendar, Tabs } from 'stdf';"
                    );
                    // 修改 stdf/theme 导入
                    content = content.replace(
                        /import \{ switchMode \} from 'stdf\/theme';/,
                        "import { switchTheme, switchMode } from 'stdf/theme';"
                    );
                    // 在 // 日历 代码块后添加主题相关的 JS 代码
                    const multiThemeBlock = [
                        '',
                        '\t// 主题',
                        '\t// Theme',
                        '\tconst themeOptions = [',
                        "\t\t{ name: 'STDF', labelZh: 'STDF', labelEn: 'STDF' },",
                        "\t\t{ name: 'Sage', labelZh: '草绿粉紫', labelEn: 'Sage' },",
                        "\t\t{ name: 'GoldWood', labelZh: '金色森林', labelEn: 'GoldWood' },",
                        '\t];',
                        '\tconst themeLabels = $derived(',
                        '\t\tthemeOptions.map((item) => ({',
                        "\t\t\ttext: lang === 'zh_CN' ? item.labelZh : item.labelEn",
                        '\t\t}))',
                        '\t);',
                        '\tlet themeIndex = $state(0);',
                        '',
                        '\t$effect(() => {',
                        '\t\tconst currentTheme = themeOptions[themeIndex]?.name;',
                        '\t\tif (currentTheme) {',
                        '\t\t\tswitchTheme(currentTheme);',
                        '\t\t}',
                        '\t});',
                    ].join('\n');
                    content = content.replace(
                        /(\t\/\/ 日历\n\t\/\/ Calendar\n\tlet visible = \$state\(false\);)/,
                        `$1${multiThemeBlock}`
                    );
                    // 在切换语言按钮后添加 Tabs 组件
                    const multiThemeUi = [
                        '</div>',
                        '<div class="my-6">',
                        '\t<Tabs tab={{ labels: themeLabels }} bind:active={themeIndex} />',
                        '</div>',
                    ].join('\n');
                    content = content.replace(
                        /<Button onclick=\{toggleLangFun\}>\{lang === 'zh_CN' \? '切换语言' : 'Toggle language'\}<\/Button>\n<\/div>/,
                        `<Button onclick={toggleLangFun}>{lang === 'zh_CN' ? '切换语言' : 'Toggle language'}</Button>\n${multiThemeUi}`
                    );
                    return content;
                }

                // 全部主题模式：使用按钮随机切换主题
                // All theme mode: use button to randomly switch theme
                if (mode === 'all') {
                    // 修改 stdf/theme 导入
                    content = content.replace(
                        /import \{ switchMode \} from 'stdf\/theme';/,
                        "import { switchTheme, switchMode, themes, getTheme } from 'stdf/theme';"
                    );
                    // 在 // 日历 代码块后添加主题相关的 JS 代码
                    const allThemeBlock = [
                        '',
                        '\t// 主题',
                        '\t// Theme',
                        '\tconst themeNames = themes.map((item) => item.name);',
                        "\tlet theme = $state('STDF');",
                        '\tlet currentTheme = $state(getTheme());',
                        '\tconst randomThemeFun = () => {',
                        '\t\tif (themeNames.length === 0) {',
                        '\t\t\treturn;',
                        '\t\t}',
                        '\t\tconst index = Math.floor(Math.random() * themeNames.length);',
                        '\t\ttheme = themeNames[index];',
                        '\t};',
                        '',
                        '\t$effect(() => {',
                        '\t\tif (theme) {',
                        '\t\t\tswitchTheme(theme);',
                        '\t\t\tcurrentTheme = getTheme();',
                        '\t\t}',
                        '\t});',
                    ].join('\n');
                    content = content.replace(
                        /(\t\/\/ 日历\n\t\/\/ Calendar\n\tlet visible = \$state\(false\);)/,
                        `$1${allThemeBlock}`
                    );
                    // 在切换语言按钮后添加随机主题按钮和主题名称显示
                    content = content.replace(
                        /<Button onclick=\{toggleLangFun\}>\{lang === 'zh_CN' \? '切换语言' : 'Toggle language'\}<\/Button>\n<\/div>/,
                        `<Button onclick={toggleLangFun}>{lang === 'zh_CN' ? '切换语言' : 'Toggle language'}</Button>\n\t<Button fill="lineState" onclick={randomThemeFun}>{lang === 'zh_CN' ? '随机主题' : 'Random theme'}</Button>\n</div>\n<div class="my-6 text-center text-xs">{lang === 'zh_CN' ? '当前主题' : 'Current theme'}: {currentTheme}</div>`
                    );
                    return content;
                }

                return content;
            };

            const appCssPath = `${projectDir}/src/app.css`;
            const appCssContent = fs.readFileSync(appCssPath, 'utf-8');
            const nextAppCss = updateThemeCss(appCssContent, themeMode);
            fs.writeFileSync(appCssPath, nextAppCss, 'utf-8');

            const appSvelteContent = fs.readFileSync(appSveltePath, 'utf-8');
            const nextAppSvelte = updateThemeSvelte(appSvelteContent, themeMode);
            fs.writeFileSync(appSveltePath, nextAppSvelte, 'utf-8');

            // 将修改后的 packageJson 写入到项目内的 package.json 文件中
            // Write the modified packageJson to the package.json file in the project
            fs.writeFileSync(`${projectDir}/package.json`, JSON.stringify(packageJson, null, 4), 'utf-8');

            spinner.stop();
            p.outro(`🎉🎉🎉 ${projectName} - ${lang.pcsucc}`);

            // 获得依赖的版本号
            // get the version number of the dependency
            const BaseVersions = {
                svelte: packageJson.devDependencies.svelte.replace('^', ''),
                stdf: packageJson.devDependencies.stdf.replace('^', ''),
                // vite: packageJson.devDependencies.vite.replace('^', ''),
                // '@sveltejs/kit': packageJson.devDependencies['@sveltejs/kit'].replace('^', ''),
            };
            if (isVite) {
                BaseVersions['vite'] = packageJson.devDependencies.vite.replace('^', '');
            } else {
                BaseVersions['@sveltejs/kit'] = packageJson.devDependencies['@sveltejs/kit'].replace('^', '');
            }
            if (isUno) {
                BaseVersions['unocss'] = packageJson.devDependencies.unocss.replace('^', '');
            } else {
                BaseVersions['tailwindcss'] = packageJson.devDependencies.tailwindcss.replace('^', '');
            }

            // 将 versions 的键值拼接为 bold('Vite:') cyan(versions.vite) bold('Svelte:') cyan(versions.svelte) 的形式
            // Splice the key value of versions into the form of bold('Vite:') cyan(versions.vite) bold('Svelte:') cyan(versions.svelte)
            let versionsString = '';
            for (const key in BaseVersions) {
                versionsString += bold(key) + ': ' + cyan(BaseVersions[key]) + ' ';
            }

            // 显示版本号
            // Display version number
            console.log(`📦 ${versionsString}
                `);

            // 显示提示信息
            // Display prompt information
            console.log(
                `👉 ${bold(lang.tgs)}
    ${blue(`1. cd ${projectName}`)}
    ${blue(`2. ${packageManagerItem.install}`)}
    ${blue(`3. ${packageManagerItem.dev}`)}
    `,
            );
            // 提示配置主题色
            // Prompt configuration theme color
            console.log(`🎨 ${grey(isUno ? lang.pcyt_vu : lang.pcyt_vt)}`);

            process.exit(0);
        })
        .catch(err => {
            spinner.stop();
            console.error(red(lang.cferror + '--' + err));
            process.exit(1);
        });
}
