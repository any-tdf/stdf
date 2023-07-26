#!/usr/bin/env node

import fs from 'node:fs';
import fsExtra from 'fs-extra';
import * as p from '@clack/prompts';
import { bold, cyan, grey, red, blue } from 'kleur/colors';
import * as langAll from './lang/index.mjs';

const { version } = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

console.log(`
${grey(`create-stdf@${version}
`)}`);

const spinner = p.spinner();

p.intro('Welcome to use STDF!');

// 选择一种语言
// Select a language
const languageType = await p.select({
    message: bold('Please select your preferred language(请选择你习惯的语言)'),
    options: [
        { value: 'en_US', label: 'English' },
        { value: 'zh_CN', label: '简体中文' },
    ],
});
const lang = langAll[languageType] || langAll['en_US'];

if (p.isCancel(languageType)) {
    p.cancel(red('⛔ ') + lang.oc);
    process.exit(0);
}

const templateOptions = [
    { value: 'vt', label: 'Vite + Tailwind' },
    { value: 'vu', label: `Vite + UnoCSS(${lang.hnay})` },
    { value: 'skt', label: `SvelteKit + Tailwind(${lang.hnay})` },
    { value: 'sku', label: `SvelteKit + UnoCSS(${lang.hnay})` },
    { value: 'vtt', label: `Vite + Tailwind + TypeScript(${lang.hnay})` },
    { value: 'vut', label: `Vite + UnoCSS+TypeScript(${lang.hnay})` },
    { value: 'sktt', label: `SvelteKit + Tailwind + TypeScript(${lang.hnay})` },
    { value: 'skut', label: `SvelteKit + UnoCSS + TypeScript(${lang.hnay})` },
];

//  选择一个模板
// Select a template
let template = await p.select({
    message: bold(lang.psat),
    options: templateOptions,
});

// 直到选择的 template 是 vt 为止，否则一直重新选择
// Until the selected template is vt or vu, otherwise keep reselecting
while (template !== 'vt') {
    if (p.isCancel(template)) {
        p.cancel(red('⛔ ') + lang.oc);
        process.exit(0);
    }

    p.intro(red(templateOptions.find(item => item.value === template).label + ' ' + lang.pca));
    template = await p.select({
        message: bold(lang.psat),
        options: templateOptions,
    });
}

if (p.isCancel(template)) {
    p.cancel(red('⛔ ') + lang.oc);
    process.exit(0);
}

// 输入项目名称
// Enter the project name
let projectName = await p.text({
    message: bold(lang.pn),
    initialValue: 'stdf-project',
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

// 项目目录
// Project directory
const projectDir = `${process.cwd()}/${projectName}`;

const templatePaths = [
    { template: 'vt', path: './templates/vite-tailwind' },
    { template: 'vu', path: './templates/vite-uno' },
    { template: 'skt', path: './templates/sveltekit-tailwind' },
    { template: 'sku', path: './templates/sveltekit-uno' },
    { template: 'vtt', path: './templates/vite-tailwind-typescript' },
    { template: 'vut', path: './templates/vite-uno-typescript' },
    { template: 'sktt', path: './templates/sveltekit-tailwind-typescript' },
    { template: 'skut', path: './templates/sveltekit-uno-typescript' },
];

spinner.start('🚀 ' + lang.cfsing);

// 根据 template 的值，复制对应目录下的所有文件到当前目录
// According to the value of template, copy all files under the corresponding directory to the current directory
templatePaths.forEach(item => {
    if (item.template === template) {
        fs.mkdirSync(projectDir);
        // 获取模板目录的绝对路径
        // Get the absolute path of the template directory
        const filePath = new URL(item.path, import.meta.url).pathname;
        // 将 filePath 目录下的所有文件复制到 projectDir 目录下
        // Copy all files under the filePath directory to the projectDir directory
        fsExtra.copySync(filePath, projectDir, {
            filter: (src, dest) => {
                return !src.endsWith('/pnpm-lock.yaml');
            },
        });
    }
});

spinner.stop();
console.log(`🎉 ${lang.pcsucc}
`);

// 读取 package.json 文件，获得 vite svelte tailwind stdf 的版本号
// Read the package.json file to get the version number of vite svelte tailwind stdf
const packageJson = JSON.parse(fs.readFileSync(`${projectDir}/package.json`, 'utf-8'));
const versions = {
    vite: packageJson.devDependencies.vite,
    svelte: packageJson.devDependencies.svelte,
    tailwindcss: packageJson.devDependencies.tailwindcss,
    stdf: packageJson.devDependencies.stdf,
};

// 显示版本号
// Display version number
console.log(
    `📦 ${bold('Vite:')} ${cyan(versions.vite)} ${bold('Svelte:')} ${cyan(versions.svelte)} ${bold('Tailwind:')} ${cyan(
        versions.tailwindcss
    )} ${bold('STDF:')} ${cyan(versions.stdf)}
    `
);

// 显示提示信息
// Display prompt information
console.log(
    `👉 ${bold(lang.tgs)}

    ${blue(`cd ${projectName}`)}
    ${blue('pnpm i or npm i or yarn')}
    ${blue('npm run dev')}
    `
);

// 显示配置主题色
// Display configuration theme color
console.log(
    `🎨 ${bold(lang.pcyt)}
    `
);
