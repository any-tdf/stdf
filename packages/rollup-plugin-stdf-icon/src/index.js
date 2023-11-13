#!/usr/bin/env node

import fs from 'fs-extra';
import { optimize } from 'svgo';
import svgstore from 'svgstore';

export default function svgSprite(datas) {
	// 可接收多组参数，处理多个文件夹内的文件
	// Multiple parameters can be accepted to process files in multiple folders
	const data = datas ? datas : [{ inFile: 'src/lib/symbol', outFile: 'static/fonts', fileName: '', simple: true }];

	// 循环处理每一组参数
	// Loop through each set of parameters
	data.forEach(item => {
		const { inFile, outFile, fileName, simple = true } = item;
		// 如果 fileName 为默认 '',则将 inFile 的最后一个文件夹作为 fileName，注意不同操作系统的路径分隔符
		// If fileName is the default '', then the last folder of inFile is used as fileName, pay attention to the path separator of different operating systems
		const fileNameInner = fileName ? fileName : inFile.split('/').pop();
		handleFile(inFile, outFile, fileNameInner, simple);
	});

	return { name: 'rollup-plugin-stdf-icon' };
}

// 处理一个文件夹内的文件
// Process files in a folder
function handleFile(inFile, outFile, fileName, simple = true) {
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
		if (!svg.endsWith('.svg')) {
			// 读取 svg 文件内容, 如果文件不是 svg 文件, 则给出提示并跳过
			// Read the contents of the svg file, if the file is not an svg file, give a prompt and skip
			console.warn(`[rollup-plugin-stdf-icon]: ${inFile}/${svg} is not a svg file, skip it!`);
		} else {
			const code = fs.readFileSync(`${inFile}/${svg}`, 'utf8');

			// 使用 SVGO 进行优化
			// Use SVGO for optimization
			const result = optimize(code);

			// 删除 result 中的 p-id class 等属性
			// Delete p-id class and other attributes in result
			result.data = result.data.replace(/p-id="[^"]*"/g, '').replace(/class="[^"]*"/g, '');

			// 如果 result 中有 fill 属性，属性值不为 none, 则将 fill 属性值设置为 currentColor
			// If there is a fill attribute in result, the attribute value is not none, then set the fill attribute value to currentColor
			if (simple && result.data.indexOf('fill=') > -1 && result.data.indexOf('fill="none"') === -1) {
				result.data = result.data.replace(/fill="[^"]*"/g, 'fill="currentColor"');
			}

			// 如果 result 中有 stroke 属性，属性值不为 none, 则将 stroke 属性值设置为 currentColor
			// If there is a stroke attribute in result, the attribute value is not none, then set the stroke attribute value to currentColor
			if (simple && result.data.indexOf('stroke=') > -1 && result.data.indexOf('stroke="none"') === -1) {
				result.data = result.data.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
			}

			// 将优化后的 svg 添加到 sprites 中
			// Add the optimized svg to sprites
			sprites.add(svg.replace('.svg', ''), result.data, { copyAttrs: ['fill', 'stroke'] });
		}
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
}
