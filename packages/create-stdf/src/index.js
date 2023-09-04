#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as p from '@clack/prompts';
import { bold, cyan, grey, red, blue } from 'kleur/colors';
import minimist from 'minimist';

import * as langAll from './lang';

// 获取版本号
// Get version
const { version } = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));

// 显示版本号
// Display version number
console.log(`
${grey(`create-stdf@${version}
`)}`);

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

// 语言列表
// Language list
const languages = [];

// 循环 langAll 对象，将语言列表中的语言名字替换为对应的语言名字，且按照 sort 排序
// Loop through the langAll object and replace the language name in the language list with the corresponding language name, and sort by sort
for (const key in langAll) {
	languages.push({
		value: key,
		label: langAll[key].name,
		sort: langAll[key].sort,
	});
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
	{ value: 'vt', label: 'Vite + Tailwind', template: 'vite-tailwind', finish: true },
	{ value: 'vu', label: 'Vite + UnoCSS', template: 'vite-uno', finish: true },
	{ value: 'skt', label: 'SvelteKit + Tailwind', template: 'sveltekit-tailwind', finish: true },
	{ value: 'sku', label: 'SvelteKit + UnoCSS', template: 'sveltekit-uno', finish: true },
	{ value: 'vtt', label: 'Vite + Tailwind + TypeScript', template: 'vite-tailwind-typescript', finish: false },
	{ value: 'vut', label: 'Vite + UnoCSS + TypeScript', template: 'vite-uno-typescript', finish: false },
	{ value: 'sktt', label: 'SvelteKit + Tailwind + TypeScript', template: 'sveltekit-tailwind-typescript', finish: false },
	{ value: 'skut', label: 'SvelteKit + UnoCSS + TypeScript', template: 'sveltekit-uno-typescript', finish: false },
];

// 如果命令行参数中有项目名称，但没有模板名称，直接使用默认模板 vt
// If there is a project name in the command line parameters, but no template name, use the default template vt directly
if (argvProjectName && !argvTemplate) {
	createFunc(argvProjectName, templateOptions[0]);
}
// 如果命令行参数中有项目名称和模板名称，直接使用命令行参数中的值
// If there is a project name and template name in the command line parameters, use the value in the command line parameters directly
else if (argvProjectName && argvTemplate) {
	const item = templateOptions.find(item => item.value === argvTemplate);
	if (!item) {
		p.intro(red(lang.pectn));
	} else if (!item.finish) {
		p.intro(red(item.label + ' ' + lang.hnay));
	} else {
		createFunc(argvProjectName, item);
	}
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
			options: templateOptions,
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
				options: templateOptions,
			});
		}

		// 输入项目名称
		// Enter the project name
		const projectName = await p.text({
			message: bold(lang.pn),
			placeholder: 'stdf-project',
			validate: value => {
				if (!value) {
					// 判断是否为空，提示 “项目名称不能为空”
					// Determine whether it is empty, prompt "Project name cannot be empty"
					return lang.pncbne;
				}
				if (fs.existsSync(value)) {
					// 判断是否已存在，提示 “项目名称已存在”
					// Determine whether it already exists, prompt "Project name already exists"
					return lang.pane;
				}
			},
		});

		if (p.isCancel(projectName)) {
			p.cancel(red('⛔ ') + lang.oc);
			process.exit(0);
		}

		// 根据 template 的值，复制对应目录下的所有文件到当前目录
		// According to the value of template, copy all files under the corresponding directory to the current directory
		templateOptions.forEach(async item => {
			if (item.value === template) {
				createFunc(projectName, item);
			}
		});
	})();
}

function createFunc(projectName, item) {
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

	// 获取模板目录的绝对路径，考虑到 Windows 系统的兼容性, 使用 path.join
	// Get the absolute path of the template directory, considering the compatibility of the Windows system, use path.join
	const templatePath = path.resolve(fileURLToPath(import.meta.url), '../..', `templates/${item.template}`);

	// 将 templatePath 目录下的所有文件复制到 projectDir 目录下
	// Copy all files under the templatePath directory to the projectDir directory\
	fs.copy(templatePath, projectDir)
		.then(() => {
			spinner.stop();
			p.outro(`${projectName} - ${lang.pcsucc} 🎉`);

			// 读取 package.json 文件
			// Read the package.json file
			const packageJson = JSON.parse(fs.readFileSync(`${projectDir}/package.json`, 'utf-8'));

			// 将项目内的 package.json 中的 name 属性修改为 projectName
			// Modify the name attribute in package.json in the project to projectName
			packageJson.name = projectName;

			// 将修改后的 packageJson 写入到项目内的 package.json 文件中
			// Write the modified packageJson to the package.json file in the project
			fs.writeFileSync(`${projectDir}/package.json`, JSON.stringify(packageJson, null, 4), 'utf-8');

			// 根据 item.value 的值，判断是否使用了 @sveltejs/kit
			// According to the value of item.value, determine whether @sveltejs/kit is used
			const isHasKit = item.value === 'skt' || item.value === 'sku' || item.value === 'sktt' || item.value === 'skut';

			// 根据 item.value 的值，判断使用 Tailwind 还是 UnoCSS
			// According to the value of item.value, determine whether to use Tailwind or UnoCSS
			const isHasUno = item.value === 'vu' || item.value === 'sku' || item.value === 'vut' || item.value === 'skut';

			// 获得依赖的版本号
			// get the version number of the dependency
			const versions = {
				vite: packageJson.devDependencies.vite.replace('^', ''),
				svelte: packageJson.devDependencies.svelte.replace('^', ''),
				stdf: packageJson.devDependencies.stdf.replace('^', ''),
			};

			if (isHasKit) {
				versions['@sveltejs/kit'] = packageJson.devDependencies['@sveltejs/kit'].replace('^', '');
			}

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

    ${blue(`cd ${projectName}`)}
    ${blue('pnpm i / npm i / yarn')}
    ${blue('npm run dev')}
    `,
			);
			// 显示配置主题色
			// Display configuration theme color
			console.log(
				`🎨 ${grey(isHasUno ? lang.pcyt_vu : lang.pcyt_vt)}
    `,
			);
		})
		.catch(err => {
			spinner.stop();
			console.error(red(lang.cferror + '--' + err));
		});
}
