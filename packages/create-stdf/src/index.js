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
const { version } = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));

// 获取 create-stdf 的最新版本号
// Get the latest version number of create-stdf
const createStdfV = await getLatestVersion('create-stdf');

// 显示版本号
// Display version number
console.log(`
${grey(`create-stdf@${version}`)}`);

if (version != createStdfV) {
	console.log(
		red(`😢 Recommended to use the latest version: ${createStdfV}
		`)
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
	{ value: 'sktt', label: 'SvelteKit & Tailwind & TypeScript', template: 'sktt', finish: true },
	{ value: 'skt', label: 'SvelteKit & Tailwind', template: 'skt', finish: true },
	{ value: 'skut', label: 'SvelteKit & UnoCSS & TypeScript', template: 'skut', finish: false },
	{ value: 'sku', label: 'SvelteKit & UnoCSS', template: 'sku', finish: false },
];

// 包管理工具列表
// Package management tool list
const packageManagerOptions = [
	{ value: 'npm', label: 'NPM', install: 'npm i', dev: 'npm run dev' },
	{ value: 'bun', label: 'Bun', install: 'bun i', dev: 'bun dev' },
	{ value: 'pnpm', label: 'PNPM', install: 'pnpm i', dev: 'pnpm dev' },
	{ value: 'yarn', label: 'Yarn', install: 'yarn', dev: 'yarn run dev' },
];

// 图标使用方式列表
// Icon usage method list
const iconUsageOptions = [
	{ value: 'stdf-icon', label: 'rollup-plugin-stdf-icon' },
	{ value: 'iconify', label: 'iconify' },
	{ value: 'both', label: 'rollup-plugin-stdf-icon & iconify' },
	{ value: 'none', label: 'none' },
];

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
	createFunc(argvProjectName, itemTemplate, itemIconUsage, packageManagerOptions[0]);
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
			})),
		});

		if (p.isCancel(template)) {
			p.cancel(red('⛔ ') + lang.oc);
			process.exit(0);
		}

		// 直到选择的 template 所在项 的 finish 为 true 为止，否则一直重新选择
		// Until the finish of the selected template is true, otherwise keep reselecting
		while (!templateOptions.find(item => item.value === template)?.finish) {
			if (p.isCancel(template)) {
				p.cancel(red('⛔ ') + lang.oc);
				process.exit(0);
			}

			p.intro(red(templateOptions.find(item => item.value === template).label + ' ' + lang.hnay + ' ' + lang.pca));
			template = await p.select({
				message: bold(lang.psat),
				options: templateOptions.map(item => ({
					...item,
					label: item.finish ? item.label : `(${lang.hnay}) ${item.label}`,
				})),
			});
		}

		// 选择图标使用方式
		// Select icon usage method
		const iconUsage = await p.select({
			message: bold(lang.psai),
			options: iconUsageOptions,
		});

		if (p.isCancel(iconUsage)) {
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
					// 判断是否为空，提示“项目名称不能为空”
					// Determine whether it is empty, prompt "Project name cannot be empty"
					return lang.pncbne;
				}
				if (fs.existsSync(value)) {
					// 判断是否已存在，提示“项目名称已存在”
					// Determine whether it already exists, prompt "Project name already exists"
					return lang.pane;
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
			packageManagerOptions.find(i => i.value === packageManager)
		);
		// templateOptions.forEach(async item => {
		// 	if (item.value === template) {
		// 	}
		// });
	})();
}

function createFunc(projectName, templateItem, iconUsageItem, packageManagerItem) {
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

			const addIconifyFun = async () => {
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
				appCssLines.splice(
					3,
					0,
					`
@plugin "@iconify/tailwind4" {
	prefixes: duo-icons, bitcoin-icons, fluent-color;
}`
				);
				fs.writeFileSync(`${projectDir}/src/app.css`, appCssLines.join('\n'), 'utf-8');
				// 在 ${projectDir}/src/routes/+page.svelte 的 <Calendar bind:visible /> 下方增加图标使用示例
				const pageSvelte = fs.readFileSync(`${projectDir}/src/routes/+page.svelte`, 'utf-8');
				const pageSvelteLines = pageSvelte.split('\n');
				const iconifySnippet = fs.readFileSync(new URL('../snippet/iconify.txt', import.meta.url), 'utf-8');
				pageSvelteLines.splice(pageSvelteLines.indexOf('<Calendar bind:visible />') + 1, 0, iconifySnippet);
				fs.writeFileSync(`${projectDir}/src/routes/+page.svelte`, pageSvelteLines.join('\n'), 'utf-8');
			};
			const addStdfIconFun = async () => {
				const isTs = templateItem.value.includes('tt') || templateItem.value.includes('ut');
				const rollupPluginStdfIconV = await getLatestVersion('rollup-plugin-stdf-icon');
				packageJson.devDependencies['rollup-plugin-stdf-icon'] = `^${rollupPluginStdfIconV}`;
				const viteConfig = fs.readFileSync(`${projectDir}/vite.config.${isTs ? 'ts' : 'js'}`, 'utf-8');
				const viteConfigLines = viteConfig.split('\n');
				viteConfigLines.splice(1, 0, `import svgSprite from 'rollup-plugin-stdf-icon';`);
				const viteStdfIconSnippet = fs.readFileSync(new URL('../snippet/vite-stdf-icon.txt', import.meta.url), 'utf-8');
				// 将【export default defineConfig({ plugins: [tailwindcss(), sveltekit()] });】替换为 viteStdfIconSnippet 的代码
				// Replace 【export default defineConfig({ plugins: [tailwindcss(), sveltekit()] });】 with the code of viteStdfIconSnippet
				viteConfigLines.splice(
					viteConfigLines.indexOf('export default defineConfig({ plugins: [tailwindcss(), sveltekit()] });'),
					1,
					viteStdfIconSnippet
				);
				fs.writeFileSync(`${projectDir}/vite.config.${isTs ? 'ts' : 'js'}`, viteConfigLines.join('\n'), 'utf-8');
				// 将 snippet/svgs 整个目录复制到 ${projectDir}/src/lib 目录下
				// Copy the snippet/svgs directory to the ${projectDir}/src/lib directory
				fs.copySync(new URL('../snippet/svgs', import.meta.url).pathname, `${projectDir}/src/lib/svgs`);
				// 在 ${projectDir}/src/routes/+page.svelte 的 <Calendar bind:visible /> 下方增加图标使用示例
				const pageSvelte = fs.readFileSync(`${projectDir}/src/routes/+page.svelte`, 'utf-8');
				const pageSvelteLines = pageSvelte.split('\n');
				const stdfIconSnippet = fs.readFileSync(new URL('../snippet/stdf-icon.txt', import.meta.url), 'utf-8');
				pageSvelteLines.splice(pageSvelteLines.indexOf('<Calendar bind:visible />') + 1, 0, stdfIconSnippet);
				fs.writeFileSync(`${projectDir}/src/routes/+page.svelte`, pageSvelteLines.join('\n'), 'utf-8');
			};

			// 如果 iconUsageItem 的值为 iconify
			// If the value of iconUsageItem is iconify
			if (iconUsageItem.value === 'iconify') {
				await addIconifyFun();
			}

			// 如果 iconUsageItem 的值为 stdf-icon，则获取 rollup-plugin-stdf-icon 的最新版本号
			// If the value of iconUsageItem is stdf-icon, get the latest version number of rollup-plugin-stdf-icon
			if (iconUsageItem.value === 'stdf-icon') {
				await addStdfIconFun();
			}

			// 如果 iconUsageItem 的值为 both，则同时调用 addIconifyFun 和 addStdfIconFun
			// If the value of iconUsageItem is both, call addIconifyFun and addStdfIconFun
			if (iconUsageItem.value === 'both') {
				await addIconifyFun();
				await addStdfIconFun();
			}

			// 将修改后的 packageJson 写入到项目内的 package.json 文件中
			// Write the modified packageJson to the package.json file in the project
			fs.writeFileSync(`${projectDir}/package.json`, JSON.stringify(packageJson, null, 4), 'utf-8');

			spinner.stop();
			p.outro(`🎉🎉🎉 ${projectName} - ${lang.pcsucc}`);

			// 根据 item.value 的值，判断使用 Tailwind 还是 UnoCSS
			// According to the value of item.value, determine whether to use Tailwind or UnoCSS
			const isHasUno = templateItem.value.includes('u');

			// 获得依赖的版本号
			// get the version number of the dependency
			const versions = {
				vite: packageJson.devDependencies.vite.replace('^', ''),
				svelte: packageJson.devDependencies.svelte.replace('^', ''),
				'@sveltejs/kit': packageJson.devDependencies['@sveltejs/kit'].replace('^', ''),
				stdf: packageJson.devDependencies.stdf.replace('^', ''),
			};

			if (isHasUno) {
				versions['unocss'] = packageJson.devDependencies.unocss.replace('^', '');
			} else {
				versions['tailwindcss'] = packageJson.devDependencies.tailwindcss.replace('^', '');
			}

			// 将 versions 的键值拼接为 bold('Vite:') cyan(versions.vite) bold('Svelte:') cyan(versions.svelte) 的形式
			// Splice the key value of versions into the form of bold('Vite:') cyan(versions.vite) bold('Svelte:') cyan(versions.svelte)
			let versionsString = '';
			for (const key in versions) {
				versionsString += bold(key) + ': ' + cyan(versions[key]) + ' ';
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
    ${blue(`2. git init && git add -A && git commit -m "Initial commit"`)}
    ${blue(`3. ${packageManagerItem.install}`)}
    ${blue(`4. ${packageManagerItem.dev}`)}
    `
			);
			// 提示配置主题色
			// Prompt configuration theme color
			console.log(`🎨 ${grey(isHasUno ? lang.pcyt_vu : lang.pcyt_vt)}`);
		})
		.catch(err => {
			spinner.stop();
			console.error(red(lang.cferror + '--' + err));
		});
}
