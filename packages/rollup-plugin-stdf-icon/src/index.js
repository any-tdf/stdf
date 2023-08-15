#!/usr/bin/env node

import fs from 'fs-extra';
import { optimize } from 'svgo';
import svgstore from 'svgstore';

export default function symbol(options = {}) {
    const { inFile = 'src/assets/svgs', outFile = 'public/fonts', fileName = 'symbol', ...rest } = options;

    // 如果 outFile 不存在, 则创建
    // If outFile does not exist, create it
    if (!fs.existsSync(outFile)) {
        fs.mkdirSync(outFile);
    }

    // 创建一个空的 svgstore
    // Create an empty svgstore
    const sprites = svgstore({ cleanDefs: true });

    // 循环 icons 目录下的所有 svg 文件
    // Loop through all svg files in the icons directory
    const svgs = fs.readdirSync(inFile);

    svgs.forEach(svg => {
        // 读取 svg 文件内容, 作为字符串
        // Read the svg file content as a string
        const code = fs.readFileSync(`${inFile}/${svg}`, 'utf8');

        // 使用 SVGO 进行优化
        // Use SVGO for optimization
        const result = optimize(code);

        // 删除 result 中的 fill p-id width height class 等属性
        // Delete fill p-id width height class and other attributes in result
        result.data = result.data
            .replace(/fill="[^"]*"/g, '')
            .replace(/p-id="[^"]*"/g, '')
            .replace(/width="[^"]*"/g, '')
            .replace(/height="[^"]*"/g, '')
            .replace(/class="[^"]*"/g, '');

        // 将优化后的 svg 添加到 sprites 中
        // Add the optimized svg to sprites
        sprites.toString({ inline: true });
        sprites.add(svg.replace('.svg', ''), result.data);
    });

    // 删除 sprites 的 <?xml...?> 标签和 <!DOCTYPE...> 标签 和 <defs/> 标签
    // Delete the <?xml...?> tag and <!DOCTYPE...> tag of sprites
    const spritesStr = sprites
        .toString()
        .replace(/<\?xml[^>]*>/g, '')
        .replace(/<!DOCTYPE[^>]*>/g, '')
        .replace(/<defs\/>/g, '');

    // 写入到指定的文件中
    // Write to the specified file
    fs.writeFileSync(outFile + '/' + fileName + '.svg', spritesStr);

    return {
        name: 'rollup-plugin-stdf-icon',
    };
}
