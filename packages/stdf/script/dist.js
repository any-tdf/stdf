// 1. 将 components 下所有文件复制到 dist/components 下
// 2. 将 lang 和 assets 下所有文件复制到 dist 下
// 3. 将 dist 下所有 svelte 和 js 文件中的注释和空行，合并为一行

import fs from 'node:fs';
import path from 'node:path';

// 创建 dist 目录
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// 创建 dist/components 目录
if (!fs.existsSync('dist/components')) {
    fs.mkdirSync('dist/components');
}

// 创建 dist/lang 目录
if (!fs.existsSync('dist/lang')) {
    fs.mkdirSync('dist/lang');
}

// 创建 dist/assets 目录
if (!fs.existsSync('dist/assets')) {
    fs.mkdirSync('dist/assets');
}

function copyDirRecursive(sourceDir, targetDir) {
    // 创建目标文件夹
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }

    // 读取源文件夹中的所有文件和子文件夹
    const files = fs.readdirSync(sourceDir);

    files.forEach(file => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);

        const stats = fs.statSync(sourcePath);

        if (stats.isFile()) {
            // 如果是文件，则直接复制
            fs.copyFileSync(sourcePath, targetPath);
        } else if (stats.isDirectory()) {
            // 如果是文件夹，则递归复制
            copyDirRecursive(sourcePath, targetPath);
        }
    });
}

// 复制 components 目录下的所有文件到 dist/components 目录下
copyDirRecursive('components', 'dist/components');

// 复制 lang 目录下的所有文件到 dist 目录下
copyDirRecursive('lang', 'dist/lang');

// 复制 assets 目录下的所有文件到 dist 目录下
copyDirRecursive('assets', 'dist/assets');

// 递归遍历目录下的所有 svelte 和 js 文件
function processFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // 如果是目录，则递归处理
            processFiles(filePath);
        } else if (file.endsWith('.svelte') || file.endsWith('.js')) {
            // 处理 svelte 和 js 文件
            let content = fs.readFileSync(filePath, 'utf8');

            // 删除 /* ... */ 形式的注释
            content = content.replace(/\/\*[\s\S]*?\*\//g, '');

            // 删除 // 形式的注释
            content = content.replace(/\/\/.*/g, '');

            // 删除空行
            content = content.replace(/^\s*[\r\n]/gm, '');

            // 合并为一行，仅留一个空格
            content = content.replace(/\s+/g, ' ');

            fs.writeFileSync(filePath, content, 'utf8');
        }
    });
}

processFiles('dist');
